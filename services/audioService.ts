// Complete Audio Service for playing Gurbani with expo-av
import { Audio } from 'expo-av';
import { Platform } from 'react-native';

export interface AudioTrack {
  id: string;
  title: string;
  artist?: string;
  url: string;
  duration?: number;
  baniId?: string;
}

export interface PlaybackStatus {
  isLoaded: boolean;
  isPlaying: boolean;
  position: number;
  duration: number;
  isBuffering: boolean;
  volume: number;
  rate: number;
}

class AudioService {
  private sound: Audio.Sound | null = null;
  private currentTrack: AudioTrack | null = null;
  private statusUpdateCallback: ((status: PlaybackStatus) => void) | null = null;
  private isInitialized = false;

  // Initialize audio service
  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      // Configure audio session with platform-specific settings
      if (Platform.OS === 'ios') {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          staysActiveInBackground: true,
          interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
          playsInSilentModeIOS: true,
        });
      } else if (Platform.OS === 'android') {
        await Audio.setAudioModeAsync({
          staysActiveInBackground: true,
          shouldDuckAndroid: true,
          interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
          playThroughEarpieceAndroid: false,
        });
      } else {
        // Web and other platforms
        await Audio.setAudioModeAsync({
          staysActiveInBackground: true,
        });
      }

      this.isInitialized = true;
    } catch (error) {
      console.error('Error initializing audio service:', error);
    }
  }

  // Load and play a track
  async loadAndPlay(track: AudioTrack): Promise<void> {
    try {
      await this.initialize();
      
      // Stop current track if playing
      if (this.sound) {
        await this.stop();
      }

      // Create new sound object
      const { sound } = await Audio.Sound.createAsync(
        { uri: track.url },
        { 
          shouldPlay: false,
          isLooping: false,
          volume: 1.0,
          rate: 1.0,
          progressUpdateIntervalMillis: 1000,
        },
        this.onPlaybackStatusUpdate.bind(this)
      );

      this.sound = sound;
      this.currentTrack = track;

      // Start playing
      await this.play();
    } catch (error) {
      console.error('Error loading track:', error);
      throw new Error(`Failed to load audio: ${error}`);
    }
  }

  // Play current track
  async play(): Promise<void> {
    if (!this.sound) return;

    try {
      await this.sound.playAsync();
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  }

  // Pause current track
  async pause(): Promise<void> {
    if (!this.sound) return;

    try {
      await this.sound.pauseAsync();
    } catch (error) {
      console.error('Error pausing audio:', error);
    }
  }

  // Stop current track
  async stop(): Promise<void> {
    if (!this.sound) return;

    try {
      // Check if sound is loaded before attempting to stop
      const status = await this.sound.getStatusAsync();
      if (status.isLoaded) {
        await this.sound.stopAsync();
        await this.sound.unloadAsync();
      }
      this.sound = null;
      this.currentTrack = null;
    } catch (error) {
      console.error('Error stopping audio:', error);
    }
  }

  // Seek to position (in milliseconds)
  async seekTo(position: number): Promise<void> {
    if (!this.sound) return;

    try {
      const status = await this.sound.getStatusAsync();
      if (status.isLoaded) {
        await this.sound.setPositionAsync(position);
      }
    } catch (error) {
      console.error('Error seeking audio:', error);
    }
  }

  // Set volume (0.0 to 1.0)
  async setVolume(volume: number): Promise<void> {
    if (!this.sound) return;

    try {
      const status = await this.sound.getStatusAsync();
      if (status.isLoaded) {
        await this.sound.setVolumeAsync(Math.max(0, Math.min(1, volume)));
      }
    } catch (error) {
      console.error('Error setting volume:', error);
    }
  }

  // Set playback rate (0.5 to 2.0)
  async setRate(rate: number): Promise<void> {
    if (!this.sound) return;

    try {
      const status = await this.sound.getStatusAsync();
      if (status.isLoaded) {
        await this.sound.setRateAsync(Math.max(0.5, Math.min(2.0, rate)), true);
      }
    } catch (error) {
      console.error('Error setting rate:', error);
    }
  }

  // Get current playback status
  async getStatus(): Promise<PlaybackStatus | null> {
    if (!this.sound) return null;

    try {
      const status = await this.sound.getStatusAsync();
      return this.parseStatus(status);
    } catch (error) {
      console.error('Error getting status:', error);
      return null;
    }
  }

  // Set status update callback
  setStatusUpdateCallback(callback: (status: PlaybackStatus) => void): void {
    this.statusUpdateCallback = callback;
  }

  // Get current track
  getCurrentTrack(): AudioTrack | null {
    return this.currentTrack;
  }

  // Check if audio is playing
  async isPlaying(): Promise<boolean> {
    const status = await this.getStatus();
    return status?.isPlaying || false;
  }

  // Private method to handle playback status updates
  private onPlaybackStatusUpdate(status: any): void {
    if (this.statusUpdateCallback) {
      const parsedStatus = this.parseStatus(status);
      this.statusUpdateCallback(parsedStatus);
    }
  }

  // Private method to parse status from expo-av
  private parseStatus(status: any): PlaybackStatus {
    return {
      isLoaded: status.isLoaded || false,
      isPlaying: status.isPlaying || false,
      position: status.positionMillis || 0,
      duration: status.durationMillis || 0,
      isBuffering: status.isBuffering || false,
      volume: status.volume || 1.0,
      rate: status.rate || 1.0,
    };
  }

  // Cleanup method
  async cleanup(): Promise<void> {
    await this.stop();
    this.statusUpdateCallback = null;
    this.isInitialized = false;
  }
}

// Export singleton instance
export const audioService = new AudioService();

// Audio tracks for each Nitnem bani - Using the streamable link for Japji Sahib
export const NITNEM_AUDIO_TRACKS: { [baniId: string]: AudioTrack } = {
  '1': {
    id: 'japji_sahib',
    title: 'Japji Sahib',
    artist: 'Bhai Harjinder Singh',
    url: 'https://cdn.jsdelivr.net/gh/gurantx/streamsikh@main/Japji-Sahib.mp3',
    duration: 1800000, // 30 minutes in milliseconds
    baniId: '1'
  },
  '2': {
    id: 'jaap_sahib',
    title: 'Jaap Sahib',
    artist: 'Bhai Harjinder Singh',
    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav', // Placeholder for other banis
    duration: 2400000, // 40 minutes
    baniId: '2'
  },
  '3': {
    id: 'tav_prasad_savaiye',
    title: 'Tav Prasad Savaiye',
    artist: 'Bhai Harjinder Singh',
    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav', // Placeholder for other banis
    duration: 480000, // 8 minutes
    baniId: '3'
  },
  '4': {
    id: 'chaupai_sahib',
    title: 'Chaupai Sahib',
    artist: 'Bhai Harjinder Singh',
    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav', // Placeholder for other banis
    duration: 600000, // 10 minutes
    baniId: '4'
  },
  '5': {
    id: 'anand_sahib',
    title: 'Anand Sahib',
    artist: 'Bhai Harjinder Singh',
    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav', // Placeholder for other banis
    duration: 1200000, // 20 minutes
    baniId: '5'
  },
  '6': {
    id: 'rehras_sahib',
    title: 'Rehras Sahib',
    artist: 'Bhai Harjinder Singh',
    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav', // Placeholder for other banis
    duration: 900000, // 15 minutes
    baniId: '6'
  },
  '8': {
    id: 'kirtan_sohila',
    title: 'Kirtan Sohila',
    artist: 'Bhai Harjinder Singh',
    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav', // Placeholder for other banis
    duration: 300000, // 5 minutes
    baniId: '8'
  },
  '10': {
    id: 'sukhmani_sahib',
    title: 'Sukhmani Sahib',
    artist: 'Bhai Harjinder Singh',
    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav', // Placeholder for other banis
    duration: 3600000, // 60 minutes
    baniId: '10'
  }
};

// Helper function to get audio track for bani
export function getAudioTrackForBani(baniId: string): AudioTrack | null {
  return NITNEM_AUDIO_TRACKS[baniId] || null;
}

// Helper function to format time
export function formatTime(milliseconds: number): string {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}