// Custom hook for managing audio player state
import { useState, useEffect, useCallback } from 'react';
import { audioService, AudioTrack, PlaybackStatus, getAudioTrackForBani } from '@/services/audioService';

export interface AudioPlayerState {
  isVisible: boolean;
  isExpanded: boolean;
  currentTrack: AudioTrack | null;
  playbackStatus: PlaybackStatus;
  isLoading: boolean;
}

export function useAudioPlayer() {
  const [state, setState] = useState<AudioPlayerState>({
    isVisible: false,
    isExpanded: false,
    currentTrack: null,
    playbackStatus: {
      isLoaded: false,
      isPlaying: false,
      position: 0,
      duration: 0,
      isBuffering: false,
      volume: 1.0,
      rate: 1.0,
    },
    isLoading: false,
  });

  useEffect(() => {
    // Set up audio service callback
    audioService.setStatusUpdateCallback(handleStatusUpdate);

    return () => {
      // Cleanup is handled by audio service
    };
  }, []);

  const handleStatusUpdate = useCallback((status: PlaybackStatus) => {
    setState(prev => ({
      ...prev,
      playbackStatus: status,
    }));
  }, []);

  const playBani = useCallback(async (baniId: string) => {
    const track = getAudioTrackForBani(baniId);
    if (!track) {
      console.warn(`No audio track found for bani ID: ${baniId}`);
      return;
    }

    try {
      setState(prev => ({
        ...prev,
        isLoading: true,
        currentTrack: track,
        isVisible: true,
        isExpanded: false,
      }));

      await audioService.loadAndPlay(track);
    } catch (error) {
      console.error('Error playing bani:', error);
      setState(prev => ({
        ...prev,
        isLoading: false,
        isVisible: false,
      }));
    } finally {
      setState(prev => ({
        ...prev,
        isLoading: false,
      }));
    }
  }, []);

  const stopAudio = useCallback(async () => {
    await audioService.stop();
    setState(prev => ({
      ...prev,
      isVisible: false,
      isExpanded: false,
      currentTrack: null,
    }));
  }, []);

  const expandPlayer = useCallback(() => {
    setState(prev => ({
      ...prev,
      isExpanded: true,
    }));
  }, []);

  const collapsePlayer = useCallback(() => {
    setState(prev => ({
      ...prev,
      isExpanded: false,
    }));
  }, []);

  const togglePlayPause = useCallback(async () => {
    try {
      if (state.playbackStatus.isPlaying) {
        await audioService.pause();
      } else {
        await audioService.play();
      }
    } catch (error) {
      console.error('Error toggling play/pause:', error);
    }
  }, [state.playbackStatus.isPlaying]);

  return {
    ...state,
    playBani,
    stopAudio,
    expandPlayer,
    collapsePlayer,
    togglePlayPause,
  };
}