import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ActivityIndicator,
  TextInput,
  Alert,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  ArrowLeft, 
  ChevronLeft,
  ChevronRight,
  Search,
  BookOpen,
  Shuffle,
  Settings,
  Volume2,
  VolumeX
} from 'lucide-react-native';
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
import { guruGranthSahibService, AngContent } from '@/services/guruGranthSahibService';

interface AngReaderProps {
  initialAng: number;
  onBack: () => void;
}

const { width } = Dimensions.get('window');

export default function AngReader({ initialAng, onBack }: AngReaderProps) {
  const [currentAng, setCurrentAng] = useState(initialAng);
  const [angContent, setAngContent] = useState<AngContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchAng, setSearchAng] = useState(initialAng.toString());
  const [showSearch, setShowSearch] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [showSettings, setShowSettings] = useState(false);

  // Animation values
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);

  useEffect(() => {
    loadAngContent(currentAng);
  }, [currentAng]);

  const loadAngContent = async (angNumber: number) => {
    try {
      setLoading(true);
      const content = await guruGranthSahibService.getAng(angNumber);
      setAngContent(content);
      setSearchAng(angNumber.toString());
    } catch (error) {
      console.error('Error loading Ang content:', error);
      Alert.alert('Error', `Unable to load Ang ${angNumber}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  const goToAng = (angNumber: number) => {
    if (angNumber >= 1 && angNumber <= 1430) {
      setCurrentAng(angNumber);
    } else {
      Alert.alert('Invalid Ang', 'Please enter an Ang number between 1 and 1430.');
    }
  };

  const goToPreviousAng = () => {
    if (currentAng > 1) {
      goToAng(currentAng - 1);
    }
  };

  const goToNextAng = () => {
    if (currentAng < 1430) {
      goToAng(currentAng + 1);
    }
  };

  const goToRandomAng = async () => {
    try {
      setLoading(true);
      const randomAng = await guruGranthSahibService.getRandomAng();
      if (randomAng) {
        setCurrentAng(randomAng.angNumber);
      }
    } catch (error) {
      console.error('Error loading random Ang:', error);
    }
  };

  const handleSearchSubmit = () => {
    const angNumber = parseInt(searchAng);
    if (!isNaN(angNumber) && angNumber >= 1 && angNumber <= 1430) {
      goToAng(angNumber);
      setShowSearch(false);
    } else {
      Alert.alert('Invalid Input', 'Please enter a valid Ang number (1-1430).');
    }
  };

  const adjustFontSize = (increase: boolean) => {
    setFontSize(prev => {
      const newSize = increase ? prev + 2 : prev - 2;
      return Math.max(12, Math.min(24, newSize));
    });
  };

  // Horizontal gesture handling
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
      
      if (shouldTrigger && event.translationX > 0 && currentAng > 1) {
        // Swipe right - previous ang
        translateX.value = withTiming(width * 0.3, { duration: 200 }, () => {
          runOnJS(goToPreviousAng)();
          translateX.value = -width * 0.3;
          translateX.value = withTiming(0, { duration: 200 });
          opacity.value = withTiming(1, { duration: 200 });
          scale.value = withTiming(1, { duration: 200 });
        });
      } else if (shouldTrigger && event.translationX < 0 && currentAng < 1430) {
        // Swipe left - next ang
        translateX.value = withTiming(-width * 0.3, { duration: 200 }, () => {
          runOnJS(goToNextAng)();
          translateX.value = width * 0.3;
          translateX.value = withTiming(0, { duration: 200 });
          opacity.value = withTiming(1, { duration: 200 });
          scale.value = withTiming(1, { duration: 200 });
        });
      } else {
        // Return to original position
        translateX.value = withSpring(0, { damping: 20, stiffness: 300 });
        opacity.value = withSpring(1, { damping: 20, stiffness: 300 });
        scale.value = withSpring(1, { damping: 20, stiffness: 300 });
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { scale: scale.value }
      ],
      opacity: opacity.value,
    };
  });

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#10b981" />
          <Text style={styles.loadingText}>Loading Ang {currentAng}...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!angContent) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Unable to load Ang {currentAng}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={() => loadAngContent(currentAng)}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={onBack}>
          <ArrowLeft size={24} color="#ffffff" />
        </TouchableOpacity>
        
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Ang {currentAng}</Text>
          <Text style={styles.headerSubtitle}>
            {angContent.raag && `${angContent.raag} • `}
            {angContent.totalLines} lines
          </Text>
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity 
            style={styles.headerButton} 
            onPress={goToRandomAng}
          >
            <Shuffle size={20} color="#ffffff" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.headerButton} 
            onPress={() => setShowSearch(!showSearch)}
          >
            <Search size={20} color="#ffffff" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.headerButton} 
            onPress={() => setShowSettings(!showSettings)}
          >
            <Settings size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Panel */}
      {showSearch && (
        <View style={styles.searchPanel}>
          <Text style={styles.searchLabel}>Go to Ang (1-1430):</Text>
          <View style={styles.searchInputContainer}>
            <TextInput
              style={styles.searchInput}
              value={searchAng}
              onChangeText={setSearchAng}
              onSubmitEditing={handleSearchSubmit}
              keyboardType="numeric"
              placeholder="Enter Ang number"
              placeholderTextColor="#9ca3af"
              autoFocus
            />
            <TouchableOpacity style={styles.searchButton} onPress={handleSearchSubmit}>
              <Text style={styles.searchButtonText}>Go</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Settings Panel */}
      {showSettings && (
        <View style={styles.settingsPanel}>
          <Text style={styles.settingsTitle}>Reading Settings</Text>
          
          <View style={styles.fontControls}>
            <Text style={styles.settingsLabel}>Font Size:</Text>
            <View style={styles.fontButtonsContainer}>
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
        </View>
      )}

      {/* Navigation Controls */}
      <View style={styles.navigationContainer}>
        <TouchableOpacity 
          style={[styles.navButton, currentAng === 1 && styles.navButtonDisabled]}
          onPress={goToPreviousAng}
          disabled={currentAng === 1}
        >
          <ChevronLeft size={20} color={currentAng === 1 ? "#6b7280" : "#ffffff"} />
          <Text style={[styles.navButtonText, currentAng === 1 && styles.navButtonTextDisabled]}>
            Previous
          </Text>
        </TouchableOpacity>

        <View style={styles.angIndicator}>
          <Text style={styles.angIndicatorText}>Ang {currentAng} of 1430</Text>
          {angContent.author && (
            <Text style={styles.angAuthorText}>{angContent.author}</Text>
          )}
        </View>

        <TouchableOpacity 
          style={[styles.navButton, currentAng === 1430 && styles.navButtonDisabled]}
          onPress={goToNextAng}
          disabled={currentAng === 1430}
        >
          <Text style={[styles.navButtonText, currentAng === 1430 && styles.navButtonTextDisabled]}>
            Next
          </Text>
          <ChevronRight size={20} color={currentAng === 1430 ? "#6b7280" : "#ffffff"} />
        </TouchableOpacity>
      </View>

      {/* Main Content with Gesture Detection */}
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.content, animatedStyle]}>
          <View style={styles.versesContainer}>
            {angContent.verses.map((verse, index) => (
              <View key={verse.id} style={styles.verseContainer}>
                {/* Line Number */}
                <View style={styles.lineNumberContainer}>
                  <Text style={styles.lineNumber}>{verse.lineNumber}</Text>
                </View>

                {/* Verse Content */}
                <View style={styles.verseContent}>
                  {/* Gurmukhi Text */}
                  <Text style={[
                    styles.gurmukhiText, 
                    { fontSize: fontSize + 2 },
                    verse.verseType === 'header' && styles.headerText,
                    verse.verseType === 'title' && styles.titleText
                  ]}>
                    {verse.gurmukhi}
                  </Text>

                  {/* English Translation */}
                  {verse.translation && (
                    <Text style={[styles.translationText, { fontSize: fontSize - 2 }]}>
                      {verse.translation}
                    </Text>
                  )}

                  {/* Verse Info */}
                  <View style={styles.verseInfo}>
                    {verse.author && verse.author !== angContent.author && (
                      <Text style={styles.verseInfoText}>{verse.author}</Text>
                    )}
                    {verse.raag && verse.raag !== angContent.raag && (
                      <Text style={styles.verseInfoText}>Raag {verse.raag}</Text>
                    )}
                  </View>
                </View>
              </View>
            ))}
          </View>

          {/* Swipe Indicator */}
          <View style={styles.swipeIndicator}>
            <View style={styles.swipeHint}>
              <Text style={styles.swipeHintText}>
                {currentAng === 1 ? '← Swipe left for next Ang' : 
                 currentAng === 1430 ? '→ Swipe right for previous Ang' :
                 '← Next Ang  → Previous Ang'}
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
              { width: `${(currentAng / 1430) * 100}%` }
            ]} 
          />
        </View>
      </View>
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
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 2,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchPanel: {
    position: 'absolute',
    top: 100,
    left: 20,
    right: 20,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    zIndex: 1001,
  },
  searchLabel: {
    color: '#ffffff',
    fontSize: 14,
    marginBottom: 12,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#374151',
    color: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    fontSize: 16,
    marginRight: 12,
  },
  searchButton: {
    backgroundColor: '#10b981',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  searchButtonText: {
    color: '#ffffff',
    fontWeight: '600',
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
  settingsTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  settingsLabel: {
    color: '#d1d5db',
    fontSize: 14,
    marginBottom: 8,
  },
  fontControls: {
    marginBottom: 12,
  },
  fontButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  navigationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginTop: 90,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#374151',
    borderRadius: 8,
  },
  navButtonDisabled: {
    backgroundColor: '#1f2937',
  },
  navButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
    marginHorizontal: 4,
  },
  navButtonTextDisabled: {
    color: '#6b7280',
  },
  angIndicator: {
    alignItems: 'center',
  },
  angIndicatorText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  angAuthorText: {
    color: '#10b981',
    fontSize: 12,
    marginTop: 2,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 60,
  },
  versesContainer: {
    paddingVertical: 20,
  },
  verseContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  lineNumberContainer: {
    width: 40,
    alignItems: 'center',
    paddingTop: 4,
  },
  lineNumber: {
    color: '#6b7280',
    fontSize: 12,
    fontWeight: '500',
  },
  verseContent: {
    flex: 1,
    marginLeft: 12,
  },
  gurmukhiText: {
    color: '#ffffff',
    lineHeight: 28,
    marginBottom: 8,
    fontWeight: '500',
  },
  headerText: {
    color: '#10b981',
    fontWeight: '600',
  },
  titleText: {
    color: '#f59e0b',
    fontWeight: '600',
  },
  translationText: {
    color: '#d1d5db',
    lineHeight: 22,
    marginBottom: 8,
  },
  verseInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  verseInfoText: {
    color: '#9ca3af',
    fontSize: 11,
    marginRight: 12,
    marginBottom: 2,
  },
  swipeIndicator: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  swipeHint: {
    backgroundColor: 'rgba(26, 26, 26, 0.8)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  swipeHintText: {
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