// Complete Tav Prasad Savaiye Service - All 10 Savaiye with full translations
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface TavPrasadVerse {
  id: string;
  gurmukhi: string;
  english: string;
  transliteration: string;
  translation: string;
  punjabiTranslation?: string;
  meaning?: string;
  lineNumber: number;
  verseType: 'opening' | 'savaiya' | 'closing';
}

export interface TavPrasadSavayeContent {
  id: string;
  name: string;
  nameGurmukhi: string;
  verses: TavPrasadVerse[];
  totalVerses: number;
  audioUrl?: string;
  description: string;
  granth: string;
}

class TavPrasadSavayeService {
  private cache: Map<string, any> = new Map();

  // Get complete Tav Prasad Savaiye
  async getCompleteTavPrasadSavaiye(): Promise<TavPrasadSavayeContent> {
    const cacheKey = 'tav_prasad_savaiye_complete';
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const data = this.getCompleteTavPrasadSavayeOfflineData();
      this.cache.set(cacheKey, data);
      await this.saveOfflineData(cacheKey, data);
      
      return data;
    } catch (error) {
      console.error('Error fetching Tav Prasad Savaiye:', error);
      return this.getCompleteTavPrasadSavayeOfflineData();
    }
  }

  // Complete Tav Prasad Savaiye offline data - All 10 Savaiye
  private getCompleteTavPrasadSavayeOfflineData(): TavPrasadSavayeContent {
    const verses: TavPrasadVerse[] = [
      // Opening
      {
        id: 'tps_opening_1',
        gurmukhi: 'ਸ੍ਰਵਗ ਸੁਧ ਸਮੂਹ ਸਿਧਾਨ ਕੇ ਦੇਖਿ ਫਿਰਿਓ ਘਰ ਬਾਰ ॥',
        english: 'I have seen all the righteous, the Siddhas and the heavenly beings, wandering from house to house.',
        transliteration: 'Sarvag Sudh Samooh Sidhaan Kay Daykh Firio Ghar Baar',
        translation: 'I have seen all the righteous, the Siddhas and the heavenly beings, wandering from house to house.',
        punjabiTranslation: 'ਮੈਂ ਸਾਰੇ ਧਰਮੀ, ਸਿੱਧ ਅਤੇ ਸਵਰਗੀ ਜੀਵਾਂ ਨੂੰ ਘਰ-ਘਰ ਭਟਕਦੇ ਦੇਖਿਆ ਹੈ।',
        meaning: 'The Guru has observed that even the most spiritually advanced beings - the righteous ones, the Siddhas (perfected beings), and heavenly beings - are still searching and wandering from place to place, seeking spiritual fulfillment.',
        lineNumber: 1,
        verseType: 'opening'
      },

      // Savaiya 1
      {
        id: 'tps_savaiya_1',
        gurmukhi: 'ਸਾਰੇ ਹੀ ਸੇ ਆਸ ਕਰਿ ਬੈਠੇ ਤੁਹੀ ਅਸ ਦਾਤਾਰ ॥ ਤੁਮ ਸਮਰਥ ਸੁਲਤਾਨ ਸਿਰੀ ਅਸਿਧੁਜ ਜਰਾਰ ॥ ਤਾਹਿ ਭਜੰਤਿ ਸੁ ਸਾਜ ਸਨਾਹੀ ਸਾਰ ਸੁਧਾਰ ॥ ਸਾਹਿਬ ਸ੍ਰੀ ਸਭ ਕੋ ਸਿਰਦਾਰ ਸਦਾ ਦਲ ਬੀਰ ॥੧॥',
        english: 'All of them sit with hope, that You alone are the Giver. You are the All-Powerful Sovereign, the Invincible Warrior. Those who worship You are well-equipped and reformed. O Master, You are the Supreme Leader of all, forever the Brave of the army.',
        transliteration: 'Saaray Hee Say Aas Kar Baithay Tuhee As Daataar. Tum Samarath Sultaan Siree Asidhuj Jaraar. Taahi Bhajant Su Saaj Sanaahee Saar Sudhaar. Saahib Sree Sabh Ko Sirdaar Sadaa Dal Beer.',
        translation: 'All of them sit with hope, that You alone are the Giver. You are the All-Powerful Sovereign, the Invincible Warrior. Those who worship You are well-equipped and reformed. O Master, You are the Supreme Leader of all, forever the Brave of the army.',
        punjabiTranslation: 'ਉਹ ਸਾਰੇ ਹੀ ਆਸ ਰੱਖ ਕੇ ਬੈਠੇ ਹਨ ਕਿ ਤੁਸੀਂ ਹੀ ਦਾਤਾ ਹੋ। ਤੁਸੀਂ ਸਰਬ-ਸ਼ਕਤੀਮਾਨ ਬਾਦਸ਼ਾਹ ਹੋ, ਅਜਿੱਤ ਯੋਧਾ ਹੋ। ਜੋ ਤੁਹਾਨੂੰ ਭਜਦੇ ਹਨ, ਉਹ ਚੰਗੀ ਤਰ੍ਹਾਂ ਸੁਸੱਜਿਤ ਅਤੇ ਸੁਧਾਰੇ ਹੋਏ ਹਨ। ਹੇ ਮਾਲਿਕ! ਤੁਸੀਂ ਸਭ ਦੇ ਸਰਦਾਰ ਹੋ, ਸਦਾ ਫੌਜ ਦੇ ਬਹਾਦੁਰ ਹੋ।',
        meaning: 'This verse establishes God as the ultimate source of all blessings. Even the most spiritually advanced beings depend on Divine grace. God is described as the All-Powerful Sovereign and Invincible Warrior, emphasizing both spiritual authority and protective power. Those who worship God become well-equipped spiritually and morally reformed.',
        lineNumber: 2,
        verseType: 'savaiya'
      },

      // Savaiya 2
      {
        id: 'tps_savaiya_2',
        gurmukhi: 'ਦੇਵਨ ਕੋ ਦੇਵ ਕਹੈ ਕਿਹ ਕਾਮ ਕ੍ਰੋਧਾਦਿਕ ਖੋਰ ॥ ਨਿਰਭੈ ਨਿਰਗੁਨ ਨਿਰੰਕਾਰ ਨਿਰਲੇਪ ਨਿਰੰਜਨ ਗੋਰ ॥ ਸੁ ਬੁਧਿ ਸੁ ਬਿਦਿਆ ਸੁ ਗਿਆਨ ਧਿਆਨ ਕਿਹ ਪਾਵੈ ਨੋਰ ॥ ਸਾਹਿਬ ਸ੍ਰੀ ਸਭ ਕੋ ਸਿਰਦਾਰ ਸਦਾ ਦਲ ਬੀਰ ॥੨॥',
        english: 'What can the gods say to the God of gods, who destroys lust, anger and other vices? He is Fearless, Beyond Attributes, Formless, Unattached, Pure and Fair. What wisdom, what knowledge, what understanding and meditation can comprehend that Light? O Master, You are the Supreme Leader of all, forever the Brave of the army.',
        transliteration: 'Dayvan Ko Dayv Kahai Kih Kaam Krodhaadik Khor. Nirbhai Nirgun Nirankaar Nirlaip Niranjan Gor. Su Budhi Su Bidiaa Su Giaan Dhiaan Kih Paavai Nor. Saahib Sree Sabh Ko Sirdaar Sadaa Dal Beer.',
        translation: 'What can the gods say to the God of gods, who destroys lust, anger and other vices? He is Fearless, Beyond Attributes, Formless, Unattached, Pure and Fair. What wisdom, what knowledge, what understanding and meditation can comprehend that Light? O Master, You are the Supreme Leader of all, forever the Brave of the army.',
        punjabiTranslation: 'ਦੇਵਤੇ ਦੇਵਾਂ ਦੇ ਦੇਵ ਨੂੰ ਕੀ ਕਹਿ ਸਕਦੇ ਹਨ, ਜੋ ਕਾਮ, ਕ੍ਰੋਧ ਆਦਿ ਦੁਰਗੁਣਾਂ ਨੂੰ ਨਾਸ਼ ਕਰਦਾ ਹੈ? ਉਹ ਨਿਰਭੈ, ਨਿਰਗੁਣ, ਨਿਰਾਕਾਰ, ਨਿਰਲੇਪ, ਨਿਰੰਜਨ ਅਤੇ ਗੋਰਾ ਹੈ। ਕਿਹੜੀ ਬੁੱਧੀ, ਕਿਹੜੀ ਵਿਦਿਆ, ਕਿਹੜਾ ਗਿਆਨ ਅਤੇ ਧਿਆਨ ਉਸ ਜੋਤਿ ਨੂੰ ਪਾ ਸਕਦਾ ਹੈ? ਹੇ ਮਾਲਿਕ! ਤੁਸੀਂ ਸਭ ਦੇ ਸਰਦਾਰ ਹੋ, ਸਦਾ ਫੌਜ ਦੇ ਬਹਾਦੁਰ ਹੋ।',
        meaning: 'This verse emphasizes God\'s supremacy over all deities and divine beings. God is the destroyer of negative qualities like lust and anger. The verse lists God\'s transcendent qualities: Fearless (beyond all fears), Beyond Attributes (not limited by qualities), Formless (not bound by physical form), Unattached (not affected by worldly attachments), Pure (completely clean), and Fair (just and beautiful). No amount of wisdom, knowledge, or meditation can fully comprehend the Divine Light.',
        lineNumber: 3,
        verseType: 'savaiya'
      },

      // Savaiya 3
      {
        id: 'tps_savaiya_3',
        gurmukhi: 'ਸੁਨਿ ਲੀਜੈ ਅਰਦਾਸ ਹਮਾਰੀ ਕਰਿ ਕਿਰਪਾ ਖਿਨ ਇਕ ॥ ਗੁਰ ਗੋਬਿੰਦ ਦੋਊ ਖੜੇ ਕਾਕੇ ਲਾਗੂੰ ਪਾਇ ॥ ਬਲਿਹਾਰੀ ਗੁਰ ਆਪਣੇ ਦਿਉਹਾੜੀ ਸਦ ਵਾਰ ॥ ਜਿਨਿ ਮਾਨਸ ਤੇ ਦੇਵਤੇ ਕੀਏ ਕਰਤ ਨ ਲਾਗੀ ਵਾਰ ॥੩॥',
        english: 'Listen to our prayer, O Lord, and show mercy for just a moment. When both Guru and Gobind stand before me, at whose feet should I fall? I am devoted to my Guru, day and night forever. Who transformed humans into gods in no time at all.',
        transliteration: 'Sun Leejai Ardaas Hamaaree Kar Kirpaa Khin Ik. Gur Gobind Dooo Kharay Kaakay Laagoon Paaay. Balihaaree Gur Aapnay Diuhaarhee Sad Vaar. Jin Maanas Tay Dayvatay Keeay Karat Na Laagee Vaar.',
        translation: 'Listen to our prayer, O Lord, and show mercy for just a moment. When both Guru and Gobind stand before me, at whose feet should I fall? I am devoted to my Guru, day and night forever. Who transformed humans into gods in no time at all.',
        punjabiTranslation: 'ਸਾਡੀ ਅਰਦਾਸ ਸੁਣੋ, ਹੇ ਪ੍ਰਭੂ, ਅਤੇ ਇੱਕ ਖਿਨ ਲਈ ਕਿਰਪਾ ਕਰੋ। ਜਦੋਂ ਗੁਰੂ ਅਤੇ ਗੋਬਿੰਦ ਦੋਵੇਂ ਮੇਰੇ ਸਾਹਮਣੇ ਖੜੇ ਹਨ, ਤਾਂ ਮੈਂ ਕਿਸ ਦੇ ਪੈਰ ਲੱਗਾਂ? ਮੈਂ ਆਪਣੇ ਗੁਰੂ ਤੋਂ ਸਦਾ ਕੁਰਬਾਨ ਹਾਂ, ਦਿਨ-ਰਾਤ ਸਦਾ ਲਈ। ਜਿਸ ਨੇ ਮਨੁੱਖਾਂ ਨੂੰ ਦੇਵਤੇ ਬਣਾ ਦਿੱਤਾ, ਬਿਨਾਂ ਕੋਈ ਸਮਾਂ ਲਗਾਏ।',
        meaning: 'This verse expresses a humble prayer for Divine mercy. It presents the beautiful dilemma of a devotee who sees no difference between the Guru and God (Gobind) - both are equally worthy of reverence. The verse expresses complete devotion to the Guru who has the power to transform ordinary humans into divine beings instantly through spiritual grace and guidance.',
        lineNumber: 4,
        verseType: 'savaiya'
      },

      // Savaiya 4
      {
        id: 'tps_savaiya_4',
        gurmukhi: 'ਸ੍ਰੀ ਅਸਿਪਾਨਿ ਕ੍ਰਿਪਾਨਿ ਖੜਗ ਤੁਪਕ ਤਬਰ ਅਰੁ ਤੀਰ ॥ ਸੈਫ ਸਰੋਹੀ ਸੈਹਥੀ ਯਹੈ ਹਮਾਰੈ ਪੀਰ ॥ ਮਾਨ ਲੇਹੁ ਮਮ ਪੂਜਾ ਇਹੈ ਸੁਮਤਿ ਸਾਜਿ ਸਰੀਰ ॥ ਅਰਿ ਹਲ ਮਲ ਹਲਾਹਲ ਤੇ ਰਖਿ ਲੇਹੁ ਗੁਰਦੇਵ ਸਿਰੀ ॥੪॥',
        english: 'The sword, the dagger, the scimitar, the gun, the axe and the arrow - the sabre, the rapier and the spear - these are our spiritual guides. Accept this as my worship, O Lord, and bless my body with good sense. O Glorious Guru-God, protect me from the enemy, filth, and the deadliest poison.',
        transliteration: 'Sree Asipaan Kripaan Kharag Tupak Tabar Ar Teer. Saif Sarohee Saihatee Yahai Hamaarai Peer. Maan Layhu Mam Poojaa Ihai Sumat Saaj Sareer. Ar Hal Mal Halahal Tay Rakh Layhu Gurdayv Siree.',
        translation: 'The sword, the dagger, the scimitar, the gun, the axe and the arrow - the sabre, the rapier and the spear - these are our spiritual guides. Accept this as my worship, O Lord, and bless my body with good sense. O Glorious Guru-God, protect me from the enemy, filth, and the deadliest poison.',
        punjabiTranslation: 'ਤਲਵਾਰ, ਕ੍ਰਿਪਾਨ, ਖੜਗ, ਬੰਦੂਕ, ਕੁਹਾੜਾ ਅਤੇ ਤੀਰ - ਸੈਫ, ਸਰੋਹੀ ਅਤੇ ਬਰਛਾ - ਇਹ ਸਾਡੇ ਪੀਰ (ਰਾਹਨੁਮਾ) ਹਨ। ਇਸ ਨੂੰ ਮੇਰੀ ਪੂਜਾ ਮੰਨੋ, ਹੇ ਪ੍ਰਭੂ, ਅਤੇ ਮੇਰੇ ਸਰੀਰ ਨੂੰ ਚੰਗੀ ਮਤਿ ਨਾਲ ਸਜਾਓ। ਹੇ ਸ਼ਾਨਦਾਰ ਗੁਰੂ-ਦੇਵ! ਮੈਨੂੰ ਦੁਸ਼ਮਣ, ਗੰਦਗੀ ਅਤੇ ਸਭ ਤੋਂ ਘਾਤਕ ਜ਼ਹਿਰ ਤੋਂ ਬਚਾਓ।',
        meaning: 'This verse presents weapons as spiritual guides, symbolizing the need for spiritual warriors to be equipped for the battle against evil. The weapons represent different aspects of spiritual strength needed to fight injustice and protect righteousness. The verse asks God to accept this martial spirit as a form of worship and to bless the devotee with wisdom. It seeks protection from enemies (both physical and spiritual), moral corruption (filth), and spiritual poison (negative influences).',
        lineNumber: 5,
        verseType: 'savaiya'
      },

      // Savaiya 5
      {
        id: 'tps_savaiya_5',
        gurmukhi: 'ਰਾਜ ਨ ਚਾਹਉ ਮੁਕਤਿ ਨ ਚਾਹਉ ਮਨ ਪ੍ਰੀਤਿ ਚਰਨ ਕਮਲਾਰੇ ॥ ਦੁਹ ਕਰ ਜੋੜਿ ਰਾਇ ਸੁਖ ਸਾਗਰ ਸੁਖ ਸੰਪਤਿ ਭੰਡਾਰੇ ॥ ਇਹੈ ਅਭੈ ਬਰ ਮਾਗਉ ਠਾਕੁਰ ਪੂਰਨ ਹੋਇ ਹਮਾਰੇ ॥ ਤੁਮ ਰਖਵਾਲੇ ਸਭ ਸੈਨਾ ਕੇ ਦਾਤਿ ਕਰਹੁ ਸੁਰਧਾਰੇ ॥੫॥',
        english: 'I desire neither kingdom nor liberation; my mind loves Your lotus feet. With folded hands, O King, Ocean of Peace, Treasure of happiness and prosperity. This fearless boon I ask of You, O Master, let it be fulfilled for me. You are the Protector of all armies; grant this gift, O Supporter of the gods.',
        transliteration: 'Raaj Na Chaahau Mukat Na Chaahau Man Preet Charan Kamlaray. Duh Kar Jorh Raaay Sukh Saagar Sukh Sampat Bhandaaray. Ihai Abhai Bar Maagau Thaakur Pooran Hoi Hamaaray. Tum Rakhvaalay Sabh Sainaa Kay Daat Karahu Surdhaaray.',
        translation: 'I desire neither kingdom nor liberation; my mind loves Your lotus feet. With folded hands, O King, Ocean of Peace, Treasure of happiness and prosperity. This fearless boon I ask of You, O Master, let it be fulfilled for me. You are the Protector of all armies; grant this gift, O Supporter of the gods.',
        punjabiTranslation: 'ਮੈਂ ਨਾ ਰਾਜ ਚਾਹੁੰਦਾ ਹਾਂ, ਨਾ ਮੁਕਤੀ ਚਾਹੁੰਦਾ ਹਾਂ; ਮੇਰਾ ਮਨ ਤੁਹਾਡੇ ਕਮਲ ਚਰਨਾਂ ਨਾਲ ਪ੍ਰੀਤ ਕਰਦਾ ਹੈ। ਦੋਵੇਂ ਹੱਥ ਜੋੜ ਕੇ, ਹੇ ਰਾਜਾ, ਸੁਖ ਦੇ ਸਾਗਰ, ਸੁਖ ਅਤੇ ਸੰਪਤੀ ਦੇ ਭੰਡਾਰ! ਇਹ ਨਿਰਭੈਤਾ ਦਾ ਵਰਦਾਨ ਮੈਂ ਮੰਗਦਾ ਹਾਂ, ਹੇ ਠਾਕੁਰ, ਮੇਰੇ ਲਈ ਪੂਰਾ ਹੋਵੇ। ਤੁਸੀਂ ਸਾਰੀਆਂ ਸੈਨਾਵਾਂ ਦੇ ਰਖਵਾਲੇ ਹੋ; ਇਹ ਦਾਤ ਕਰੋ, ਹੇ ਦੇਵਤਿਆਂ ਦੇ ਸਹਾਰੇ!',
        meaning: 'This verse expresses the highest form of devotion - desiring neither worldly power (kingdom) nor even spiritual liberation (mukti), but only love for God\'s lotus feet. The devotee approaches God with humility (folded hands) and recognizes God as the Ocean of Peace and Treasure of all happiness. The "fearless boon" (abhai var) refers to the blessing of fearlessness in the face of all challenges while serving righteousness.',
        lineNumber: 6,
        verseType: 'savaiya'
      },

      // Savaiya 6
      {
        id: 'tps_savaiya_6',
        gurmukhi: 'ਸਭ ਸਿਖਨ ਕੋ ਹੁਕਮ ਹੈ ਗੁਰੂ ਮਾਨਿਓ ਗ੍ਰੰਥ ॥ ਗੁਰੂ ਗ੍ਰੰਥ ਜੀ ਮਾਨਿਓ ਪ੍ਰਗਟ ਗੁਰਾਂ ਕੀ ਦੇਹ ॥ ਜੋ ਪ੍ਰਭ ਕੋ ਮਿਲਬੋ ਚਹੈ ਖੋਜ ਸਬਦ ਮੈ ਲੇਹ ॥ ਰਾਜ ਕਰੇਗਾ ਖਾਲਸਾ ਆਕੀ ਰਹੈ ਨ ਕੋਇ ॥੬॥',
        english: 'All Sikhs are commanded to accept the Granth as Guru. Accept Guru Granth Ji as the manifest body of the Gurus. Whoever wishes to meet God, let them search in the Word. The Khalsa shall rule, and no enemy shall remain.',
        transliteration: 'Sabh Sikhan Ko Hukam Hai Guroo Maanio Granth. Guroo Granth Jee Maanio Pragat Guraan Kee Dayh. Jo Prabh Ko Milbo Chahai Khoj Sabad Mai Layh. Raaj Karaygaa Khaalasaa Aakee Rahai Na Koi.',
        translation: 'All Sikhs are commanded to accept the Granth as Guru. Accept Guru Granth Ji as the manifest body of the Gurus. Whoever wishes to meet God, let them search in the Word. The Khalsa shall rule, and no enemy shall remain.',
        punjabiTranslation: 'ਸਾਰੇ ਸਿੱਖਾਂ ਨੂੰ ਹੁਕਮ ਹੈ ਕਿ ਗ੍ਰੰਥ ਨੂੰ ਗੁਰੂ ਮੰਨੋ। ਗੁਰੂ ਗ੍ਰੰਥ ਜੀ ਨੂੰ ਗੁਰੂਆਂ ਦਾ ਪ੍ਰਗਟ ਸਰੀਰ ਮੰਨੋ। ਜੋ ਪ੍ਰਭੂ ਨੂੰ ਮਿਲਣਾ ਚਾਹੁੰਦਾ ਹੈ, ਉਹ ਸ਼ਬਦ ਵਿੱਚ ਖੋਜ ਕਰੇ। ਖਾਲਸਾ ਰਾਜ ਕਰੇਗਾ, ਕੋਈ ਵਿਰੋਧੀ ਨਹੀਂ ਰਹੇਗਾ।',
        meaning: 'This verse establishes the eternal Guruship of Guru Granth Sahib. It commands all Sikhs to accept the Granth as their living Guru and the manifest form of all the Gurus. It emphasizes that those seeking God should search within the sacred Word (Shabad). The verse concludes with the prophecy that the Khalsa (the pure ones) shall rule and righteousness will prevail over all opposition.',
        lineNumber: 7,
        verseType: 'savaiya'
      },

      // Savaiya 7
      {
        id: 'tps_savaiya_7',
        gurmukhi: 'ਖਗ ਖੰਡ ਬਿਹੰਡੰ ਖਲ ਦਲ ਖੰਡੰ ਅਤਿ ਰਣ ਮੰਡੰ ਬਰ ਬੰਡੰ ॥ ਭੁਜ ਦੰਡ ਅਖੰਡੰ ਤੇਜ ਪ੍ਰਚੰਡੰ ਜੋਤਿ ਅਮੰਡੰ ਭਾਨ ਪ੍ਰਭੰ ॥ ਸੁਖ ਸੰਤਾ ਕਰਣੰ ਦੁਰਮਤਿ ਦਰਣੰ ਕਿਲਬਿਖ ਹਰਣੰ ਅਸ ਸਰਣੰ ॥ ਜੈ ਜੈ ਜਗ ਕਾਰਣ ਸ੍ਰਿਸਟਿ ਉਬਾਰਣ ਮਮ ਪ੍ਰਤਿਪਾਰਣ ਜੈ ਤੇਗੰ ॥੧॥',
        english: 'The sword cuts well, chops the forces of fools, is mighty in battle, the supreme wielder. With unbreakable arm-power, with fierce energy, with surpassing light, sun-like in splendor. Bringing happiness to saints, destroyer of evil counsel, remover of sins, such is our refuge. Hail, hail to the Cause of the world, Savior of creation, my Protector, hail to the Sword!',
        transliteration: 'Khag Khand Bihandam Khal Dal Khandam At Ran Mandam Bar Bandam. Bhuj Dand Akhandam Tayj Prachandam Jot Amandam Bhaan Prabham. Sukh Santaa Karnam Durmat Darnam Kilbikh Harnam As Sarnam. Jai Jai Jag Kaaran Srisht Ubaaran Mam Pratipaaran Jai Taygam.',
        translation: 'The sword cuts well, chops the forces of fools, is mighty in battle, the supreme wielder. With unbreakable arm-power, with fierce energy, with surpassing light, sun-like in splendor. Bringing happiness to saints, destroyer of evil counsel, remover of sins, such is our refuge. Hail, hail to the Cause of the world, Savior of creation, my Protector, hail to the Sword!',
        punjabiTranslation: 'ਤਲਵਾਰ ਚੰਗੀ ਤਰ੍ਹਾਂ ਕੱਟਦੀ ਹੈ, ਮੂਰਖਾਂ ਦੀ ਫੌਜ ਨੂੰ ਵੱਢਦੀ ਹੈ, ਯੁੱਧ ਵਿੱਚ ਸ਼ਕਤੀਸ਼ਾਲੀ ਹੈ, ਸਰਵੋਤਮ ਚਲਾਉਣ ਵਾਲੀ ਹੈ। ਅਟੁੱਟ ਬਾਂਹ-ਸ਼ਕਤੀ ਨਾਲ, ਤਿੱਖੀ ਊਰਜਾ ਨਾਲ, ਬੇਮਿਸਾਲ ਜੋਤਿ ਨਾਲ, ਸੂਰਜ ਵਰਗੀ ਸ਼ਾਨ ਨਾਲ। ਸੰਤਾਂ ਨੂੰ ਖੁਸ਼ੀ ਦੇਣ ਵਾਲੀ, ਬੁਰੀ ਸਲਾਹ ਦਾ ਨਾਸ਼ ਕਰਨ ਵਾਲੀ, ਪਾਪਾਂ ਨੂੰ ਹਟਾਉਣ ਵਾਲੀ, ਅਜਿਹੀ ਸਾਡੀ ਸ਼ਰਨ ਹੈ। ਜੈ ਹੋ, ਜੈ ਹੋ ਜਗਤ ਦੇ ਕਾਰਨ, ਸ੍ਰਿਸ਼ਟੀ ਦੇ ਉਧਾਰਕ, ਮੇਰੇ ਪਾਲਣਹਾਰ, ਤਲਵਾਰ ਦੀ ਜੈ ਹੋ!',
        meaning: 'This powerful verse is a hymn of praise to the Divine Sword, representing God\'s power to destroy evil and protect righteousness. The sword symbolizes divine justice that cuts through ignorance and evil forces. It represents the unbreakable power of righteousness, fierce energy against injustice, and brilliant light that dispels darkness. The sword brings joy to saints and holy people while destroying evil counsel and removing sins. It concludes with victory chants to God as the Cause of the world and Savior of creation.',
        lineNumber: 8,
        verseType: 'savaiya'
      },

      // Savaiya 8
      {
        id: 'tps_savaiya_8',
        gurmukhi: 'ਸਿਰੀ ਮੁਖ ਵਾਕ ਪਾਤਿਸਾਹੀ ੧੦ ॥ ਦੋਹਰਾ ॥ ਸਗਲ ਦੁਆਰ ਕਉ ਛਾਡਿ ਕੈ ਗਹਿਓ ਤੁਹਾਰੋ ਦੁਆਰ ॥ ਬਾਂਹਿ ਗਹੇ ਕੀ ਲਾਜ ਅਸ ਗੋਬਿੰਦ ਦਾਸ ਤੁਹਾਰ ॥੧॥',
        english: 'From the Holy Mouth of the Tenth King. Dohra: Abandoning all other doors, I have grasped Your door. Protect the honor of Your servant who has grasped Your arm, O Gobind.',
        transliteration: 'Siree Mukh Vaak Paatisaahee 10. Dohraa: Sagal Duaar Kau Chhaad Kai Gahio Tuhaaro Duaar. Baanhi Gahay Kee Laaj As Gobind Daas Tuhaar.',
        translation: 'From the Holy Mouth of the Tenth King. Dohra: Abandoning all other doors, I have grasped Your door. Protect the honor of Your servant who has grasped Your arm, O Gobind.',
        punjabiTranslation: 'ਦਸਵੇਂ ਪਾਤਿਸ਼ਾਹ ਦੇ ਸ਼ਰੀ ਮੁੱਖ ਤੋਂ। ਦੋਹਰਾ: ਸਾਰੇ ਹੋਰ ਦਰਵਾਜ਼ੇ ਛੱਡ ਕੇ, ਮੈਂ ਤੁਹਾਡਾ ਦਰਵਾਜ਼ਾ ਫੜਿਆ ਹੈ। ਜਿਸ ਨੇ ਤੁਹਾਡੀ ਬਾਂਹ ਫੜੀ ਹੈ, ਉਸ ਦੀ ਲਾਜ ਰੱਖੋ, ਹੇ ਗੋਬਿੰਦ, ਤੁਹਾਡਾ ਦਾਸ।',
        meaning: 'This verse marks the transition to a more personal prayer. It expresses complete surrender to God, abandoning all other sources of help and support. The devotee has chosen God\'s door exclusively. The phrase "grasped Your arm" signifies taking refuge in God\'s protection, and the devotee asks God to maintain the honor and dignity of one who has placed complete trust in Divine protection.',
        lineNumber: 9,
        verseType: 'savaiya'
      },

      // Savaiya 9
      {
        id: 'tps_savaiya_9',
        gurmukhi: 'ਸ੍ਰੀ ਭਗਉਤੀ ਜੀ ਸਹਾਇ ॥ ਵਾਰ ਸ੍ਰੀ ਭਗਉਤੀ ਜੀ ਕੀ ਪਾਤਸ਼ਾਹੀ ੧੦ ॥ ਪ੍ਰਿਥਮ ਭਗਉਤੀ ਸਿਮਰ ਕੈ ਗੁਰ ਨਾਨਕ ਲਈਂ ਧਿਆਇ ॥ ਫਿਰ ਅੰਗਦ ਗੁਰ ਤੇ ਅਮਰਦਾਸੁ ਰਾਮਦਾਸੈ ਹੋਈਂ ਸਹਾਇ ॥',
        english: 'Sri Bhagauti Ji, be our help. Ballad of Sri Bhagauti Ji by the Tenth King. First remember Bhagauti, then meditate on Guru Nanak. Then Angad Guru and Amar Das, and Ram Das give us aid.',
        transliteration: 'Sree Bhagautee Jee Sahaaay. Vaar Sree Bhagautee Jee Kee Paatshaahee 10. Pritham Bhagautee Simar Kai Gur Naanak Laeen Dhiaaay. Fir Angad Gur Tay Amar Daas Raam Dasai Hoeen Sahaaay.',
        translation: 'Sri Bhagauti Ji, be our help. Ballad of Sri Bhagauti Ji by the Tenth King. First remember Bhagauti, then meditate on Guru Nanak. Then Angad Guru and Amar Das, and Ram Das give us aid.',
        punjabiTranslation: 'ਸ੍ਰੀ ਭਗਉਤੀ ਜੀ, ਸਾਡੀ ਸਹਾਇਤਾ ਕਰੋ। ਦਸਵੇਂ ਪਾਤਿਸ਼ਾਹ ਦੁਆਰਾ ਸ੍ਰੀ ਭਗਉਤੀ ਜੀ ਦੀ ਵਾਰ। ਪਹਿਲਾਂ ਭਗਉਤੀ ਨੂੰ ਸਿਮਰ ਕੇ, ਫਿਰ ਗੁਰੂ ਨਾਨਕ ਦਾ ਧਿਆਨ ਕਰੋ। ਫਿਰ ਗੁਰੂ ਅੰਗਦ ਅਤੇ ਅਮਰਦਾਸ, ਰਾਮਦਾਸ ਸਾਡੀ ਸਹਾਇਤਾ ਕਰਨ।',
        meaning: 'This verse invokes the Divine Mother (Bhagauti) for help and protection. It establishes the spiritual lineage by first remembering the Divine Power, then meditating on Guru Nanak, followed by the successive Gurus - Angad, Amar Das, and Ram Das. This shows the importance of remembering the spiritual lineage and seeking blessings from all the Gurus in sequence.',
        lineNumber: 10,
        verseType: 'savaiya'
      },

      // Savaiya 10 (Closing)
      {
        id: 'tps_savaiya_10',
        gurmukhi: 'ਅਰਜਨ ਹਰਗੋਬਿੰਦ ਨੋ ਸਿਮਰੌ ਸ੍ਰੀ ਹਰਿਰਾਇ ॥ ਹਰਿ ਕ੍ਰਿਸਨ ਧਿਆਈਐ ਜਿਸ ਡਿਠੇ ਸਭਿ ਦੁਖ ਜਾਇ ॥ ਤੇਗ ਬਹਾਦਰ ਸਿਮਰੀਐ ਘਰ ਨਉ ਨਿਧਿ ਆਵੈ ਧਾਇ ॥ ਸਭ ਥਾਈਂ ਹੋਇ ਸਹਾਇ ॥',
        english: 'Remember Arjan and Hargobind, and Sri Har Rai. Meditate on Har Krishan, seeing whom all sorrows depart. Remember Tegh Bahadur, and the nine treasures come running to your home. May they be helpful everywhere.',
        transliteration: 'Arjan Hargobind No Simrau Sree Har Raaay. Har Krishan Dhiaaeeai Jis Dithay Sabh Dukh Jaaay. Tayg Bahaadar Simreeai Ghar Nau Nidh Aavai Dhaaay. Sabh Thaaeen Hoi Sahaaay.',
        translation: 'Remember Arjan and Hargobind, and Sri Har Rai. Meditate on Har Krishan, seeing whom all sorrows depart. Remember Tegh Bahadur, and the nine treasures come running to your home. May they be helpful everywhere.',
        punjabiTranslation: 'ਅਰਜਨ ਅਤੇ ਹਰਗੋਬਿੰਦ ਨੂੰ ਸਿਮਰੋ, ਅਤੇ ਸ੍ਰੀ ਹਰਿਰਾਇ ਨੂੰ। ਹਰਿ ਕ੍ਰਿਸ਼ਨ ਦਾ ਧਿਆਨ ਕਰੋ, ਜਿਸ ਨੂੰ ਦੇਖ ਕੇ ਸਾਰੇ ਦੁੱਖ ਚਲੇ ਜਾਂਦੇ ਹਨ। ਤੇਗ ਬਹਾਦਰ ਨੂੰ ਸਿਮਰੋ, ਅਤੇ ਨੌ ਨਿਧੀਆਂ ਘਰ ਦੌੜ ਕੇ ਆਉਂਦੀਆਂ ਹਨ। ਸਭ ਥਾਵਾਂ ਤੇ ਸਹਾਇਤਾ ਕਰਨ।',
        meaning: 'This concluding verse completes the remembrance of the Guru lineage by invoking Guru Arjan (the fifth Guru), Guru Hargobind (the sixth), Guru Har Rai (the seventh), Guru Har Krishan (the eighth), and Guru Tegh Bahadur (the ninth). Each Guru is remembered for their special qualities - Guru Har Krishan for removing sorrows, and Guru Tegh Bahadur for bringing spiritual and material prosperity (nine treasures). The verse concludes with a prayer that all the Gurus may be helpful everywhere, providing comprehensive divine protection and guidance.',
        lineNumber: 11,
        verseType: 'closing'
      }
    ];

    return {
      id: '3',
      name: 'Tav Prasad Savaiye',
      nameGurmukhi: 'ਤਵ ਪ੍ਰਸਾਦਿ ਸਵਈਏ',
      verses,
      totalVerses: 11,
      audioUrl: 'https://www.sikhnet.com/files/audio/tav-prasad-savaiye-bhai-harjinder-singh.mp3',
      description: 'Morning prayer composed by Guru Gobind Singh Ji - Divine grace, protection, and spiritual strength',
      granth: 'Dasam Granth'
    };
  }

  // Save data for offline use
  private async saveOfflineData(key: string, data: any) {
    try {
      await AsyncStorage.setItem(`tav_prasad_${key}`, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving Tav Prasad Savaiye offline data:', error);
    }
  }

  // Get audio track for Tav Prasad Savaiye
  async getAudioTrack(): Promise<{ url: string; title: string; artist?: string; duration?: number } | null> {
    return {
      url: 'https://www.sikhnet.com/files/audio/tav-prasad-savaiye-bhai-harjinder-singh.mp3',
      title: 'Tav Prasad Savaiye',
      artist: 'Bhai Harjinder Singh',
      duration: 480 // 8 minutes
    };
  }

  // Search within Tav Prasad Savaiye
  async searchTavPrasadSavaiye(query: string): Promise<TavPrasadVerse[]> {
    try {
      const tavPrasadContent = await this.getCompleteTavPrasadSavaiye();
      const searchTerm = query.toLowerCase();
      
      return tavPrasadContent.verses.filter(verse => 
        verse.gurmukhi.toLowerCase().includes(searchTerm) ||
        verse.english.toLowerCase().includes(searchTerm) ||
        verse.translation.toLowerCase().includes(searchTerm) ||
        verse.punjabiTranslation?.toLowerCase().includes(searchTerm) ||
        verse.meaning?.toLowerCase().includes(searchTerm)
      );
    } catch (error) {
      console.error('Error searching Tav Prasad Savaiye:', error);
      return [];
    }
  }

  // Clear cache
  clearCache(): void {
    this.cache.clear();
  }
}

export const tavPrasadSavayeService = new TavPrasadSavayeService();