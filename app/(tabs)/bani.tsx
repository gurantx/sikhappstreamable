import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Play, Search, Settings, BookOpen, Clock, Star, Heart, ChevronRight, Book, Shuffle, Volume2 } from 'lucide-react-native';
import { useState } from 'react';
import Animated, { 
  useAnimatedScrollHandler, 
  useSharedValue, 
  useAnimatedStyle, 
  interpolate, 
  Extrapolate,
  withTiming
} from 'react-native-reanimated';
import BaniReader from '@/components/BaniReader';
import AngReader from '@/components/AngReader';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import AudioPlayer from '@/components/AudioPlayer';
import MiniAudioPlayer from '@/components/MiniAudioPlayer';

interface BaniItem {
  id: string;
  name: string;
  nameGurmukhi: string;
  progress: number;
  total: number;
  granth: string;
  hasAudio?: boolean;
  isFavorite?: boolean;
  description?: string;
}

interface BaniCategory {
  id: string;
  title: string;
  titleGurmukhi: string;
  icon: React.ComponentType<any>;
  description: string;
  banis: BaniItem[];
}

const baniCategories: BaniCategory[] = [
  {
    id: 'nitnem',
    title: 'Nitnem',
    titleGurmukhi: 'ਨਿਤਨੇਮ',
    icon: Clock,
    description: 'Daily prayers for spiritual practice',
    banis: [
      {
        id: '1',
        name: 'Japji Sahib',
        nameGurmukhi: 'ਜਪੁਜੀ ਸਾਹਿਬ',
        progress: 15,
        total: 40,
        granth: 'Guru Granth Sahib',
        hasAudio: true,
        isFavorite: true,
        description: 'Morning prayer - Foundation of Sikh philosophy'
      },
      {
        id: '2',
        name: 'Jaap Sahib',
        nameGurmukhi: 'ਜਾਪੁ ਸਾਹਿਬ',
        progress: 8,
        total: 199,
        granth: 'Dasam Granth',
        hasAudio: true,
        description: 'Morning prayer - Attributes of the Divine'
      },
      {
        id: '3',
        name: 'Tav Prasad Savaiye',
        nameGurmukhi: 'ਤਵ ਪ੍ਰਸਾਦਿ ਸਵਈਏ',
        progress: 3,
        total: 10,
        granth: 'Dasam Granth',
        hasAudio: true,
        description: 'Morning prayer - Divine grace and protection'
      },
      {
        id: '4',
        name: 'Chaupai Sahib',
        nameGurmukhi: 'ਚੌਪਈ ਸਾਹਿਬ',
        progress: 6,
        total: 41,
        granth: 'Dasam Granth',
        hasAudio: true,
        description: 'Protection prayer - Shield against negativity'
      },
      {
        id: '5',
        name: 'Anand Sahib',
        nameGurmukhi: 'ਆਨੰਦੁ ਸਾਹਿਬ',
        progress: 12,
        total: 40,
        granth: 'Guru Granth Sahib',
        hasAudio: true,
        description: 'Bliss prayer - Joy in divine connection'
      },
      {
        id: '6',
        name: 'Rehras Sahib',
        nameGurmukhi: 'ਰਹਰਾਸ ਸਾਹਿਬ',
        progress: 4,
        total: 12,
        granth: 'Guru Granth Sahib',
        hasAudio: true,
        description: 'Evening prayer - Reflection and gratitude'
      },
      {
        id: '8',
        name: 'Kirtan Sohila',
        nameGurmukhi: 'ਕੀਰਤਨ ਸੋਹਿਲਾ',
        progress: 5,
        total: 5,
        granth: 'Guru Granth Sahib',
        hasAudio: true,
        description: 'Night prayer - Peace before rest'
      },
    ],
  },
  {
    id: 'guru_granth_sahib',
    title: 'Guru Granth Sahib',
    titleGurmukhi: 'ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ',
    icon: BookOpen,
    description: 'The eternal Guru and sacred scripture - All 1430 Angs',
    banis: [
      {
        id: '10',
        name: 'Sukhmani Sahib',
        nameGurmukhi: 'ਸੁਖਮਨੀ ਸਾਹਿਬ',
        progress: 3,
        total: 24,
        granth: 'Guru Granth Sahib',
        hasAudio: true,
        isFavorite: true,
        description: 'Prayer for peace of mind - 24 Ashtpadis'
      },
      {
        id: '11',
        name: 'Asa Di Vaar',
        nameGurmukhi: 'ਆਸਾ ਦੀ ਵਾਰ',
        progress: 0,
        total: 24,
        granth: 'Guru Granth Sahib',
        hasAudio: true,
        description: 'Morning hymns in Raag Asa'
      },
      {
        id: '12',
        name: 'Barah Maha',
        nameGurmukhi: 'ਬਾਰਹ ਮਾਹਾ',
        progress: 0,
        total: 12,
        granth: 'Guru Granth Sahib',
        hasAudio: true,
        description: 'Twelve months - Spiritual seasons'
      },
      {
        id: '13',
        name: 'Shabad Hazare',
        nameGurmukhi: 'ਸ਼ਬਦ ਹਜ਼ਾਰੇ',
        progress: 2,
        total: 10,
        granth: 'Guru Granth Sahib',
        hasAudio: true,
        description: 'Thousand shabads - Divine wisdom'
      },
      {
        id: '14',
        name: 'Salok Mahalla 9',
        nameGurmukhi: 'ਸਲੋਕ ਮਹਲਾ ੯',
        progress: 0,
        total: 57,
        granth: 'Guru Granth Sahib',
        hasAudio: true,
        description: 'Verses by Guru Tegh Bahadur Ji'
      },
      {
        id: 'browse_angs',
        name: 'Browse by Ang',
        nameGurmukhi: 'ਅੰਗ ਦੁਆਰਾ ਬ੍ਰਾਊਜ਼ ਕਰੋ',
        progress: 0,
        total: 1430,
        granth: 'Guru Granth Sahib',
        hasAudio: false,
        description: 'Read any page (Ang 1-1430) of Sri Guru Granth Sahib'
      },
      {
        id: 'random_ang',
        name: 'Random Ang',
        nameGurmukhi: 'ਰੈਂਡਮ ਅੰਗ',
        progress: 0,
        total: 1430,
        granth: 'Guru Granth Sahib',
        hasAudio: false,
        description: 'Open a random page for daily inspiration'
      },
    ],
  },
  {
    id: 'dasam_granth',
    title: 'Dasam Granth',
    titleGurmukhi: 'ਦਸਮ ਗ੍ਰੰਥ',
    icon: Star,
    description: 'Compositions by Guru Gobind Singh Ji',
    banis: [
      {
        id: '15',
        name: 'Akal Ustat',
        nameGurmukhi: 'ਅਕਾਲ ਉਸਤਤਿ',
        progress: 0,
        total: 271,
        granth: 'Dasam Granth',
        hasAudio: true,
        description: 'Praise of the Timeless One'
      },
      {
        id: '16',
        name: 'Bachittar Natak',
        nameGurmukhi: 'ਬਚਿੱਤਰ ਨਾਟਕ',
        progress: 0,
        total: 14,
        granth: 'Dasam Granth',
        hasAudio: true,
        description: 'Wondrous drama - Guru\'s autobiography'
      },
      {
        id: '17',
        name: 'Chandi Charitar',
        nameGurmukhi: 'ਚੰਡੀ ਚਰਿਤ੍ਰ',
        progress: 0,
        total: 233,
        granth: 'Dasam Granth',
        hasAudio: true,
        description: 'Stories of divine power'
      },
      {
        id: '18',
        name: 'Zafarnama',
        nameGurmukhi: 'ਜ਼ਫਰਨਾਮਾ',
        progress: 0,
        total: 111,
        granth: 'Dasam Granth',
        hasAudio: true,
        description: 'Letter of victory to Aurangzeb'
      },
    ],
  },
];

const ProgressCircle = ({ progress, total }: { progress: number; total: number }) => {
  const percentage = total > 0 ? (progress / total) * 100 : 0;
  const isComplete = progress === total && total > 0;
  
  return (
    <View style={styles.progressContainer}>
      <View style={[styles.progressCircle, isComplete && styles.progressComplete]}>
        <Text style={[styles.progressText, isComplete && styles.progressTextComplete]}>
          {isComplete ? '✓' : progress}
        </Text>
      </View>
    </View>
  );
};

const BaniCard = ({ bani, onPress, onPlayAudio }: { 
  bani: BaniItem; 
  onPress: () => void;
  onPlayAudio?: () => void;
}) => (
  <TouchableOpacity style={styles.baniCard} onPress={onPress}>
    <View style={styles.baniInfo}>
      <View style={styles.baniHeader}>
        <Text style={styles.baniName}>{bani.name}</Text>
        <View style={styles.baniIcons}>
          {bani.isFavorite && <Heart size={16} color="#10b981" fill="#10b981" />}
          {bani.id === 'browse_angs' && <Book size={16} color="#10b981" />}
          {bani.id === 'random_ang' && <Shuffle size={16} color="#10b981" />}
        </View>
      </View>
      <Text style={styles.baniNameGurmukhi}>{bani.nameGurmukhi}</Text>
      <Text style={styles.baniDescription}>{bani.description}</Text>
      <Text style={styles.baniGranth}>{bani.granth}</Text>
      
      <View style={styles.baniActions}>
        <TouchableOpacity style={styles.continueButton}>
          <Text style={styles.continueButtonText}>
            {bani.id === 'browse_angs' ? 'Browse' : 
             bani.id === 'random_ang' ? 'Random' :
             bani.progress > 0 ? 'Continue' : 'Start'}
          </Text>
        </TouchableOpacity>
        {bani.hasAudio && onPlayAudio && (
          <TouchableOpacity style={styles.audioButton} onPress={onPlayAudio}>
            <Volume2 size={16} color="#10b981" />
          </TouchableOpacity>
        )}
      </View>
    </View>
    <ProgressCircle progress={bani.progress} total={bani.total} />
  </TouchableOpacity>
);

const CategorySection = ({ 
  category, 
  onBaniPress,
  onPlayAudio
}: { 
  category: BaniCategory; 
  onBaniPress: (bani: BaniItem) => void;
  onPlayAudio: (baniId: string) => void;
}) => (
  <View style={styles.categorySection}>
    <View style={styles.categoryHeader}>
      <View style={styles.categoryTitleContainer}>
        <category.icon size={24} color="#10b981" />
        <View style={styles.categoryTitleText}>
          <Text style={styles.categoryTitle}>{category.title}</Text>
          <Text style={styles.categoryTitleGurmukhi}>{category.titleGurmukhi}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.viewAllButton}>
        <Text style={styles.viewAllText}>View All</Text>
        <ChevronRight size={16} color="#9ca3af" />
      </TouchableOpacity>
    </View>
    
    <Text style={styles.categoryDescription}>{category.description}</Text>
    
    <View style={styles.banisContainer}>
      {category.banis.map((bani) => (
        <BaniCard 
          key={bani.id} 
          bani={bani} 
          onPress={() => onBaniPress(bani)} 
          onPlayAudio={bani.hasAudio ? () => onPlayAudio(bani.id) : undefined}
        />
      ))}
    </View>
  </View>
);

const HEADER_HEIGHT = 140;

export default function ReadBaniScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBaniId, setSelectedBaniId] = useState<string | null>(null);
  const [showBaniReader, setShowBaniReader] = useState(false);
  const [showAngReader, setShowAngReader] = useState(false);
  const [selectedAng, setSelectedAng] = useState(1);
  
  // Audio player hook
  const audioPlayer = useAudioPlayer();
  
  // Animated values for scroll
  const scrollY = useSharedValue(0);
  const isScrollingDown = useSharedValue(false);
  const lastScrollY = useSharedValue(0);

  const filteredCategories = baniCategories.map(category => ({
    ...category,
    banis: category.banis.filter(bani =>
      bani.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bani.nameGurmukhi.includes(searchQuery) ||
      bani.description?.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter(category => category.banis.length > 0);

  const handleBaniPress = async (bani: BaniItem) => {
    if (bani.id === 'browse_angs') {
      setSelectedAng(1);
      setShowAngReader(true);
    } else if (bani.id === 'random_ang') {
      const randomAng = Math.floor(Math.random() * 1430) + 1;
      setSelectedAng(randomAng);
      setShowAngReader(true);
    } else {
      setSelectedBaniId(bani.id);
      setShowBaniReader(true);
    }
  };

  const handlePlayAudio = async (baniId: string) => {
    await audioPlayer.playBani(baniId);
  };

  const handleBackFromReader = () => {
    setShowBaniReader(false);
    setSelectedBaniId(null);
  };

  const handleBackFromAngReader = () => {
    setShowAngReader(false);
    setSelectedAng(1);
  };

  const handleNextBani = (nextBaniId: string) => {
    setSelectedBaniId(nextBaniId);
  };

  // Get continue reading bani
  const continueReadingBani = baniCategories
    .flatMap(cat => cat.banis)
    .filter(bani => bani.progress > 0 && bani.progress < bani.total && !['browse_angs', 'random_ang'].includes(bani.id))
    .sort((a, b) => b.progress - a.progress)[0];

  // Scroll handler
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      const currentScrollY = event.contentOffset.y;
      const diff = currentScrollY - lastScrollY.value;
      
      if (Math.abs(diff) > 5) {
        if (diff > 0 && currentScrollY > 50) {
          isScrollingDown.value = withTiming(1, { duration: 200 });
        } else if (diff < 0 || currentScrollY <= 50) {
          isScrollingDown.value = withTiming(0, { duration: 200 });
        }
      }
      
      scrollY.value = currentScrollY;
      lastScrollY.value = currentScrollY;
    },
  });

  // Animated header style
  const headerAnimatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      isScrollingDown.value,
      [0, 1],
      [0, -HEADER_HEIGHT],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ translateY }],
    };
  });

  // Animated content style
  const contentAnimatedStyle = useAnimatedStyle(() => {
    const paddingTop = interpolate(
      isScrollingDown.value,
      [0, 1],
      [HEADER_HEIGHT, 0],
      Extrapolate.CLAMP
    );

    return {
      paddingTop,
    };
  });

  if (showBaniReader && selectedBaniId) {
    return (
      <BaniReader 
        baniId={selectedBaniId} 
        onBack={handleBackFromReader}
        onNextBani={handleNextBani}
      />
    );
  }

  if (showAngReader) {
    return (
      <AngReader 
        initialAng={selectedAng} 
        onBack={handleBackFromAngReader}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Animated Header */}
      <Animated.View style={[styles.header, headerAnimatedStyle]}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>Read Bani</Text>
          <TouchableOpacity style={styles.settingsButton}>
            <Settings size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.searchContainer}>
          <Search size={20} color="#9ca3af" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search banis, prayers, or keywords..."
            placeholderTextColor="#9ca3af"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </Animated.View>
      
      {/* Animated ScrollView */}
      <Animated.ScrollView 
        style={[styles.content, contentAnimatedStyle]} 
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <>
          {/* Continue Reading Section */}
          {continueReadingBani && !searchQuery && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Continue Reading</Text>
              <TouchableOpacity 
                style={styles.continueReadingCard}
                onPress={() => handleBaniPress(continueReadingBani)}
              >
                <View style={styles.continueReadingInfo}>
                  <Text style={styles.continueReadingTitle}>{continueReadingBani.name}</Text>
                  <Text style={styles.continueReadingSubtitle}>
                    {continueReadingBani.progress} of {continueReadingBani.total} completed
                  </Text>
                  <Text style={styles.continueReadingText}>{continueReadingBani.nameGurmukhi}</Text>
                </View>
                <View style={styles.continueReadingActions}>
                  <TouchableOpacity 
                    style={styles.continueReadingButton}
                    onPress={() => handleBaniPress(continueReadingBani)}
                  >
                    <Play size={20} color="#ffffff" fill="#ffffff" />
                  </TouchableOpacity>
                  {continueReadingBani.hasAudio && (
                    <TouchableOpacity 
                      style={styles.continueReadingAudioButton}
                      onPress={() => handlePlayAudio(continueReadingBani.id)}
                    >
                      <Volume2 size={18} color="#10b981" />
                    </TouchableOpacity>
                  )}
                </View>
              </TouchableOpacity>
            </View>
          )}

          {/* Quick Access Section */}
          {!searchQuery && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Quick Access</Text>
              <View style={styles.quickAccessContainer}>
                <TouchableOpacity 
                  style={styles.quickAccessCard}
                  onPress={() => handleBaniPress({ id: 'random_ang', name: 'Random Ang', nameGurmukhi: 'ਰੈਂਡਮ ਅੰਗ', progress: 0, total: 1430, granth: 'Guru Granth Sahib', description: 'Random page for daily inspiration' })}
                >
                  <Shuffle size={24} color="#10b981" />
                  <Text style={styles.quickAccessTitle}>Random Ang</Text>
                  <Text style={styles.quickAccessSubtitle}>Daily inspiration</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.quickAccessCard}
                  onPress={() => handleBaniPress({ id: 'browse_angs', name: 'Browse by Ang', nameGurmukhi: 'ਅੰਗ ਦੁਆਰਾ ਬ੍ਰਾਊਜ਼ ਕਰੋ', progress: 0, total: 1430, granth: 'Guru Granth Sahib', description: 'Browse all 1430 pages' })}
                >
                  <BookOpen size={24} color="#10b981" />
                  <Text style={styles.quickAccessTitle}>Browse Angs</Text>
                  <Text style={styles.quickAccessSubtitle}>All 1430 pages</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Main Categories */}
          {filteredCategories.map((category) => (
            <CategorySection
              key={category.id}
              category={category}
              onBaniPress={handleBaniPress}
              onPlayAudio={handlePlayAudio}
            />
          ))}

          {/* No Results */}
          {searchQuery && filteredCategories.length === 0 && (
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsText}>No banis found for "{searchQuery}"</Text>
              <Text style={styles.noResultsSubtext}>
                Try searching for specific bani names, Gurmukhi text, or keywords
              </Text>
            </View>
          )}
        </>
      </Animated.ScrollView>

      {/* Audio Players */}
      {audioPlayer.currentTrack && (
        <>
          <AudioPlayer
            track={audioPlayer.currentTrack}
            isVisible={audioPlayer.isExpanded}
            onClose={audioPlayer.collapsePlayer}
            onTrackComplete={() => {}}
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
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: '#0a0a0a',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 16,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  settingsButton: {
    padding: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#ffffff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 16,
  },
  continueReadingCard: {
    backgroundColor: '#10b981',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  continueReadingInfo: {
    flex: 1,
  },
  continueReadingTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  continueReadingSubtitle: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.8,
    marginBottom: 8,
  },
  continueReadingText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '500',
  },
  continueReadingActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  continueReadingButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueReadingAudioButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickAccessContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  quickAccessCard: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  quickAccessTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginTop: 12,
    marginBottom: 4,
  },
  quickAccessSubtitle: {
    fontSize: 12,
    color: '#9ca3af',
    textAlign: 'center',
  },
  categorySection: {
    marginBottom: 32,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  categoryTitleText: {
    marginLeft: 12,
    flex: 1,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 2,
  },
  categoryTitleGurmukhi: {
    fontSize: 14,
    color: '#d1d5db',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#374151',
    borderRadius: 8,
  },
  viewAllText: {
    color: '#d1d5db',
    fontSize: 12,
    fontWeight: '500',
    marginRight: 4,
  },
  categoryDescription: {
    fontSize: 14,
    color: '#9ca3af',
    marginBottom: 16,
    lineHeight: 20,
  },
  banisContainer: {
    gap: 12,
  },
  baniCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  baniInfo: {
    flex: 1,
  },
  baniHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  baniName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    flex: 1,
  },
  baniIcons: {
    flexDirection: 'row',
    gap: 8,
  },
  baniNameGurmukhi: {
    fontSize: 14,
    color: '#d1d5db',
    marginBottom: 4,
  },
  baniDescription: {
    fontSize: 13,
    color: '#9ca3af',
    marginBottom: 4,
    lineHeight: 18,
  },
  baniGranth: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 12,
  },
  baniActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  continueButton: {
    backgroundColor: '#10b981',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 12,
  },
  continueButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
  audioButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#374151',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressContainer: {
    marginLeft: 16,
  },
  progressCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#374151',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressComplete: {
    backgroundColor: '#10b981',
  },
  progressText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  progressTextComplete: {
    color: '#ffffff',
    fontSize: 16,
  },
  noResultsContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  noResultsText: {
    fontSize: 18,
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
  },
  noResultsSubtext: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
    lineHeight: 20,
  },
});