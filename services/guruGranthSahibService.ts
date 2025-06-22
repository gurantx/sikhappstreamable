// Complete Guru Granth Sahib Service - All 1430 Angs with SikhiToTheMax API integration
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface GuruGranthSahibVerse {
  id: string;
  gurmukhi: string;
  english?: string;
  transliteration?: string;
  translation?: string;
  punjabiTranslation?: string;
  pageNumber: number;
  lineNumber: number;
  raag?: string;
  author?: string;
  verseType?: 'verse' | 'header' | 'title';
  sourceId?: number;
}

export interface AngContent {
  angNumber: number;
  verses: GuruGranthSahibVerse[];
  raag?: string;
  author?: string;
  totalLines: number;
  nextAng?: number;
  previousAng?: number;
}

export interface SearchResult {
  verses: GuruGranthSahibVerse[];
  totalResults: number;
  searchTerm: string;
}

// API endpoints for SikhiToTheMax
const STTM_API_BASE = 'https://api.sikhitothemax.org';
const STTM_WEB_BASE = 'https://www.sikhitothemax.org';

class GuruGranthSahibService {
  private cache: Map<string, any> = new Map();
  private angCache: Map<number, AngContent> = new Map();

  // Get specific Ang (page) from Guru Granth Sahib
  async getAng(angNumber: number): Promise<AngContent | null> {
    if (angNumber < 1 || angNumber > 1430) {
      throw new Error('Ang number must be between 1 and 1430');
    }

    const cacheKey = `ang_${angNumber}`;
    
    if (this.angCache.has(angNumber)) {
      return this.angCache.get(angNumber)!;
    }

    try {
      // Try loading from local cache first
      let angContent = await this.loadAngFromCache(angNumber);
      
      if (!angContent) {
        // Try API endpoint
        angContent = await this.fetchAngFromAPI(angNumber);
      }
      
      if (!angContent) {
        // Use offline data as fallback
        angContent = this.getOfflineAngData(angNumber);
      }

      if (angContent) {
        this.angCache.set(angNumber, angContent);
        await this.saveAngToCache(angNumber, angContent);
      }

      return angContent;
    } catch (error) {
      console.error(`Error fetching Ang ${angNumber}:`, error);
      return this.getOfflineAngData(angNumber);
    }
  }

  // Fetch Ang from SikhiToTheMax API
  private async fetchAngFromAPI(angNumber: number): Promise<AngContent | null> {
    try {
      const response = await fetch(`${STTM_API_BASE}/v2/ang/${angNumber}?source=G`, {
        timeout: 8000,
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'GurbaniApp/1.0'
        }
      });

      if (response.ok) {
        // Check if the response is actually JSON before parsing
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          console.warn(`API returned non-JSON content for Ang ${angNumber}. Content-Type: ${contentType}`);
          return null;
        }

        const data = await response.json();
        return this.processAPIResponse(data, angNumber);
      } else {
        console.warn(`API request failed for Ang ${angNumber}. Status: ${response.status}`);
        return null;
      }
    } catch (error) {
      console.warn(`API fetch failed for Ang ${angNumber}:`, error);
    }
    return null;
  }

  // Process API response from SikhiToTheMax
  private processAPIResponse(data: any, angNumber: number): AngContent {
    const verses: GuruGranthSahibVerse[] = [];
    
    if (data.verses && Array.isArray(data.verses)) {
      data.verses.forEach((verse: any, index: number) => {
        verses.push({
          id: `ang_${angNumber}_verse_${index + 1}`,
          gurmukhi: verse.verse?.gurmukhi || verse.gurmukhi || '',
          english: verse.verse?.english || verse.english,
          transliteration: verse.verse?.transliteration || verse.transliteration,
          translation: verse.translation?.english || verse.translation,
          punjabiTranslation: verse.translation?.punjabi,
          pageNumber: angNumber,
          lineNumber: index + 1,
          raag: verse.raag?.english || verse.raag,
          author: verse.writer?.english || verse.author,
          verseType: this.determineVerseType(verse),
          sourceId: verse.verseId || verse.id
        });
      });
    }

    return {
      angNumber,
      verses,
      raag: data.raag?.english || data.raag,
      author: data.writer?.english || data.author,
      totalLines: verses.length,
      nextAng: angNumber < 1430 ? angNumber + 1 : undefined,
      previousAng: angNumber > 1 ? angNumber - 1 : undefined
    };
  }

  // Determine verse type based on content
  private determineVerseType(verse: any): 'verse' | 'header' | 'title' {
    if (verse.type) {
      return verse.type;
    }
    
    const text = verse.verse?.gurmukhi || verse.gurmukhi || '';
    
    // Check for common headers and titles
    if (text.includes('॥') && text.length < 50) {
      return 'header';
    }
    
    if (text.includes('ਰਾਗੁ') || text.includes('ਮਹਲਾ')) {
      return 'title';
    }
    
    return 'verse';
  }

  // Search across all Angs
  async searchGuruGranthSahib(query: string, limit: number = 50): Promise<SearchResult> {
    try {
      const response = await fetch(`${STTM_API_BASE}/v2/search/${encodeURIComponent(query)}?source=G&limit=${limit}`, {
        timeout: 15000,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        // Check if the response is actually JSON before parsing
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          console.warn(`Search API returned non-JSON content for query: ${query}. Content-Type: ${contentType}`);
          return {
            verses: [],
            totalResults: 0,
            searchTerm: query
          };
        }

        const data = await response.json();
        return this.processSearchResults(data, query);
      }
    } catch (error) {
      console.error('Search error:', error);
    }

    return {
      verses: [],
      totalResults: 0,
      searchTerm: query
    };
  }

  // Process search results
  private processSearchResults(data: any, query: string): SearchResult {
    const verses: GuruGranthSahibVerse[] = [];
    
    if (data.verses && Array.isArray(data.verses)) {
      data.verses.forEach((verse: any, index: number) => {
        verses.push({
          id: `search_${index + 1}`,
          gurmukhi: verse.verse?.gurmukhi || verse.gurmukhi || '',
          english: verse.verse?.english || verse.english,
          transliteration: verse.verse?.transliteration || verse.transliteration,
          translation: verse.translation?.english || verse.translation,
          punjabiTranslation: verse.translation?.punjabi,
          pageNumber: verse.pageNo || verse.ang || 0,
          lineNumber: verse.lineNo || 0,
          raag: verse.raag?.english || verse.raag,
          author: verse.writer?.english || verse.author,
          verseType: this.determineVerseType(verse),
          sourceId: verse.verseId || verse.id
        });
      });
    }

    return {
      verses,
      totalResults: data.totalResults || verses.length,
      searchTerm: query
    };
  }

  // Get random Ang for daily reading
  async getRandomAng(): Promise<AngContent | null> {
    const randomAngNumber = Math.floor(Math.random() * 1430) + 1;
    return this.getAng(randomAngNumber);
  }

  // Get Ang range (for reading multiple pages)
  async getAngRange(startAng: number, endAng: number): Promise<AngContent[]> {
    const angs: AngContent[] = [];
    
    for (let angNumber = startAng; angNumber <= endAng && angNumber <= 1430; angNumber++) {
      const ang = await this.getAng(angNumber);
      if (ang) {
        angs.push(ang);
      }
    }
    
    return angs;
  }

  // Get Angs by Raag
  async getAngsByRaag(raagName: string): Promise<AngContent[]> {
    try {
      const response = await fetch(`${STTM_API_BASE}/v2/raags/${encodeURIComponent(raagName)}?source=G`, {
        timeout: 15000,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        // Check if the response is actually JSON before parsing
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          console.warn(`Raag API returned non-JSON content for raag: ${raagName}. Content-Type: ${contentType}`);
          return [];
        }

        const data = await response.json();
        const angs: AngContent[] = [];
        
        if (data.angs && Array.isArray(data.angs)) {
          for (const angNumber of data.angs) {
            const ang = await this.getAng(angNumber);
            if (ang) {
              angs.push(ang);
            }
          }
        }
        
        return angs;
      }
    } catch (error) {
      console.error(`Error fetching Raag ${raagName}:`, error);
    }
    
    return [];
  }

  // Get all available Raags
  async getAllRaags(): Promise<string[]> {
    try {
      const response = await fetch(`${STTM_API_BASE}/v2/raags?source=G`, {
        timeout: 10000,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        // Check if the response is actually JSON before parsing
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          console.warn(`Raags list API returned non-JSON content. Content-Type: ${contentType}`);
          return this.getDefaultRaagsList();
        }

        const data = await response.json();
        return data.raags?.map((raag: any) => raag.english || raag.name) || this.getDefaultRaagsList();
      }
    } catch (error) {
      console.error('Error fetching Raags:', error);
    }
    
    return this.getDefaultRaagsList();
  }

  // Get default raags list as fallback
  private getDefaultRaagsList(): string[] {
    return [
      'Siri Raag', 'Maajh', 'Gauri', 'Asa', 'Gujri', 'Devgandhari',
      'Bihagra', 'Vadhans', 'Sorath', 'Dhanasri', 'Jaitsri',
      'Todi', 'Bairari', 'Tilang', 'Suhi', 'Bilaval', 'Gaund',
      'Ramkali', 'Nat Narain', 'Mali Gaura', 'Maru', 'Tukhari',
      'Kedara', 'Bhairo', 'Basant', 'Sarang', 'Malkauns',
      'Kanra', 'Kalyan', 'Prabhati', 'Jaijavanti'
    ];
  }

  // Save Ang to local cache
  private async saveAngToCache(angNumber: number, angContent: AngContent): Promise<void> {
    try {
      await AsyncStorage.setItem(`ggs_ang_${angNumber}`, JSON.stringify(angContent));
    } catch (error) {
      console.error(`Error saving Ang ${angNumber} to cache:`, error);
    }
  }

  // Load Ang from local cache
  private async loadAngFromCache(angNumber: number): Promise<AngContent | null> {
    try {
      const cached = await AsyncStorage.getItem(`ggs_ang_${angNumber}`);
      return cached ? JSON.parse(cached) : null;
    } catch (error) {
      console.error(`Error loading Ang ${angNumber} from cache:`, error);
      return null;
    }
  }

  // Enhanced offline data for more Angs
  private getOfflineAngData(angNumber: number): AngContent | null {
    const offlineData: { [key: number]: AngContent } = {
      1: {
        angNumber: 1,
        verses: [
          {
            id: 'ang1_verse1',
            gurmukhi: 'ੴ ਸਤਿ ਨਾਮੁ ਕਰਤਾ ਪੁਰਖੁ ਨਿਰਭਉ ਨਿਰਵੈਰੁ ਅਕਾਲ ਮੂਰਤਿ ਅਜੂਨੀ ਸੈਭੰ ਗੁਰ ਪ੍ਰਸਾਦਿ ॥',
            english: 'One Universal Creator God. Truth Is The Name. Creative Being Personified. No Fear. No Hatred. Image Of The Undying. Beyond Birth. Self-Existent. By Guru\'s Grace.',
            translation: 'There is one God whose name is Truth, the Creator, without fear, without hate, immortal, unborn, self-existent, known by the Guru\'s grace.',
            pageNumber: 1,
            lineNumber: 1,
            author: 'Guru Nanak Dev Ji',
            verseType: 'verse'
          },
          {
            id: 'ang1_verse2',
            gurmukhi: '॥ ਜਪੁ ॥',
            english: '|| Jap ||',
            translation: 'Chant And Meditate',
            pageNumber: 1,
            lineNumber: 2,
            author: 'Guru Nanak Dev Ji',
            verseType: 'header'
          },
          {
            id: 'ang1_verse3',
            gurmukhi: 'ਆਦਿ ਸਚੁ ਜੁਗਾਦਿ ਸਚੁ ॥',
            english: 'True In The Primal Beginning. True Throughout The Ages.',
            translation: 'True in the beginning, true through all the ages.',
            pageNumber: 1,
            lineNumber: 3,
            author: 'Guru Nanak Dev Ji',
            verseType: 'verse'
          },
          {
            id: 'ang1_verse4',
            gurmukhi: 'ਹੈ ਭੀ ਸਚੁ ਨਾਨਕ ਹੋਸੀ ਭੀ ਸਚੁ ॥੧॥',
            english: 'True Here And Now. O Nanak, Forever And Ever True. ||1||',
            translation: 'True even now, O Nanak, and true He shall ever be.',
            pageNumber: 1,
            lineNumber: 4,
            author: 'Guru Nanak Dev Ji',
            verseType: 'verse'
          }
        ],
        raag: 'Siri Raag',
        author: 'Guru Nanak Dev Ji',
        totalLines: 4,
        nextAng: 2,
        previousAng: undefined
      },
      2: {
        angNumber: 2,
        verses: [
          {
            id: 'ang2_verse1',
            gurmukhi: 'ਸੋਚੈ ਸੋਚਿ ਨ ਹੋਵਈ ਜੇ ਸੋਚੀ ਲਖ ਵਾਰ ॥',
            english: 'By thinking, He cannot be reduced to thought, even by thinking hundreds of thousands of times.',
            translation: 'By thinking, He cannot be reduced to thought, even by thinking hundreds of thousands of times.',
            pageNumber: 2,
            lineNumber: 1,
            author: 'Guru Nanak Dev Ji',
            verseType: 'verse'
          },
          {
            id: 'ang2_verse2',
            gurmukhi: 'ਚੁਪੈ ਚੁਪ ਨ ਹੋਵਈ ਜੇ ਲਾਇ ਰਹਾ ਲਿਵ ਤਾਰ ॥',
            english: 'By remaining silent, inner silence is not obtained, even by remaining lovingly absorbed deep within.',
            translation: 'By remaining silent, inner silence is not obtained, even by remaining lovingly absorbed deep within.',
            pageNumber: 2,
            lineNumber: 2,
            author: 'Guru Nanak Dev Ji',
            verseType: 'verse'
          },
          {
            id: 'ang2_verse3',
            gurmukhi: 'ਭੁਖਿਆ ਭੁਖ ਨ ਉਤਰੀ ਜੇ ਬੰਨਾ ਪੁਰੀਆ ਭਾਰ ॥',
            english: 'The hunger of the hungry is not appeased, even by piling up loads of worldly goods.',
            translation: 'The hunger of the hungry is not appeased, even by piling up loads of worldly goods.',
            pageNumber: 2,
            lineNumber: 3,
            author: 'Guru Nanak Dev Ji',
            verseType: 'verse'
          },
          {
            id: 'ang2_verse4',
            gurmukhi: 'ਸਹਸ ਸਿਆਣਪਾ ਲਖ ਹੋਹਿ ਤ ਇਕ ਨ ਚਲੈ ਨਾਲਿ ॥',
            english: 'Hundreds of thousands of clever tricks, but not even one of them will go along with you in the end.',
            translation: 'Hundreds of thousands of clever tricks, but not even one of them will go along with you in the end.',
            pageNumber: 2,
            lineNumber: 4,
            author: 'Guru Nanak Dev Ji',
            verseType: 'verse'
          },
          {
            id: 'ang2_verse5',
            gurmukhi: 'ਕਿਵ ਸਚਿਆਰਾ ਹੋਈਐ ਕਿਵ ਕੂੜੈ ਤੁਟੈ ਪਾਲਿ ॥',
            english: 'So how can you become truthful? And how can the veil of illusion be torn away?',
            translation: 'So how can you become truthful? And how can the veil of illusion be torn away?',
            pageNumber: 2,
            lineNumber: 5,
            author: 'Guru Nanak Dev Ji',
            verseType: 'verse'
          },
          {
            id: 'ang2_verse6',
            gurmukhi: 'ਹੁਕਮਿ ਰਜਾਈ ਚਲਣਾ ਨਾਨਕ ਲਿਖਿਆ ਨਾਲਿ ॥੨॥',
            english: 'O Nanak, it is written that you shall obey the Hukam of His Command, and walk in the Way of His Will. ||2||',
            translation: 'O Nanak, it is written that you shall obey the Hukam of His Command, and walk in the Way of His Will.',
            pageNumber: 2,
            lineNumber: 6,
            author: 'Guru Nanak Dev Ji',
            verseType: 'verse'
          }
        ],
        raag: 'Siri Raag',
        author: 'Guru Nanak Dev Ji',
        totalLines: 6,
        nextAng: 3,
        previousAng: 1
      },
      3: {
        angNumber: 3,
        verses: [
          {
            id: 'ang3_verse1',
            gurmukhi: 'ਹੁਕਮੀ ਹੋਵਨਿ ਆਕਾਰ ਹੁਕਮੁ ਨ ਕਹਿਆ ਜਾਈ ॥',
            english: 'By His Command, bodies are created; His Command cannot be described.',
            translation: 'By His Command, bodies are created; His Command cannot be described.',
            pageNumber: 3,
            lineNumber: 1,
            author: 'Guru Nanak Dev Ji',
            verseType: 'verse'
          },
          {
            id: 'ang3_verse2',
            gurmukhi: 'ਹੁਕਮੀ ਹੋਵਨਿ ਜੀਅ ਹੁਕਮਿ ਮਿਲੈ ਵਡਿਆਈ ॥',
            english: 'By His Command, souls come into being; by His Command, glory and greatness are obtained.',
            translation: 'By His Command, souls come into being; by His Command, glory and greatness are obtained.',
            pageNumber: 3,
            lineNumber: 2,
            author: 'Guru Nanak Dev Ji',
            verseType: 'verse'
          },
          {
            id: 'ang3_verse3',
            gurmukhi: 'ਹੁਕਮੀ ਉਤਮੁ ਨੀਚੁ ਹੁਕਮਿ ਲਿਖਿ ਦੁਖ ਸੁਖ ਪਾਈਅਹਿ ॥',
            english: 'By His Command, some are high and some are low; by His Written Command, pain and pleasure are obtained.',
            translation: 'By His Command, some are high and some are low; by His Written Command, pain and pleasure are obtained.',
            pageNumber: 3,
            lineNumber: 3,
            author: 'Guru Nanak Dev Ji',
            verseType: 'verse'
          }
        ],
        raag: 'Siri Raag',
        author: 'Guru Nanak Dev Ji',
        totalLines: 3,
        nextAng: 4,
        previousAng: 2
      }
    };

    // If we have offline data for this Ang, return it
    if (offlineData[angNumber]) {
      return offlineData[angNumber];
    }

    // For other Angs, create a basic structure with a message
    return {
      angNumber,
      verses: [
        {
          id: `ang${angNumber}_placeholder`,
          gurmukhi: `ਅੰਗ ${angNumber} - ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ`,
          english: `Ang ${angNumber} - Sri Guru Granth Sahib Ji`,
          translation: `This is Ang (page) ${angNumber} of Sri Guru Granth Sahib Ji. Content will be loaded when internet connection is available.`,
          pageNumber: angNumber,
          lineNumber: 1,
          author: 'Guru Granth Sahib Ji',
          verseType: 'verse'
        }
      ],
      raag: 'Various Raags',
      author: 'Various Gurus',
      totalLines: 1,
      nextAng: angNumber < 1430 ? angNumber + 1 : undefined,
      previousAng: angNumber > 1 ? angNumber - 1 : undefined
    };
  }

  // Get Ang navigation info
  getAngNavigation(currentAng: number): { previous?: number; next?: number; canGoPrevious: boolean; canGoNext: boolean } {
    return {
      previous: currentAng > 1 ? currentAng - 1 : undefined,
      next: currentAng < 1430 ? currentAng + 1 : undefined,
      canGoPrevious: currentAng > 1,
      canGoNext: currentAng < 1430
    };
  }

  // Clear cache
  clearCache(): void {
    this.cache.clear();
    this.angCache.clear();
  }

  // Get cache size
  getCacheSize(): number {
    return this.angCache.size;
  }

  // Preload popular Angs
  async preloadPopularAngs(): Promise<void> {
    const popularAngs = [1, 2, 3, 4, 5, 262, 917, 1429, 1430]; // First few, Sukhmani start, Anand start, last few
    
    for (const angNumber of popularAngs) {
      try {
        await this.getAng(angNumber);
      } catch (error) {
        console.warn(`Failed to preload Ang ${angNumber}:`, error);
      }
    }
  }
}

export const guruGranthSahibService = new GuruGranthSahibService();