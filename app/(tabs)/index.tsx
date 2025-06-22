import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface GurudwaraStream {
  id: string;
  name: string;
  nameGurmukhi: string;
  image: string;
  isLive: boolean;
  subtitle?: string;
}

const gurudwaraStreams: GurudwaraStream[] = [
  {
    id: '1',
    name: 'Harmandir Sahib',
    nameGurmukhi: 'ਹਰਿਮੰਦਰ ਸਾਹਿਬ',
    image: 'https://images.pexels.com/photos/5458388/pexels-photo-5458388.jpeg',
    isLive: true,
  },
  {
    id: '2',
    name: 'Gurudawara Bangla Sahib',
    nameGurmukhi: 'ਸਿਸ ਗੰਜ ਸਾਹਿਬ',
    image: 'https://images.pexels.com/photos/14388683/pexels-photo-14388683.jpeg',
    isLive: true,
  },
  {
    id: '3',
    name: 'Gurudwara Bangla Sahib',
    nameGurmukhi: 'ਗੁਰਦੁਆਰਾ ਬੰਗਲਾ ਸਾਹਿਬ',
    image: 'https://images.pexels.com/photos/11517257/pexels-photo-11517257.jpeg',
    isLive: false,
    subtitle: 'Last recorded',
  },
];

export default function LiveKirtanScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Live Kirtan</Text>
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {gurudwaraStreams.map((stream) => (
          <TouchableOpacity key={stream.id} style={styles.streamCard}>
            <Image source={{ uri: stream.image }} style={styles.streamImage} />
            <View style={styles.streamInfo}>
              <View style={styles.streamHeader}>
                <Text style={styles.streamName}>{stream.name}</Text>
                <View style={[styles.statusBadge, stream.isLive ? styles.liveBadge : styles.playBadge]}>
                  <Text style={[styles.statusText, stream.isLive ? styles.liveText : styles.playText]}>
                    {stream.isLive ? 'Live' : 'Play'}
                  </Text>
                </View>
              </View>
              <Text style={styles.streamNameGurmukhi}>{stream.nameGurmukhi}</Text>
              {stream.subtitle && (
                <Text style={styles.streamSubtitle}>{stream.subtitle}</Text>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  streamCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },
  streamImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  streamInfo: {
    padding: 16,
  },
  streamHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  streamName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    flex: 1,
  },
  streamNameGurmukhi: {
    fontSize: 16,
    color: '#d1d5db',
    marginBottom: 4,
  },
  streamSubtitle: {
    fontSize: 14,
    color: '#9ca3af',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginLeft: 12,
  },
  liveBadge: {
    backgroundColor: '#10b981',
  },
  playBadge: {
    backgroundColor: '#374151',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  liveText: {
    color: '#ffffff',
  },
  playText: {
    color: '#d1d5db',
  },
});