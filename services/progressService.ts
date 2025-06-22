// Progress tracking service for reading Gurbani
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface ReadingProgress {
  baniId: string;
  currentVerseIndex: number;
  totalVerses: number;
  lastReadAt: Date;
  completedVerses: string[];
  bookmarkedVerses: string[];
}

export interface BookmarkData {
  verseId: string;
  baniId: string;
  baniName: string;
  verseText: string;
  createdAt: Date;
}

class ProgressService {
  private readonly PROGRESS_KEY = 'gurbani_reading_progress';
  private readonly BOOKMARKS_KEY = 'gurbani_bookmarks';

  // Save reading progress for a specific bani
  async saveProgress(baniId: string, verseIndex: number, totalVerses: number): Promise<void> {
    try {
      const progressData = await this.getProgress(baniId);
      const updatedProgress: ReadingProgress = {
        ...progressData,
        baniId,
        currentVerseIndex: verseIndex,
        totalVerses,
        lastReadAt: new Date(),
      };

      const allProgress = await this.getAllProgress();
      allProgress[baniId] = updatedProgress;

      await AsyncStorage.setItem(this.PROGRESS_KEY, JSON.stringify(allProgress));
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  }

  // Get reading progress for a specific bani
  async getProgress(baniId: string): Promise<ReadingProgress> {
    try {
      const allProgress = await this.getAllProgress();
      return allProgress[baniId] || {
        baniId,
        currentVerseIndex: 0,
        totalVerses: 0,
        lastReadAt: new Date(),
        completedVerses: [],
        bookmarkedVerses: [],
      };
    } catch (error) {
      console.error('Error getting progress:', error);
      return {
        baniId,
        currentVerseIndex: 0,
        totalVerses: 0,
        lastReadAt: new Date(),
        completedVerses: [],
        bookmarkedVerses: [],
      };
    }
  }

  // Get all reading progress
  async getAllProgress(): Promise<{ [baniId: string]: ReadingProgress }> {
    try {
      const progressJson = await AsyncStorage.getItem(this.PROGRESS_KEY);
      return progressJson ? JSON.parse(progressJson) : {};
    } catch (error) {
      console.error('Error getting all progress:', error);
      return {};
    }
  }

  // Mark a verse as completed
  async markVerseCompleted(baniId: string, verseId: string): Promise<void> {
    try {
      const progress = await this.getProgress(baniId);
      if (!progress.completedVerses.includes(verseId)) {
        progress.completedVerses.push(verseId);
        
        const allProgress = await this.getAllProgress();
        allProgress[baniId] = progress;
        
        await AsyncStorage.setItem(this.PROGRESS_KEY, JSON.stringify(allProgress));
      }
    } catch (error) {
      console.error('Error marking verse completed:', error);
    }
  }

  // Add bookmark
  async addBookmark(bookmark: Omit<BookmarkData, 'createdAt'>): Promise<void> {
    try {
      const bookmarks = await this.getBookmarks();
      const newBookmark: BookmarkData = {
        ...bookmark,
        createdAt: new Date(),
      };

      // Remove existing bookmark for the same verse if it exists
      const filteredBookmarks = bookmarks.filter(b => b.verseId !== bookmark.verseId);
      filteredBookmarks.push(newBookmark);

      await AsyncStorage.setItem(this.BOOKMARKS_KEY, JSON.stringify(filteredBookmarks));

      // Also update the progress to include this bookmark
      const progress = await this.getProgress(bookmark.baniId);
      if (!progress.bookmarkedVerses.includes(bookmark.verseId)) {
        progress.bookmarkedVerses.push(bookmark.verseId);
        
        const allProgress = await this.getAllProgress();
        allProgress[bookmark.baniId] = progress;
        
        await AsyncStorage.setItem(this.PROGRESS_KEY, JSON.stringify(allProgress));
      }
    } catch (error) {
      console.error('Error adding bookmark:', error);
    }
  }

  // Remove bookmark
  async removeBookmark(verseId: string, baniId: string): Promise<void> {
    try {
      const bookmarks = await this.getBookmarks();
      const filteredBookmarks = bookmarks.filter(b => b.verseId !== verseId);
      
      await AsyncStorage.setItem(this.BOOKMARKS_KEY, JSON.stringify(filteredBookmarks));

      // Also update the progress to remove this bookmark
      const progress = await this.getProgress(baniId);
      progress.bookmarkedVerses = progress.bookmarkedVerses.filter(id => id !== verseId);
      
      const allProgress = await this.getAllProgress();
      allProgress[baniId] = progress;
      
      await AsyncStorage.setItem(this.PROGRESS_KEY, JSON.stringify(allProgress));
    } catch (error) {
      console.error('Error removing bookmark:', error);
    }
  }

  // Get all bookmarks
  async getBookmarks(): Promise<BookmarkData[]> {
    try {
      const bookmarksJson = await AsyncStorage.getItem(this.BOOKMARKS_KEY);
      const bookmarks = bookmarksJson ? JSON.parse(bookmarksJson) : [];
      
      // Sort by creation date, newest first
      return bookmarks.sort((a: BookmarkData, b: BookmarkData) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } catch (error) {
      console.error('Error getting bookmarks:', error);
      return [];
    }
  }

  // Get bookmarks for a specific bani
  async getBookmarksForBani(baniId: string): Promise<BookmarkData[]> {
    try {
      const allBookmarks = await this.getBookmarks();
      return allBookmarks.filter(bookmark => bookmark.baniId === baniId);
    } catch (error) {
      console.error('Error getting bookmarks for bani:', error);
      return [];
    }
  }

  // Check if a verse is bookmarked
  async isVerseBookmarked(verseId: string): Promise<boolean> {
    try {
      const bookmarks = await this.getBookmarks();
      return bookmarks.some(bookmark => bookmark.verseId === verseId);
    } catch (error) {
      console.error('Error checking if verse is bookmarked:', error);
      return false;
    }
  }

  // Get reading statistics
  async getReadingStats(): Promise<{
    totalBanisStarted: number;
    totalBanisCompleted: number;
    totalVersesRead: number;
    totalBookmarks: number;
    recentlyRead: ReadingProgress[];
  }> {
    try {
      const allProgress = await this.getAllProgress();
      const bookmarks = await this.getBookmarks();
      
      const progressArray = Object.values(allProgress);
      const banisStarted = progressArray.filter(p => p.currentVerseIndex > 0).length;
      const banisCompleted = progressArray.filter(p => 
        p.currentVerseIndex >= p.totalVerses && p.totalVerses > 0
      ).length;
      const totalVersesRead = progressArray.reduce((sum, p) => sum + p.completedVerses.length, 0);
      
      // Get recently read banis (sorted by last read date)
      const recentlyRead = progressArray
        .filter(p => p.currentVerseIndex > 0)
        .sort((a, b) => new Date(b.lastReadAt).getTime() - new Date(a.lastReadAt).getTime())
        .slice(0, 5);

      return {
        totalBanisStarted: banisStarted,
        totalBanisCompleted: banisCompleted,
        totalVersesRead,
        totalBookmarks: bookmarks.length,
        recentlyRead,
      };
    } catch (error) {
      console.error('Error getting reading stats:', error);
      return {
        totalBanisStarted: 0,
        totalBanisCompleted: 0,
        totalVersesRead: 0,
        totalBookmarks: 0,
        recentlyRead: [],
      };
    }
  }

  // Clear all progress (for testing or reset)
  async clearAllProgress(): Promise<void> {
    try {
      await AsyncStorage.removeItem(this.PROGRESS_KEY);
      await AsyncStorage.removeItem(this.BOOKMARKS_KEY);
    } catch (error) {
      console.error('Error clearing progress:', error);
    }
  }

  // Export progress data (for backup)
  async exportProgressData(): Promise<{
    progress: { [baniId: string]: ReadingProgress };
    bookmarks: BookmarkData[];
    exportedAt: Date;
  }> {
    try {
      const progress = await this.getAllProgress();
      const bookmarks = await this.getBookmarks();
      
      return {
        progress,
        bookmarks,
        exportedAt: new Date(),
      };
    } catch (error) {
      console.error('Error exporting progress data:', error);
      throw error;
    }
  }

  // Import progress data (for restore)
  async importProgressData(data: {
    progress: { [baniId: string]: ReadingProgress };
    bookmarks: BookmarkData[];
  }): Promise<void> {
    try {
      await AsyncStorage.setItem(this.PROGRESS_KEY, JSON.stringify(data.progress));
      await AsyncStorage.setItem(this.BOOKMARKS_KEY, JSON.stringify(data.bookmarks));
    } catch (error) {
      console.error('Error importing progress data:', error);
      throw error;
    }
  }
}

export const progressService = new ProgressService();