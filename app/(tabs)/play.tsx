import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, List, Shuffle } from 'lucide-react-native';
import { useState, useEffect } from 'react';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import AudioPlayer from '@/components/AudioPlayer';
import MiniAudioPlayer from '@/components/MiniAudioPlayer';
import { NITNEM_AUDIO_TRACKS, formatTime } from '@/services/audioService';

interface PlaylistItem {
  id: string;
  title: string;
  titleGurmukhi: string;
  artist: string;
  duration: number;
  baniId: string;
}

const playlist: PlaylistItem[] = [
  {
    id: '1',
    title: 'Japji Sahib',
    titleGurmukhi: 'ਜਪੁਜੀ ਸਾਹਿਬ',
    artist: 'Bhai Harjinder Singh',
    duration: 1800000,
    baniId: '1'
  },
  {
    id: '2',
    title: 'Jaap Sahib',
    titleGurmukhi: 'ਜਾਪੁ ਸਾਹਿਬ',
    artist: 'Bhai Harjinder Singh',
    duration: 2400000,
    baniId: '2'
  },
  {
    id: '3',
    title: 'Tav Prasad Savaiye',
    titleGurmukhi: 'ਤਵ ਪ੍ਰਸਾਦਿ ਸਵਈਏ',
    artist: 'Bhai Harjinder Singh',
    duration: 480000,
    baniId: '3'
  },
  {
    id: '4',
    title: 'Chaupai Sahib',
    titleGurmukhi: 'ਚੌਪਈ ਸਾਹਿਬ',
    artist: 'Bhai Harjinder Singh',
    duration: 600000,
    baniId: '4'
  },
  {
    id: '5',
    title: 'Anand Sahib',
    titleGurmukhi: 'ਆਨੰਦੁ ਸਾਹਿਬ',
    artist: 'Bhai Harjinder Singh',
    duration: 1200000,
    baniId: '5'
  },
  {
    id: '6',
    title: 'Rehras Sahib',
    titleGurmukhi: 'ਰਹਰਾਸ ਸਾਹਿਬ',
    artist: 'Bhai Harjinder Singh',
    duration: 900000,
    baniId: '6'
  },
  {
    id: '8',
    title: 'Kirtan Sohila',
    titleGurmukhi: 'ਕੀਰਤਨ ਸੋਹਿਲਾ',
    artist: 'Bhai Harjinder Singh',
    duration: 300000,
    baniId: '8'
  },
  {
    id: '10',
    title: 'Sukhmani Sahib',
    titleGurmukhi: 'ਸੁਖਮਨੀ ਸਾਹਿਬ',
    artist: 'Bhai Harjinder Singh',
    duration: 3600000,
    baniId: '10'
  }
];

export default function PlayScreen() {
  const audioPlayer = useAudioPlayer();
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [shuffleMode, setShuffleMode] = useState(false);

  const handlePlayTrack = async (baniId: string) => {
    await audioPlayer.playBani(baniId);
  };

  const handleTrackComplete = () => {
    // Auto-play next track in playlist
    if (audioPlayer.currentTrack) {
      const currentIndex = playlist.findIndex(item => item.baniId === audioPlayer.currentTrack?.baniId);
      if (currentIndex !== -1 && currentIndex < playlist.length - 1) {
        const nextTrack = playlist[currentIndex + 1];
        handlePlayTrack(nextTrack.baniId);
      }
    }
  };

  const playRandomTrack = () => {
    const randomIndex = Math.floor(Math.random() * playlist.length);
    const randomTrack = playlist[randomIndex];
    handlePlayTrack(randomTrack.baniId);
  };

  const getCurrentTrackInfo = () => {
    if (!audioPlayer.currentTrack) return null;
    return playlist.find(item => item.baniId === audioPlayer.currentTrack?.baniId);
  };

  const currentTrackInfo = getCurrentTrackInfo();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Audio Player</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity 
            style={[styles.headerButton, shuffleMode && styles.headerButtonActive]} 
            onPress={() => setShuffleMode(!shuffleMode)}
          >
            <Shuffle size={20} color={shuffleMode ? "#10b981" : "#ffffff"} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.headerButton, showPlaylist && styles.headerButtonActive]} 
            onPress={() => setShowPlaylist(!showPlaylist)}
          >
            <List size={20} color={showPlaylist ? "#10b981" : "#ffffff"} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Now Playing Section */}
        {currentTrackInfo && (
          <View style={styles.nowPlayingSection}>
            <Text style={styles.sectionTitle}>Now Playing</Text>
            <View style={styles.nowPlayingCard}>
              <View style={styles.nowPlayingInfo}>
                <Text style={styles.nowPlayingTitle}>{currentTrackInfo.title}</Text>
                <Text style={styles.nowPlayingTitleGurmukhi}>{currentTrackInfo.titleGurmukhi}</Text>
                <Text style={styles.nowPlayingArtist}>{currentTrackInfo.artist}</Text>
                
                <View style={styles.nowPlayingProgress}>
                  <Text style={styles.progressTime}>
                    {formatTime(audioPlayer.playbackStatus.position)}
                  </Text>
                  <View style={styles.progressBarContainer}>
                    <View style={styles.progressBarBackground}>
                      <View 
                        style={[
                          styles.progressBarFill, 
                          { 
                            width: audioPlayer.playbackStatus.duration > 0 
                              ? `${(audioPlayer.playbackStatus.position / audioPlayer.playbackStatus.duration) * 100}%` 
                              : '0%' 
                          }
                        ]} 
                      />
                    </View>
                  </View>
                  <Text style={styles.progressTime}>
                    {formatTime(audioPlayer.playbackStatus.duration)}
                  </Text>
                </View>
              </View>

              <View style={styles.nowPlayingControls}>
                <TouchableOpacity style={styles.controlButton} onPress={audioPlayer.togglePlayPause}>
                  {audioPlayer.playbackStatus.isPlaying ? (
                    <Pause size={32} color="#ffffff" fill="#ffffff" />
                  ) : (
                    <Play size={32} color="#ffffff" fill="#ffffff" />
                  )}
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.expandButton} onPress={audioPlayer.expandPlayer}>
                  <Text style={styles.expandButtonText}>Full Player</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsContainer}>
            <TouchableOpacity style={styles.quickActionCard} onPress={playRandomTrack}>
              <Shuffle size={24} color="#10b981" />
              <Text style={styles.quickActionTitle}>Random Bani</Text>
              <Text style={styles.quickActionSubtitle}>Play random audio</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickActionCard} onPress={() => handlePlayTrack('1')}>
              <Play size={24} color="#10b981" />
              <Text style={styles.quickActionTitle}>Start Nitnem</Text>
              <Text style={styles.quickActionSubtitle}>Begin with Japji</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Playlist */}
        <View style={styles.playlistSection}>
          <Text style={styles.sectionTitle}>Gurbani Playlist</Text>
          {playlist.map((item, index) => (
            <TouchableOpacity 
              key={item.id} 
              style={[
                styles.playlistItem,
                currentTrackInfo?.id === item.id && styles.playlistItemActive
              ]}
              onPress={() => handlePlayTrack(item.baniId)}
            >
              <View style={styles.playlistItemNumber}>
                <Text style={styles.playlistItemNumberText}>{index + 1}</Text>
              </View>
              
              <View style={styles.playlistItemInfo}>
                <Text style={[
                  styles.playlistItemTitle,
                  currentTrackInfo?.id === item.id && styles.playlistItemTitleActive
                ]}>
                  {item.title}
                </Text>
                <Text style={styles.playlistItemTitleGurmukhi}>{item.titleGurmukhi}</Text>
                <Text style={styles.playlistItemArtist}>{item.artist}</Text>
              </View>
              
              <View style={styles.playlistItemMeta}>
                <Text style={styles.playlistItemDuration}>
                  {formatTime(item.duration)}
                </Text>
                {currentTrackInfo?.id === item.id && audioPlayer.playbackStatus.isPlaying && (
                  <View style={styles.playingIndicator}>
                    <View style={styles.playingBar} />
                    <View style={styles.playingBar} />
                    <View style={styles.playingBar} />
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Audio Players */}
      {audioPlayer.currentTrack && (
        <>
          <AudioPlayer
            track={audioPlayer.currentTrack}
            isVisible={audioPlayer.isExpanded}
            onClose={audioPlayer.collapsePlayer}
            onTrackComplete={handleTrackComplete}
          />
          
          <MiniAudioPlayer
            isVisible={audioPlayer.isVisible && !audioPlayer.isExpanded}
            onExpand={audioPlayer.expandPlayer}
            onClose={audioPlayer.stopAudio}
          />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerButtonActive: {
    backgroundColor: '#10b981',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 16,
    marginTop: 24,
  },
  nowPlayingSection: {
    marginBottom: 8,
  },
  nowPlayingCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 20,
  },
  nowPlayingInfo: {
    marginBottom: 20,
  },
  nowPlayingTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  nowPlayingTitleGurmukhi: {
    fontSize: 18,
    color: '#d1d5db',
    marginBottom: 8,
  },
  nowPlayingArtist: {
    fontSize: 16,
    color: '#9ca3af',
    marginBottom: 16,
  },
  nowPlayingProgress: {
    alignItems: 'center',
  },
  progressTime: {
    fontSize: 14,
    color: '#9ca3af',
    marginBottom: 8,
  },
  progressBarContainer: {
    width: '100%',
    marginBottom: 8,
  },
  progressBarBackground: {
    height: 4,
    backgroundColor: '#374151',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#10b981',
    borderRadius: 2,
  },
  nowPlayingControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  controlButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#10b981',
    justifyContent: 'center',
    alignItems: 'center',
  },
  expandButton: {
    backgroundColor: '#374151',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  expandButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  quickActionsSection: {
    marginBottom: 8,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  quickActionCard: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  quickActionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginTop: 12,
    marginBottom: 4,
  },
  quickActionSubtitle: {
    fontSize: 12,
    color: '#9ca3af',
    textAlign: 'center',
  },
  playlistSection: {
    marginBottom: 100,
  },
  playlistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  playlistItemActive: {
    backgroundColor: '#10b981',
  },
  playlistItemNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#374151',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  playlistItemNumberText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  playlistItemInfo: {
    flex: 1,
  },
  playlistItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 2,
  },
  playlistItemTitleActive: {
    color: '#000000',
  },
  playlistItemTitleGurmukhi: {
    fontSize: 14,
    color: '#d1d5db',
    marginBottom: 2,
  },
  playlistItemArtist: {
    fontSize: 12,
    color: '#9ca3af',
  },
  playlistItemMeta: {
    alignItems: 'flex-end',
  },
  playlistItemDuration: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 4,
  },
  playingIndicator: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 2,
  },
  playingBar: {
    width: 3,
    height: 12,
    backgroundColor: '#000000',
    borderRadius: 1,
  },
});