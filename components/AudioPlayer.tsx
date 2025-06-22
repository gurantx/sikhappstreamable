// Complete Audio Player Component
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Alert
} from 'react-native';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX,
  RotateCcw,
  RotateCw
} from 'lucide-react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
  Extrapolate,
  withTiming,
  runOnJS
} from 'react-native-reanimated';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { audioService, AudioTrack, PlaybackStatus, formatTime } from '@/services/audioService';

interface AudioPlayerProps {
  track: AudioTrack;
  isVisible: boolean;
  onClose?: () => void;
  onTrackComplete?: () => void;
}

const { width: screenWidth } = Dimensions.get('window');
const PROGRESS_BAR_WIDTH = screenWidth - 80;

export default function AudioPlayer({ track, isVisible, onClose, onTrackComplete }: AudioPlayerProps) {
  const [playbackStatus, setPlaybackStatus] = useState<PlaybackStatus>({
    isLoaded: false,
    isPlaying: false,
    position: 0,
    duration: 0,
    isBuffering: false,
    volume: 1.0,
    rate: 1.0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolume] = useState(1.0);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [showVolumeControl, setShowVolumeControl] = useState(false);

  // Animated values
  const progressPosition = useSharedValue(0);
  const volumeOpacity = useSharedValue(0);
  const playerScale = useSharedValue(isVisible ? 1 : 0);

  // Refs
  const progressUpdateRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // Set up audio service callback
    audioService.setStatusUpdateCallback(handleStatusUpdate);

    // Load track when component mounts or track changes
    if (track && isVisible) {
      loadTrack();
    }

    return () => {
      // Cleanup
      if (progressUpdateRef.current) {
        clearInterval(progressUpdateRef.current);
      }
    };
  }, [track, isVisible]);

  useEffect(() => {
    // Animate player visibility
    playerScale.value = withSpring(isVisible ? 1 : 0, {
      damping: 20,
      stiffness: 300
    });
  }, [isVisible]);

  useEffect(() => {
    // Update progress bar position
    if (playbackStatus.duration > 0) {
      const progress = playbackStatus.position / playbackStatus.duration;
      progressPosition.value = withTiming(progress, { duration: 100 });
    }
  }, [playbackStatus.position, playbackStatus.duration]);

  useEffect(() => {
    // Show/hide volume control
    volumeOpacity.value = withTiming(showVolumeControl ? 1 : 0, { duration: 200 });
  }, [showVolumeControl]);

  const loadTrack = async () => {
    try {
      setIsLoading(true);
      await audioService.loadAndPlay(track);
    } catch (error) {
      console.error('Error loading track:', error);
      Alert.alert('Error', 'Failed to load audio. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusUpdate = (status: PlaybackStatus) => {
    setPlaybackStatus(status);

    // Check if track completed
    if (status.isLoaded && status.duration > 0 && status.position >= status.duration - 1000) {
      if (onTrackComplete) {
        onTrackComplete();
      }
    }
  };

  const togglePlayPause = async () => {
    try {
      if (playbackStatus.isPlaying) {
        await audioService.pause();
      } else {
        await audioService.play();
      }
    } catch (error) {
      console.error('Error toggling play/pause:', error);
    }
  };

  const seekBackward = async () => {
    const newPosition = Math.max(0, playbackStatus.position - 10000); // 10 seconds back
    await audioService.seekTo(newPosition);
  };

  const seekForward = async () => {
    const newPosition = Math.min(playbackStatus.duration, playbackStatus.position + 10000); // 10 seconds forward
    await audioService.seekTo(newPosition);
  };

  const toggleVolume = async () => {
    const newVolume = volume > 0 ? 0 : 1.0;
    setVolume(newVolume);
    await audioService.setVolume(newVolume);
  };

  const adjustVolume = async (newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    setVolume(clampedVolume);
    await audioService.setVolume(clampedVolume);
  };

  const cyclePlaybackRate = async () => {
    const rates = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];
    const currentIndex = rates.indexOf(playbackRate);
    const nextRate = rates[(currentIndex + 1) % rates.length];
    setPlaybackRate(nextRate);
    await audioService.setRate(nextRate);
  };

  // Progress bar gesture
  const progressGesture = Gesture.Pan()
    .onUpdate((event) => {
      const progress = Math.max(0, Math.min(1, event.x / PROGRESS_BAR_WIDTH));
      progressPosition.value = progress;
    })
    .onEnd((event) => {
      const progress = Math.max(0, Math.min(1, event.x / PROGRESS_BAR_WIDTH));
      const newPosition = progress * playbackStatus.duration;
      runOnJS(audioService.seekTo)(newPosition);
    });

  // Volume control gesture
  const volumeGesture = Gesture.Pan()
    .onUpdate((event) => {
      const volumeProgress = Math.max(0, Math.min(1, 1 - (event.y / 100)));
      runOnJS(adjustVolume)(volumeProgress);
    });

  // Animated styles
  const playerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: playerScale.value }],
      opacity: playerScale.value,
    };
  });

  const progressAnimatedStyle = useAnimatedStyle(() => {
    return {
      width: `${progressPosition.value * 100}%`,
    };
  });

  const volumeControlStyle = useAnimatedStyle(() => {
    return {
      opacity: volumeOpacity.value,
      transform: [{ scale: volumeOpacity.value }],
    };
  });

  if (!isVisible) return null;

  return (
    <Animated.View style={[styles.container, playerAnimatedStyle]}>
      <View style={styles.playerCard}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.trackInfo}>
            <Text style={styles.trackTitle}>{track.title}</Text>
            <Text style={styles.trackArtist}>{track.artist}</Text>
          </View>
          {onClose && (
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Progress Bar */}
        <View style={styles.progressSection}>
          <Text style={styles.timeText}>
            {formatTime(playbackStatus.position)}
          </Text>
          
          <GestureDetector gesture={progressGesture}>
            <View style={styles.progressBarContainer}>
              <View style={styles.progressBarBackground}>
                <Animated.View style={[styles.progressBarFill, progressAnimatedStyle]} />
              </View>
            </View>
          </GestureDetector>
          
          <Text style={styles.timeText}>
            {formatTime(playbackStatus.duration)}
          </Text>
        </View>

        {/* Controls */}
        <View style={styles.controlsContainer}>
          {/* Playback Rate */}
          <TouchableOpacity style={styles.rateButton} onPress={cyclePlaybackRate}>
            <Text style={styles.rateText}>{playbackRate}x</Text>
          </TouchableOpacity>

          {/* Seek Backward */}
          <TouchableOpacity style={styles.controlButton} onPress={seekBackward}>
            <RotateCcw size={24} color="#ffffff" />
            <Text style={styles.seekText}>10s</Text>
          </TouchableOpacity>

          {/* Play/Pause */}
          <TouchableOpacity style={styles.playButton} onPress={togglePlayPause} disabled={isLoading}>
            {isLoading || playbackStatus.isBuffering ? (
              <ActivityIndicator size="large" color="#ffffff" />
            ) : playbackStatus.isPlaying ? (
              <Pause size={32} color="#ffffff" fill="#ffffff" />
            ) : (
              <Play size={32} color="#ffffff" fill="#ffffff" />
            )}
          </TouchableOpacity>

          {/* Seek Forward */}
          <TouchableOpacity style={styles.controlButton} onPress={seekForward}>
            <RotateCw size={24} color="#ffffff" />
            <Text style={styles.seekText}>10s</Text>
          </TouchableOpacity>

          {/* Volume */}
          <TouchableOpacity 
            style={styles.volumeButton} 
            onPress={toggleVolume}
            onLongPress={() => setShowVolumeControl(!showVolumeControl)}
          >
            {volume > 0 ? (
              <Volume2 size={24} color="#ffffff" />
            ) : (
              <VolumeX size={24} color="#ffffff" />
            )}
          </TouchableOpacity>
        </View>

        {/* Volume Control Slider */}
        <Animated.View style={[styles.volumeControlContainer, volumeControlStyle]}>
          <Text style={styles.volumeLabel}>Volume: {Math.round(volume * 100)}%</Text>
          <GestureDetector gesture={volumeGesture}>
            <View style={styles.volumeSlider}>
              <View style={[styles.volumeFill, { height: `${volume * 100}%` }]} />
            </View>
          </GestureDetector>
        </Animated.View>

        {/* Status Indicators */}
        {playbackStatus.isBuffering && (
          <View style={styles.bufferingIndicator}>
            <ActivityIndicator size="small" color="#10b981" />
            <Text style={styles.bufferingText}>Buffering...</Text>
          </View>
        )}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    zIndex: 1000,
  },
  playerCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  trackInfo: {
    flex: 1,
  },
  trackTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  trackArtist: {
    fontSize: 14,
    color: '#9ca3af',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#374151',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  progressSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  timeText: {
    fontSize: 12,
    color: '#9ca3af',
    minWidth: 40,
  },
  progressBarContainer: {
    flex: 1,
    marginHorizontal: 12,
    height: 40,
    justifyContent: 'center',
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
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  rateButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#374151',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rateText: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: '600',
  },
  controlButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#374151',
    justifyContent: 'center',
    alignItems: 'center',
  },
  seekText: {
    fontSize: 8,
    color: '#ffffff',
    marginTop: 2,
  },
  playButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#10b981',
    justifyContent: 'center',
    alignItems: 'center',
  },
  volumeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#374151',
    justifyContent: 'center',
    alignItems: 'center',
  },
  volumeControlContainer: {
    position: 'absolute',
    right: 20,
    bottom: 80,
    backgroundColor: '#2d3748',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  volumeLabel: {
    fontSize: 12,
    color: '#ffffff',
    marginBottom: 8,
  },
  volumeSlider: {
    width: 20,
    height: 100,
    backgroundColor: '#374151',
    borderRadius: 10,
    overflow: 'hidden',
  },
  volumeFill: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#10b981',
    borderRadius: 10,
  },
  bufferingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  bufferingText: {
    fontSize: 12,
    color: '#10b981',
    marginLeft: 8,
  },
});