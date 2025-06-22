// Mini Audio Player for bottom of screen
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Play, Pause, X } from 'lucide-react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { audioService, AudioTrack, PlaybackStatus, formatTime } from '@/services/audioService';

interface MiniAudioPlayerProps {
  isVisible: boolean;
  onExpand: () => void;
  onClose: () => void;
}

const { width: screenWidth } = Dimensions.get('window');

export default function MiniAudioPlayer({ isVisible, onExpand, onClose }: MiniAudioPlayerProps) {
  const [playbackStatus, setPlaybackStatus] = useState<PlaybackStatus>({
    isLoaded: false,
    isPlaying: false,
    position: 0,
    duration: 0,
    isBuffering: false,
    volume: 1.0,
    rate: 1.0,
  });
  const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>(null);

  // Animated values
  const translateY = useSharedValue(100);
  const progressWidth = useSharedValue(0);

  useEffect(() => {
    // Set up audio service callback
    audioService.setStatusUpdateCallback(handleStatusUpdate);

    // Get current track
    const track = audioService.getCurrentTrack();
    setCurrentTrack(track);

    return () => {
      // Cleanup handled by main audio service
    };
  }, []);

  useEffect(() => {
    // Animate mini player visibility
    translateY.value = withSpring(isVisible ? 0 : 100, {
      damping: 20,
      stiffness: 300
    });
  }, [isVisible]);

  useEffect(() => {
    // Update progress bar
    if (playbackStatus.duration > 0) {
      const progress = (playbackStatus.position / playbackStatus.duration) * 100;
      progressWidth.value = withTiming(progress, { duration: 100 });
    }
  }, [playbackStatus.position, playbackStatus.duration]);

  const handleStatusUpdate = (status: PlaybackStatus) => {
    setPlaybackStatus(status);
    
    // Update current track if needed
    const track = audioService.getCurrentTrack();
    if (track && track.id !== currentTrack?.id) {
      setCurrentTrack(track);
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

  const handleClose = async () => {
    await audioService.stop();
    onClose();
  };

  // Animated styles
  const miniPlayerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const progressStyle = useAnimatedStyle(() => {
    return {
      width: `${progressWidth.value}%`,
    };
  });

  if (!isVisible || !currentTrack) return null;

  return (
    <Animated.View style={[styles.container, miniPlayerStyle]}>
      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <Animated.View style={[styles.progressBar, progressStyle]} />
      </View>

      {/* Mini Player Content */}
      <TouchableOpacity style={styles.content} onPress={onExpand} activeOpacity={0.8}>
        <View style={styles.trackInfo}>
          <Text style={styles.trackTitle} numberOfLines={1}>
            {currentTrack.title}
          </Text>
          <Text style={styles.trackTime}>
            {formatTime(playbackStatus.position)} / {formatTime(playbackStatus.duration)}
          </Text>
        </View>

        <View style={styles.controls}>
          <TouchableOpacity style={styles.playButton} onPress={togglePlayPause}>
            {playbackStatus.isPlaying ? (
              <Pause size={20} color="#ffffff" fill="#ffffff" />
            ) : (
              <Play size={20} color="#ffffff" fill="#ffffff" />
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <X size={18} color="#9ca3af" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 80, // Above tab bar
    left: 0,
    right: 0,
    backgroundColor: '#1a1a1a',
    borderTopWidth: 1,
    borderTopColor: '#374151',
    zIndex: 999,
  },
  progressContainer: {
    height: 2,
    backgroundColor: '#374151',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#10b981',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  trackInfo: {
    flex: 1,
    marginRight: 12,
  },
  trackTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 2,
  },
  trackTime: {
    fontSize: 12,
    color: '#9ca3af',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#10b981',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#374151',
    justifyContent: 'center',
    alignItems: 'center',
  },
});