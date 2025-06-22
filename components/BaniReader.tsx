import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ActivityIndicator,
  Switch,
  Dimensions,
  ScrollView,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Settings, Volume2, VolumeX, ChevronRight, CircleCheck as CheckCircle } from 'lucide-react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring, 
  runOnJS,
  interpolate,
  Extrapolate,
  withTiming
} from 'react-native-reanimated';
import { gurbaniService, BaniContent, GurbaniVerse, AudioTrack } from '@/services/gurbaniService';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import AudioPlayer from '@/components/AudioPlayer';
import MiniAudioPlayer from '@/components/MiniAudioPlayer';

interface BaniReaderProps {
  baniId: string;
  onBack: () => void;
  onNextBani?: (nextBaniId: string) => void;
}

const { width, height } = Dimensions.get('window');

// Nitnem order for auto-progression
const NITNEM_ORDER = ['1', '2', '3', '4', '5', '6', '8'];

export default function BaniReader({ baniId, onBack, onNextBani }: BaniReaderProps) {
  const [baniContent, setBaniContent] = useState<BaniContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);
  
  // Audio player hook
  const audioPlayer = useAudioPlayer();
  
  // Set default preferences based on bani type
  const getDefaultPreferences = (baniId: string) => {
    if (baniId === '4') { // Chaupai Sahib
      return {
        showTranslation: true,
        showTransliteration: true,
        showPunjabiTranslation: true,
        showMeaning: false
      };
    }
    return {
      showTranslation: true,
      showTransliteration: false,
      showPunjabiTranslation: true,
      showMeaning: true
    };
  };

  const defaults = getDefaultPreferences(baniId);
  const [showTranslation, setShowTranslation] = useState(defaults.showTranslation);
  const [showTransliteration, setShowTransliteration] = useState(defaults.showTransliteration);
  const [showPunjabiTranslation, setShowPunjabiTranslation] = useState(defaults.showPunjabiTranslation);
  const [showMeaning, setShowMeaning] = useState(defaults.showMeaning);
  
  const [fontSize, setFontSize] = useState(18);
  const [showSettings, setShowSettings] = useState(false);
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);

  // Animation values
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);

  useEffect(() => {
    loadBaniContent();
    
    // Reset preferences when bani changes
    const newDefaults = getDefaultPreferences(baniId);
    setShowTranslation(newDefaults.showTranslation);
    setShowTransliteration(newDefaults.showTransliteration);
    setShowPunjabiTranslation(newDefaults.showPunjabiTranslation);
    setShowMeaning(newDefaults.showMeaning);
  }, [baniId]);

  const loadBaniContent = async () => {
    try {
      setLoading(true);
      const content = await gurbaniService.getBaniContent(baniId);
      setBaniContent(content);
    } catch (error) {
      console.error('Error loading bani content:', error);
    } finally {
      setLoading(false);
    }
  };

  const goToNextVerse = () => {
    if (baniContent && currentVerseIndex < baniContent.verses.length - 1) {
      setCurrentVerseIndex(currentVerseIndex + 1);
    } else if (baniContent && currentVerseIndex === baniContent.verses.length - 1) {
      handleBaniCompletion();
    }
  };

  const goToPreviousVerse = () => {
    if (currentVerseIndex > 0) {
      setCurrentVerseIndex(currentVerseIndex - 1);
    }
  };

  const handleBaniCompletion = () => {
    if (NITNEM_ORDER.includes(baniId)) {
      setShowCompletionDialog(true);
    }
  };

  const proceedToNextBani = () => {
    const currentIndex = NITNEM_ORDER.indexOf(baniId);
    if (currentIndex !== -1 && currentIndex < NITNEM_ORDER.length - 1) {
      const nextBaniId = NITNEM_ORDER[currentIndex + 1];
      setShowCompletionDialog(false);
      if (onNextBani) {
        onNextBani(nextBaniId);
      }
    } else {
      setShowCompletionDialog(false);
      Alert.alert(
        'Nitnem Complete! 🙏',
        'Congratulations! You have completed the entire Nitnem. May Waheguru bless you.',
        [{ text: 'Waheguru Ji Ka Khalsa, Waheguru Ji Ki Fateh', onPress: onBack }]
      );
    }
  };

  const handlePlayAudio = async () => {
    await audioPlayer.playBani(baniId);
  };

  const adjustFontSize = (increase: boolean) => {
    setFontSize(prev => {
      const newSize = increase ? prev + 2 : prev - 2;
      return Math.max(14, Math.min(28, newSize));
    });
  };

  // Combined gesture handling for both swipe and tap
  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      const sensitivity = 0.8;
      translateX.value = event.translationX * sensitivity;
      
      const absTranslation = Math.abs(event.translationX);
      opacity.value = interpolate(
        absTranslation,
        [0, 50],
        [1, 0.85],
        Extrapolate.CLAMP
      );
      
      scale.value = interpolate(
        absTranslation,
        [0, 50],
        [1, 0.95],
        Extrapolate.CLAMP
      );
    })
    .onEnd((event) => {
      const threshold = 40;
      const velocity = Math.abs(event.velocityX);
      
      const shouldTrigger = Math.abs(event.translationX) > threshold || velocity > 800;
      
      if (shouldTrigger && event.translationX > 0) {
        translateX.value = withTiming(width * 0.3, { duration: 200 }, () => {
          runOnJS(goToPreviousVerse)();
          translateX.value = -width * 0.3;
          translateX.value = withTiming(0, { duration: 200 });
          opacity.value = withTiming(1, { duration: 200 });
          scale.value = withTiming(1, { duration: 200 });
        });
      } else if (shouldTrigger && event.translationX < 0) {
        translateX.value = withTiming(-width * 0.3, { duration: 200 }, () => {
          runOnJS(goToNextVerse)();
          translateX.value = width * 0.3;
          translateX.value = withTiming(0, { duration: 200 });
          opacity.value = withTiming(1, { duration: 200 });
          scale.value = withTiming(1, { duration: 200 });
        });
      } else {
        translateX.value = withSpring(0, { damping: 20, stiffness: 300 });
        opacity.value = withSpring(1, { damping: 20, stiffness: 300 });
        scale.value = withSpring(1, { damping: 20, stiffness: 300 });
      }
    });

  // Tap gesture for left and right sides
  const tapGesture = Gesture.Tap()
    .onEnd((event) => {
      const tapX = event.x;
      const screenWidth = width;
      
      // Left side tap (first 40% of screen) - go to previous verse
      if (tapX < screenWidth * 0.4) {
        runOnJS(goToPreviousVerse)();
      }
      // Right side tap (last 40% of screen) - go to next verse
      else if (tapX > screenWidth * 0.6) {
        runOnJS(goToNextVerse)();
      }
      // Middle area (20%) - no action to avoid accidental navigation
    });

  // Combine gestures
  const combinedGesture = Gesture.Race(panGesture, tapGesture);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { scale: scale.value }
      ],
      opacity: opacity.value,
    };
  });

  const getNextBaniName = () => {
    const currentIndex = NITNEM_ORDER.indexOf(baniId);
    if (currentIndex !== -1 && currentIndex < NITNEM_ORDER.length - 1) {
      const nextBaniId = NITNEM_ORDER[currentIndex + 1];
      const baniNames: { [key: string]: string } = {
        '1': 'Japji Sahib',
        '2': 'Jaap Sahib',
        '3': 'Tav Prasad Savaiye',
        '4': 'Chaupai Sahib',
        '5': 'Anand Sahib',
        '6': 'Rehras Sahib',
        '8': 'Kirtan Sohila'
      };
      return baniNames[nextBaniId] || 'Next Bani';
    }
    return null;
  };

  const handleTrackComplete = () => {
    // Auto-progress to next bani when audio completes
    if (NITNEM_ORDER.includes(baniId)) {
      proceedToNextBani();
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#10b981" />
          <Text style={styles.loadingText}>Loading Bani...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!baniContent) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Unable to load Bani content</Text>
          <TouchableOpacity style={styles.retryButton} onPress={loadBaniContent}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const currentVerse = baniContent.verses[currentVerseIndex];

  return (
    <View style={styles.container}>
      {/* Fixed Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={onBack}>
          <ArrowLeft size={24} color="#ffffff" />
        </TouchableOpacity>
        
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>{baniContent.name}</Text>
          <Text style={styles.progressText}>
            {currentVerseIndex + 1} of {baniContent.verses.length}
          </Text>
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity 
            style={styles.headerButton} 
            onPress={handlePlayAudio}
          >
            {audioPlayer.playbackStatus.isPlaying && audioPlayer.currentTrack?.baniId === baniId ? (
              <Volume2 size={20} color="#10b981" />
            ) : (
              <VolumeX size={20} color="#ffffff" />
            )}
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.headerButton} 
            onPress={() => setShowSettings(!showSettings)}
          >
            <Settings size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Settings Panel */}
      {showSettings && (
        <View style={styles.settingsPanel}>
          <View style={styles.settingsRow}>
            <Text style={styles.settingsLabel}>Translation</Text>
            <Switch
              value={showTranslation}
              onValueChange={setShowTranslation}
              trackColor={{ false: '#374151', true: '#10b981' }}
              thumbColor="#ffffff"
            />
          </View>
          
          <View style={styles.settingsRow}>
            <Text style={styles.settingsLabel}>Transliteration</Text>
            <Switch
              value={showTransliteration}
              onValueChange={setShowTransliteration}
              trackColor={{ false: '#374151', true: '#10b981' }}
              thumbColor="#ffffff"
            />
          </View>
          
          <View style={styles.settingsRow}>
            <Text style={styles.settingsLabel}>Punjabi</Text>
            <Switch
              value={showPunjabiTranslation}
              onValueChange={setShowPunjabiTranslation}
              trackColor={{ false: '#374151', true: '#10b981' }}
              thumbColor="#ffffff"
            />
          </View>
          
          <View style={styles.settingsRow}>
            <Text style={styles.settingsLabel}>Meaning</Text>
            <Switch
              value={showMeaning}
              onValueChange={setShowMeaning}
              trackColor={{ false: '#374151', true: '#10b981' }}
              thumbColor="#ffffff"
            />
          </View>
          
          <View style={styles.fontControls}>
            <TouchableOpacity 
              style={styles.fontButton} 
              onPress={() => adjustFontSize(false)}
            >
              <Text style={styles.fontButtonText}>A-</Text>
            </TouchableOpacity>
            <Text style={styles.fontSizeText}>{fontSize}px</Text>
            <TouchableOpacity 
              style={styles.fontButton} 
              onPress={() => adjustFontSize(true)}
            >
              <Text style={styles.fontButtonText}>A+</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Completion Dialog */}
      {showCompletionDialog && (
        <View style={styles.completionOverlay}>
          <View style={styles.completionDialog}>
            <CheckCircle size={48} color="#10b981" />
            <Text style={styles.completionTitle}>Bani Complete! 🙏</Text>
            <Text style={styles.completionMessage}>
              You have completed {baniContent.name}.
            </Text>
            
            {getNextBaniName() && (
              <>
                <Text style={styles.nextBaniText}>
                  Continue with {getNextBaniName()}?
                </Text>
                <View style={styles.completionButtons}>
                  <TouchableOpacity 
                    style={styles.continueButton} 
                    onPress={proceedToNextBani}
                  >
                    <Text style={styles.continueButtonText}>Continue</Text>
                    <ChevronRight size={16} color="#ffffff" />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.finishButton} 
                    onPress={() => {
                      setShowCompletionDialog(false);
                      onBack();
                    }}
                  >
                    <Text style={styles.finishButtonText}>Finish</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
            
            {!getNextBaniName() && (
              <TouchableOpacity 
                style={styles.finishButton} 
                onPress={() => {
                  setShowCompletionDialog(false);
                  onBack();
                }}
              >
                <Text style={styles.finishButtonText}>Finish</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}

      {/* Main Content with Gesture Detection and Scrolling */}
      <GestureDetector gesture={combinedGesture}>
        <Animated.View style={[styles.content, animatedStyle]}>
          <ScrollView 
            style={styles.scrollContainer}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={true}
            indicatorStyle="white"
          >
            <View style={styles.verseContainer}>
              {/* Line Number and Type */}
              {currentVerse.lineNumber && (
                <View style={styles.lineNumberContainer}>
                  <Text style={styles.lineNumber}>Line {currentVerse.lineNumber}</Text>
                  {currentVerse.verseType && (
                    <Text style={styles.verseType}>{currentVerse.verseType}</Text>
                  )}
                </View>
              )}

              {/* Gurmukhi Text */}
              <Text style={[styles.gurmukhiText, { fontSize: fontSize + 6 }]}>
                {currentVerse.gurmukhi}
              </Text>

              {/* Transliteration */}
              {showTransliteration && currentVerse.transliteration && (
                <Text style={[styles.transliterationText, { fontSize: fontSize - 2 }]}>
                  {currentVerse.transliteration}
                </Text>
              )}

              {/* English Translation */}
              {showTranslation && currentVerse.translation && (
                <View style={styles.translationContainer}>
                  <Text style={styles.translationLabel}>English Translation:</Text>
                  <Text style={[styles.translationText, { fontSize: fontSize }]}>
                    {currentVerse.translation}
                  </Text>
                </View>
              )}

              {/* Punjabi Translation */}
              {showPunjabiTranslation && currentVerse.punjabiTranslation && (
                <View style={styles.punjabiTranslationContainer}>
                  <Text style={styles.punjabiTranslationLabel}>Punjabi Translation:</Text>
                  <Text style={[styles.punjabiTranslationText, { fontSize: fontSize }]}>
                    {currentVerse.punjabiTranslation}
                  </Text>
                </View>
              )}

              {/* Meaning/Explanation */}
              {showMeaning && currentVerse.meaning && (
                <View style={styles.meaningContainer}>
                  <Text style={styles.meaningLabel}>Meaning & Explanation:</Text>
                  <Text style={[styles.meaningText, { fontSize: fontSize - 1 }]}>
                    {currentVerse.meaning}
                  </Text>
                </View>
              )}

              {/* Verse Info */}
              <View style={styles.verseInfo}>
                {currentVerse.pageNumber && (
                  <Text style={styles.verseInfoText}>
                    Ang {currentVerse.pageNumber}
                  </Text>
                )}
                {currentVerse.author && (
                  <Text style={styles.verseInfoText}>
                    {currentVerse.author}
                  </Text>
                )}
                {currentVerse.raag && (
                  <Text style={styles.verseInfoText}>
                    Raag {currentVerse.raag}
                  </Text>
                )}
              </View>
            </View>
          </ScrollView>

          {/* Tap Areas Indicator */}
          <View style={styles.tapIndicator}>
            <View style={styles.tapHint}>
              <Text style={styles.tapHintText}>
                {currentVerseIndex === 0 ? 'Tap right for next' : 
                 currentVerseIndex === baniContent.verses.length - 1 ? 'Tap left for previous' :
                 'Tap left: previous • Tap right: next'}
              </Text>
            </View>
          </View>
        </Animated.View>
      </GestureDetector>

      {/* Progress Indicator */}
      <View style={styles.progressIndicator}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${((currentVerseIndex + 1) / baniContent.verses.length) * 100}%` }
            ]} 
          />
        </View>
      </View>

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
            isVisible={audioPlayer.isVisible && !audioPlayer.isExpanded && !audioPlayer.isExpanded}
            onExpand={audioPlayer.expandPlayer}
            onClose={audioPlayer.stopAudio}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#ffffff',
    fontSize: 16,
    marginTop: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  errorText: {
    color: '#ffffff',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#10b981',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    paddingTop: 50,
    backgroundColor: 'rgba(10, 10, 10, 0.95)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    height: 90,
  },
  headerButton: {
    padding: 8,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  progressText: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 2,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsPanel: {
    position: 'absolute',
    top: 100,
    right: 20,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    zIndex: 1001,
    minWidth: 200,
  },
  settingsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  settingsLabel: {
    color: '#ffffff',
    fontSize: 14,
  },
  fontControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#374151',
  },
  fontButton: {
    backgroundColor: '#374151',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  fontButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  fontSizeText: {
    color: '#9ca3af',
    fontSize: 12,
  },
  content: {
    flex: 1,
    paddingTop: 90,
    paddingBottom: 60,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    minHeight: height - 150,
  },
  verseContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lineNumberContainer: {
    marginBottom: 16,
    alignItems: 'center',
  },
  lineNumber: {
    color: '#6b7280',
    fontSize: 12,
    fontWeight: '500',
  },
  verseType: {
    color: '#10b981',
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginTop: 4,
  },
  gurmukhiText: {
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 36,
    marginBottom: 20,
    fontWeight: '500',
    paddingHorizontal: 20,
  },
  transliterationText: {
    color: '#10b981',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 16,
    fontStyle: 'italic',
    paddingHorizontal: 20,
  },
  translationContainer: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    width: '100%',
  },
  translationLabel: {
    color: '#10b981',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  translationText: {
    color: '#d1d5db',
    lineHeight: 24,
  },
  punjabiTranslationContainer: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    width: '100%',
    borderLeftWidth: 4,
    borderLeftColor: '#f59e0b',
  },
  punjabiTranslationLabel: {
    color: '#f59e0b',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  punjabiTranslationText: {
    color: '#f59e0b',
    lineHeight: 24,
    fontWeight: '500',
  },
  meaningContainer: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    width: '100%',
    borderLeftWidth: 4,
    borderLeftColor: '#8b5cf6',
  },
  meaningLabel: {
    color: '#8b5cf6',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  meaningText: {
    color: '#d1d5db',
    lineHeight: 22,
  },
  verseInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 16,
  },
  verseInfoText: {
    color: '#9ca3af',
    fontSize: 12,
    marginHorizontal: 8,
    marginVertical: 2,
  },
  completionOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2000,
  },
  completionDialog: {
    backgroundColor: '#1a1a1a',
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    marginHorizontal: 20,
    maxWidth: 400,
  },
  completionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  completionMessage: {
    fontSize: 16,
    color: '#d1d5db',
    textAlign: 'center',
    marginBottom: 16,
  },
  nextBaniText: {
    fontSize: 16,
    color: '#10b981',
    textAlign: 'center',
    marginBottom: 24,
    fontWeight: '500',
  },
  completionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  continueButton: {
    backgroundColor: '#10b981',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  continueButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
  finishButton: {
    backgroundColor: '#374151',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  finishButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
  tapIndicator: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  tapHint: {
    backgroundColor: 'rgba(26, 26, 26, 0.8)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  tapHintText: {
    color: '#9ca3af',
    fontSize: 12,
    textAlign: 'center',
  },
  progressIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: '#1a1a1a',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#374151',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10b981',
  },
});