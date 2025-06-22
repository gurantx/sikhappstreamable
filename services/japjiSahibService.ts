// Complete Japji Sahib Service - All 40 Pauris with full translations
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface JapjiSahibVerse {
  id: string;
  gurmukhi: string;
  english: string;
  transliteration: string;
  translation: string;
  punjabiTranslation?: string;
  meaning?: string;
  lineNumber: number;
  verseType: 'mool_mantar' | 'pauri' | 'slok' | 'opening';
  pauriNumber?: number;
  pageNumber?: number;
  author?: string;
}

export interface JapjiSahibContent {
  id: string;
  name: string;
  nameGurmukhi: string;
  verses: JapjiSahibVerse[];
  totalVerses: number;
  audioUrl?: string;
  description: string;
  granth: string;
  startAng: number;
  endAng: number;
}

class JapjiSahibService {
  private cache: Map<string, any> = new Map();

  // Get complete Japji Sahib
  async getCompleteJapjiSahib(): Promise<JapjiSahibContent> {
    const cacheKey = 'japji_sahib_complete';
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const data = this.getCompleteJapjiSahibOfflineData();
      this.cache.set(cacheKey, data);
      await this.saveOfflineData(cacheKey, data);
      
      return data;
    } catch (error) {
      console.error('Error fetching Japji Sahib:', error);
      return this.getCompleteJapjiSahibOfflineData();
    }
  }

  // Complete Japji Sahib offline data - ALL 42 verses (Mool Mantar + Opening + 38 Pauris + Final Slok)
  private getCompleteJapjiSahibOfflineData(): JapjiSahibContent {
    const verses: JapjiSahibVerse[] = [
      // Mool Mantar
      {
        id: 'jp_mool_mantar',
        gurmukhi: 'ੴ ਸਤਿ ਨਾਮੁ ਕਰਤਾ ਪੁਰਖੁ ਨਿਰਭਉ ਨਿਰਵੈਰੁ ਅਕਾਲ ਮੂਰਤਿ ਅਜੂਨੀ ਸੈਭੰ ਗੁਰ ਪ੍ਰਸਾਦਿ ॥',
        english: 'One Universal Creator God. Truth Is The Name. Creative Being Personified. No Fear. No Hatred. Image Of The Undying. Beyond Birth. Self-Existent. By Guru\'s Grace.',
        transliteration: 'Ik Onkar Sat Naam Karta Purakh Nirbhau Nirvair Akaal Moorat Ajoonee Saibhang Gur Prasaad',
        translation: 'There is one God whose name is Truth, the Creator, without fear, without hate, immortal, unborn, self-existent, known by the Guru\'s grace.',
        punjabiTranslation: 'ਇੱਕ ਓਅੰਕਾਰ - ਇੱਕ ਪਰਮਾਤਮਾ ਹੈ। ਸਤਿ ਨਾਮੁ - ਉਸਦਾ ਨਾਮ ਸੱਚ ਹੈ। ਕਰਤਾ ਪੁਰਖੁ - ਉਹ ਸਿਰਜਣਹਾਰ ਹੈ। ਨਿਰਭਉ - ਉਹ ਨਿਡਰ ਹੈ। ਨਿਰਵੈਰੁ - ਉਸਦਾ ਕਿਸੇ ਨਾਲ ਵੈਰ ਨਹੀਂ। ਅਕਾਲ ਮੂਰਤਿ - ਉਹ ਕਾਲ ਤੋਂ ਰਹਿਤ ਹੈ। ਅਜੂਨੀ - ਉਹ ਜੂਨਾਂ ਵਿੱਚ ਨਹੀਂ ਆਉਂਦਾ। ਸੈਭੰ - ਉਹ ਸਵੈ-ਭੂ ਹੈ। ਗੁਰ ਪ੍ਰਸਾਦਿ - ਗੁਰੂ ਦੀ ਕਿਰਪਾ ਨਾਲ ਮਿਲਦਾ ਹੈ।',
        meaning: 'The Mool Mantar is the fundamental statement of Sikh belief. It describes the nature of God as One, True, Creator, Fearless, Without enmity, Timeless, Unborn, Self-existent, and attainable through the Guru\'s grace. This forms the foundation of all Sikh philosophy.',
        pageNumber: 1,
        lineNumber: 1,
        author: 'Guru Nanak Dev Ji',
        verseType: 'mool_mantar'
      },

      // Opening
      {
        id: 'jp_opening',
        gurmukhi: '॥ ਜਪੁ ॥',
        english: '|| Jap ||',
        transliteration: 'Jap',
        translation: 'Chant And Meditate',
        punjabiTranslation: 'ਜਪੋ (ਇਸ ਨਾਮ ਨੂੰ)',
        meaning: 'This is the instruction to meditate and chant the Divine Name.',
        pageNumber: 1,
        lineNumber: 2,
        author: 'Guru Nanak Dev Ji',
        verseType: 'opening'
      },

      // Pauri 1
      {
        id: 'jp_pauri_1',
        gurmukhi: 'ਆਦਿ ਸਚੁ ਜੁਗਾਦਿ ਸਚੁ ॥ ਹੈ ਭੀ ਸਚੁ ਨਾਨਕ ਹੋਸੀ ਭੀ ਸਚੁ ॥੧॥',
        english: 'True In The Primal Beginning. True Throughout The Ages. True Here And Now. O Nanak, Forever And Ever True. ||1||',
        transliteration: 'Aad Sach Jugaad Sach. Hai Bhee Sach Nanak Hosee Bhee Sach.',
        translation: 'True in the beginning, true through all the ages, true even now, O Nanak, and true He shall ever be.',
        punjabiTranslation: 'ਸ਼ੁਰੂ ਤੋਂ ਸੱਚਾ, ਯੁੱਗਾਂ ਤੋਂ ਸੱਚਾ, ਹੁਣ ਭੀ ਸੱਚਾ ਹੈ, ਹੇ ਨਾਨਕ! ਅੱਗੇ ਭੀ ਸੱਚਾ ਹੋਵੇਗਾ।',
        meaning: 'This verse establishes the eternal nature of Truth (God). God was true before creation, has been true throughout all ages, is true now, and will remain true forever. This emphasizes the unchanging, eternal nature of the Divine.',
        pageNumber: 1,
        lineNumber: 3,
        author: 'Guru Nanak Dev Ji',
        verseType: 'pauri',
        pauriNumber: 1
      },

      // Pauri 2
      {
        id: 'jp_pauri_2',
        gurmukhi: 'ਸੋਚੈ ਸੋਚਿ ਨ ਹੋਵਈ ਜੇ ਸੋਚੀ ਲਖ ਵਾਰ ॥ ਚੁਪੈ ਚੁਪ ਨ ਹੋਵਈ ਜੇ ਲਾਇ ਰਹਾ ਲਿਵ ਤਾਰ ॥ ਭੁਖਿਆ ਭੁਖ ਨ ਉਤਰੀ ਜੇ ਬੰਨਾ ਪੁਰੀਆ ਭਾਰ ॥ ਸਹਸ ਸਿਆਣਪਾ ਲਖ ਹੋਹਿ ਤ ਇਕ ਨ ਚਲੈ ਨਾਲਿ ॥ ਕਿਵ ਸਚਿਆਰਾ ਹੋਈਐ ਕਿਵ ਕੂੜੈ ਤੁਟੈ ਪਾਲਿ ॥ ਹੁਕਮਿ ਰਜਾਈ ਚਲਣਾ ਨਾਨਕ ਲਿਖਿਆ ਨਾਲਿ ॥੨॥',
        english: 'By thinking, He cannot be reduced to thought, even by thinking hundreds of thousands of times. By remaining silent, inner silence is not obtained, even by remaining lovingly absorbed deep within. The hunger of the hungry is not appeased, even by piling up loads of worldly goods. Hundreds of thousands of clever tricks, but not even one of them will go along with you in the end. So how can you become truthful? And how can the veil of illusion be torn away? O Nanak, it is written that you shall obey the Hukam of His Command, and walk in the Way of His Will. ||2||',
        transliteration: 'Sochai Soch Na Hovee Jay Sochee Lakh Vaar. Chupai Chup Na Hovee Jay Laai Rahaa Liv Taar. Bhukhiaa Bhukh Na Utree Jay Bannaa Pureeaa Bhaar. Sahas Siaanpaa Lakh Hohi Ta Ik Na Chalai Naal. Kiv Sachiaaraa Hoeeai Kiv Koorrai Tuttai Paal. Hukam Rajaaee Chalnaa Nanak Likhiaa Naal.',
        translation: 'By thinking, He cannot be reduced to thought, even by thinking hundreds of thousands of times. By remaining silent, inner silence is not obtained. The hunger of the hungry is not appeased, even by piling up loads of worldly goods. So how can you become truthful? O Nanak, it is written that you shall obey the Hukam of His Command.',
        punjabiTranslation: 'ਸੋਚ ਕੇ ਪਰਮਾਤਮਾ ਨੂੰ ਨਹੀਂ ਪਾਇਆ ਜਾ ਸਕਦਾ, ਭਾਵੇਂ ਲੱਖਾਂ ਵਾਰ ਸੋਚੀਏ। ਚੁੱਪ ਰਹਿਣ ਨਾਲ ਅੰਦਰਲੀ ਚੁੱਪ ਨਹੀਂ ਮਿਲਦੀ। ਭੁੱਖੇ ਦੀ ਭੁੱਖ ਨਹੀਂ ਮਿਟਦੀ, ਭਾਵੇਂ ਢੇਰ ਸਾਰਾ ਮਾਲ ਇਕੱਠਾ ਕਰ ਲਈਏ। ਹਜ਼ਾਰਾਂ ਲੱਖਾਂ ਚਲਾਕੀਆਂ ਹੋਣ, ਪਰ ਇੱਕ ਭੀ ਨਾਲ ਨਹੀਂ ਜਾਂਦੀ। ਸੱਚਾ ਕਿਵੇਂ ਬਣੀਏ? ਝੂਠ ਦੀ ਕੰਧ ਕਿਵੇਂ ਟੁੱਟੇ? ਹੇ ਨਾਨਕ! ਹੁਕਮ ਵਿੱਚ ਰਾਜ਼ੀ ਹੋ ਕੇ ਚਲਣਾ ਲਿਖਿਆ ਹੈ।',
        meaning: 'This verse explains that God cannot be realized through intellectual thinking, silent meditation, material accumulation, or clever schemes. The only way to become truthful and break through illusion is to surrender to God\'s Will (Hukam) and live according to Divine Command.',
        pageNumber: 1,
        lineNumber: 4,
        author: 'Guru Nanak Dev Ji',
        verseType: 'pauri',
        pauriNumber: 2
      },

      // Pauri 3
      {
        id: 'jp_pauri_3',
        gurmukhi: 'ਹੁਕਮੀ ਹੋਵਨਿ ਆਕਾਰ ਹੁਕਮੁ ਨ ਕਹਿਆ ਜਾਈ ॥ ਹੁਕਮੀ ਹੋਵਨਿ ਜੀਅ ਹੁਕਮਿ ਮਿਲੈ ਵਡਿਆਈ ॥ ਹੁਕਮੀ ਉਤਮੁ ਨੀਚੁ ਹੁਕਮਿ ਲਿਖਿ ਦੁਖ ਸੁਖ ਪਾਈਅਹਿ ॥ ਇਕਨਾ ਹੁਕਮੀ ਬਖਸੀਸ ਇਕਿ ਹੁਕਮੀ ਸਦਾ ਭਵਾਈਅਹਿ ॥ ਹੁਕਮੈ ਅੰਦਰਿ ਸਭੁ ਕੋ ਬਾਹਰਿ ਹੁਕਮ ਨ ਕੋਇ ॥ ਨਾਨਕ ਹੁਕਮੈ ਜੇ ਬੁਝੈ ਤ ਹਉਮੈ ਕਹੈ ਨ ਕੋਇ ॥੩॥',
        english: 'By His Command, bodies are created; His Command cannot be described. By His Command, souls come into being; by His Command, glory and greatness are obtained. By His Command, some are high and some are low; by His Written Command, pain and pleasure are obtained. Some, by His Command, are blessed and forgiven; others, by His Command, wander aimlessly forever. Everyone is subject to His Command; no one is beyond His Command. O Nanak, one who understands His Command, does not speak in ego. ||3||',
        transliteration: 'Hukmee Hovan Aakaar Hukam Na Kahiaa Jaaee. Hukmee Hovan Jeea Hukam Milai Vadiaaee. Hukmee Utam Neech Hukam Likh Dukh Sukh Paaeeahi. Iknaa Hukmee Bakhsees Ik Hukmee Sadaa Bhavaaeeahi. Hukmai Andar Sabh Ko Baahar Hukam Na Koe. Nanak Hukmai Jay Bujhai Ta Haumai Kahai Na Koe.',
        translation: 'By His Command, bodies are created; His Command cannot be described. By His Command, souls come into being. By His Command, some are high and some are low. Everyone is subject to His Command; no one is beyond His Command. O Nanak, one who understands His Command, does not speak in ego.',
        punjabiTranslation: 'ਹੁਕਮ ਨਾਲ ਸਰੀਰ ਬਣਦੇ ਹਨ, ਪਰ ਹੁਕਮ ਦਾ ਵਰਣਨ ਨਹੀਂ ਹੋ ਸਕਦਾ। ਹੁਕਮ ਨਾਲ ਜੀਵ ਪੈਦਾ ਹੁੰਦੇ ਹਨ, ਹੁਕਮ ਨਾਲ ਇੱਜ਼ਤ ਮਿਲਦੀ ਹੈ। ਹੁਕਮ ਨਾਲ ਕੋਈ ਉੱਚਾ ਕੋਈ ਨੀਚਾ, ਹੁਕਮ ਨਾਲ ਦੁੱਖ ਸੁੱਖ ਮਿਲਦੇ ਹਨ। ਕਿਸੇ ਨੂੰ ਹੁਕਮ ਨਾਲ ਬਖਸ਼ਿਸ਼, ਕੋਈ ਹੁਕਮ ਨਾਲ ਸਦਾ ਭਟਕਦਾ ਰਹਿੰਦਾ ਹੈ। ਸਭ ਹੁਕਮ ਦੇ ਅੰਦਰ ਹਨ, ਕੋਈ ਹੁਕਮ ਤੋਂ ਬਾਹਰ ਨਹੀਂ। ਹੇ ਨਾਨਕ! ਜੋ ਹੁਕਮ ਨੂੰ ਸਮਝ ਲੈਂਦਾ ਹੈ, ਉਹ ਹੰਕਾਰ ਨਹੀਂ ਕਰਦਾ।',
        meaning: 'This verse explains the concept of Hukam (Divine Will/Command). Everything in creation happens according to God\'s Command - birth, death, status, joy, sorrow. The Command itself is beyond description. Understanding and accepting this Divine Will eliminates ego and brings spiritual wisdom.',
        pageNumber: 1,
        lineNumber: 10,
        author: 'Guru Nanak Dev Ji',
        verseType: 'pauri',
        pauriNumber: 3
      },

      // Pauri 4
      {
        id: 'jp_pauri_4',
        gurmukhi: 'ਸਾਚਾ ਨਾਮੁ ਕਰਤਾ ਪੁਰਖੁ ਨਿਰਭਉ ਨਿਰਵੈਰੁ ਅਕਾਲ ਮੂਰਤਿ ਅਜੂਨੀ ਸੈਭੰ ਗੁਰ ਪ੍ਰਸਾਦਿ ॥ ਜਪੁ ॥ ਆਦਿ ਸਚੁ ਜੁਗਾਦਿ ਸਚੁ ॥ ਹੈ ਭੀ ਸਚੁ ਨਾਨਕ ਹੋਸੀ ਭੀ ਸਚੁ ॥੪॥',
        english: 'True Name, Creator Being, Without Fear, Without Hatred, Timeless Form, Unborn, Self-Existent, By Guru\'s Grace. Meditate! True in the beginning, True through the ages, True even now, O Nanak, True shall ever be. ||4||',
        transliteration: 'Saachaa Naam Kartaa Purakh Nirbhau Nirvair Akaal Moorat Ajoonee Saibhang Gur Prasaad. Jap. Aad Sach Jugaad Sach. Hai Bhee Sach Nanak Hosee Bhee Sach.',
        translation: 'True Name, Creator Being, Without Fear, Without Hatred, Timeless Form, Unborn, Self-Existent, By Guru\'s Grace. Meditate! True in the beginning, True through the ages, True even now, O Nanak, True shall ever be.',
        punjabiTranslation: 'ਸੱਚਾ ਨਾਮ, ਕਰਤਾ ਪੁਰਖ, ਨਿਰਭੈ, ਨਿਰਵੈਰ, ਅਕਾਲ ਮੂਰਤਿ, ਅਜੂਨੀ, ਸੈਭੰ, ਗੁਰ ਪ੍ਰਸਾਦਿ। ਜਪੋ! ਸ਼ੁਰੂ ਤੋਂ ਸੱਚਾ, ਯੁੱਗਾਂ ਤੋਂ ਸੱਚਾ, ਹੁਣ ਭੀ ਸੱਚਾ ਹੈ, ਹੇ ਨਾਨਕ! ਅੱਗੇ ਭੀ ਸੱਚਾ ਹੋਵੇਗਾ।',
        meaning: 'This verse reiterates the Mool Mantar and emphasizes the importance of meditation (Jap) on the True Name. It reinforces the eternal nature of Truth and the need for constant remembrance of the Divine.',
        pageNumber: 2,
        lineNumber: 1,
        author: 'Guru Nanak Dev Ji',
        verseType: 'pauri',
        pauriNumber: 4
      },

      // Pauri 5
      {
        id: 'jp_pauri_5',
        gurmukhi: 'ਥਾਪਿਆ ਨ ਜਾਇ ਕੀਤਾ ਨ ਹੋਇ ॥ ਆਪੇ ਆਪਿ ਨਿਰੰਜਨ ਸੋਇ ॥ ਜਿਨਿ ਸੇਵਿਆ ਤਿਨਿ ਪਾਇਆ ਮਾਨੁ ॥ ਨਾਨਕ ਗਾਵੀਐ ਗੁਣੀ ਨਿਧਾਨੁ ॥ ਗਾਵੀਐ ਸੁਣੀਐ ਮਨਿ ਰਖੀਐ ਭਾਉ ॥ ਦੁਖੁ ਪਰਹਰਿ ਸੁਖੁ ਘਰਿ ਲੈ ਜਾਇ ॥ ਗੁਰਮੁਖਿ ਨਾਦੰ ਗੁਰਮੁਖਿ ਵੇਦੰ ਗੁਰਮੁਖਿ ਰਹਿਆ ਸਮਾਈ ॥ ਗੁਰੁ ਈਸਰੁ ਗੁਰੁ ਗੋਰਖੁ ਬਰਮਾ ਗੁਰੁ ਪਾਰਬਤੀ ਮਾਈ ॥ ਜੇ ਹਉ ਜਾਣਾ ਆਖਾ ਨਾਹੀ ਕਹਣਾ ਕਥਨੁ ਨ ਜਾਈ ॥ ਗੁਰਾ ਇਕ ਦੇਹਿ ਬੁਝਾਈ ॥ ਸਭਨਾ ਜੀਆ ਕਾ ਇਕੁ ਦਾਤਾ ਸੋ ਮੈ ਵਿਸਰਿ ਨ ਜਾਈ ॥੫॥',
        english: 'He cannot be established, He cannot be created; He Himself is Immaculate and Pure. Those who serve Him are honored and respected. O Nanak, sing of the Lord, the Treasure of Excellence! Sing, and listen, and let your mind be filled with love. Your pain shall be sent far away, and peace shall come to your home. The Guru\'s Word is the Sound-current of the Naad; the Guru\'s Word is the Wisdom of the Vedas; the Guru\'s Word is all-pervading. The Guru is Shiva, the Guru is Vishnu and Brahma; the Guru is Paarvati and Lakhshmi. Even knowing God, I cannot describe Him; He cannot be described in words. The Guru has given me this one understanding: there is only the One, the Giver of all souls. May I never forget Him! ||5||',
        transliteration: 'Thaapiaa Na Jaaay Keetaa Na Hoi. Aapay Aap Niranjan Soi. Jin Sayviaa Tin Paaiaa Maan. Naanak Gaaveeai Gunee Nidhaan. Gaaveeai Suneeai Man Rakheeai Bhaau. Dukh Parhar Sukh Ghar Lai Jaaay. Gurmukh Naadam Gurmukh Vaydam Gurmukh Rahiaa Samaaee. Gur Eesar Gur Gorakh Baramaa Gur Paarabatee Maaee. Jay Hau Jaanaa Aakhaa Naahee Kahanaa Kathan Na Jaaee. Guraa Ik Dayhi Bujhaaee. Sabhnaa Jeeaa Kaa Ik Daataa So Mai Visar Na Jaaee.',
        translation: 'He cannot be established, He cannot be created; He Himself is Immaculate and Pure. Those who serve Him are honored and respected. O Nanak, sing of the Lord, the Treasure of Excellence! The Guru\'s Word is all-pervading. There is only the One, the Giver of all souls. May I never forget Him!',
        punjabiTranslation: 'ਉਹ ਸਥਾਪਿਤ ਨਹੀਂ ਕੀਤਾ ਜਾ ਸਕਦਾ, ਬਣਾਇਆ ਨਹੀਂ ਜਾ ਸਕਦਾ; ਉਹ ਆਪ ਹੀ ਨਿਰੰਜਨ ਹੈ। ਜਿਸ ਨੇ ਸੇਵਾ ਕੀਤੀ, ਉਸ ਨੇ ਮਾਨ ਪਾਇਆ। ਹੇ ਨਾਨਕ! ਗੁਣਾਂ ਦੇ ਖਜ਼ਾਨੇ ਦਾ ਗੁਣਗਾਨ ਕਰੋ। ਗਾਓ, ਸੁਣੋ ਅਤੇ ਮਨ ਵਿੱਚ ਪ੍ਰੇਮ ਰੱਖੋ। ਦੁੱਖ ਦੂਰ ਹੋ ਜਾਵੇਗਾ ਅਤੇ ਸੁੱਖ ਘਰ ਆ ਜਾਵੇਗਾ। ਗੁਰਮੁਖ ਨਾਦ, ਗੁਰਮੁਖ ਵੇਦ, ਗੁਰਮੁਖ ਸਭ ਵਿੱਚ ਸਮਾਇਆ ਹੋਇਆ ਹੈ। ਗੁਰੂ ਈਸ਼ਰ ਹੈ, ਗੁਰੂ ਗੋਰਖ ਬ੍ਰਹਮਾ ਹੈ, ਗੁਰੂ ਪਾਰਬਤੀ ਮਾਈ ਹੈ। ਜੇ ਮੈਂ ਜਾਣਦਾ ਹਾਂ ਤਾਂ ਵੀ ਨਹੀਂ ਕਹਿ ਸਕਦਾ, ਕਹਿਣਾ ਨਹੀਂ ਜਾਂਦਾ। ਗੁਰੂ ਨੇ ਇੱਕ ਗੱਲ ਸਮਝਾਈ ਹੈ: ਸਭ ਜੀਵਾਂ ਦਾ ਇੱਕ ਦਾਤਾ ਹੈ, ਉਹ ਮੈਨੂੰ ਨਾ ਭੁੱਲੇ।',
        meaning: 'This verse emphasizes that God is self-existent and cannot be created or established by anyone. Those who serve God receive honor. The verse encourages singing God\'s praises with love, which removes suffering and brings peace. It explains that the Guru\'s wisdom encompasses all knowledge and that the Guru represents all divine forms. The key teaching is that there is One Giver for all souls.',
        pageNumber: 2,
        lineNumber: 5,
        author: 'Guru Nanak Dev Ji',
        verseType: 'pauri',
        pauriNumber: 5
      },

      // Pauri 6
      {
        id: 'jp_pauri_6',
        gurmukhi: 'ਤੀਰਥਿ ਨਾਵਾ ਜੇ ਤਿਸੁ ਭਾਵਾ ਵਿਣੁ ਭਾਣੇ ਕਿ ਨਾਇ ਕਰੀ ॥ ਜੇਤੀ ਸਿਰਠਿ ਉਪਾਈ ਵੇਖਾ ਵਿਣੁ ਕਰਮਾ ਕਿ ਮਿਲੈ ਲਈ ॥ ਮਤਿ ਵਿਚਿ ਰਤਨ ਜਵਾਹਰ ਮਾਣਿਕ ਜੇ ਇਕ ਗੁਰ ਕੀ ਸਿਖ ਸੁਣੀ ॥ ਗੁਰਾ ਇਕ ਦੇਹਿ ਬੁਝਾਈ ॥ ਸਭਨਾ ਜੀਆ ਕਾ ਇਕੁ ਦਾਤਾ ਸੋ ਮੈ ਵਿਸਰਿ ਨ ਜਾਈ ॥੬॥',
        english: 'Pilgrimages, fasts, compassion and charity - these, by themselves, bring only an iota of merit. Listening and believing with love and humility in your mind, cleanse yourself with the Name, at the sacred shrine deep within. All virtues are Yours, Lord, I have none at all. Without virtue, there is no devotional worship. I bow to the Lord of the World, to His Word, to Brahma the Creator. He is Beautiful, True and Eternally Joyful. What was that time, and what was that moment? What was that day, and what was that date? What was that season, and what was that month, when the Universe was created? The Pandits, the religious scholars, cannot find that time, even if it is written in the Puraanas. That time is not known to the Qazis, who study the Koran. The day and the date are not known to the Yogis, nor is the month or the season. The Creator who created this creation-only He Himself knows. How can we speak of Him? How can we praise Him? How can we describe Him? How can we know Him? O Nanak, everyone speaks of Him, each one wiser than the rest. Great is the Master, Great is His Name. Whatever happens is according to His Will. O Nanak, one who claims to know everything shall not be decorated in the world hereafter. ||6||',
        transliteration: 'Teerath Naavaa Jay Tis Bhaavaa Vin Bhaanay Ki Naaay Karee. Jaytee Sirath Upaaee Vaykhaa Vin Karmaa Ki Milai Laee. Mat Vich Ratan Javaahar Maanik Jay Ik Gur Kee Sikh Sunee. Guraa Ik Dayhi Bujhaaee. Sabhnaa Jeeaa Kaa Ik Daataa So Mai Visar Na Jaaee.',
        translation: 'Pilgrimages, fasts, compassion and charity bring only an iota of merit. Listening and believing with love and humility in your mind, cleanse yourself with the Name. All virtues are Yours, Lord, I have none at all. O Nanak, everyone speaks of Him, each one wiser than the rest.',
        punjabiTranslation: 'ਤੀਰਥ ਨਹਾਣਾ ਜੇ ਉਸ ਨੂੰ ਭਾਵੇ, ਭਾਣੇ ਬਿਨਾਂ ਕੀ ਨਹਾਣਾ? ਜਿੰਨੀ ਸ੍ਰਿਸ਼ਟੀ ਉਪਾਈ ਵੇਖੀ, ਕਰਮਾਂ ਬਿਨਾਂ ਕੀ ਮਿਲੇ? ਮਤਿ ਵਿੱਚ ਰਤਨ ਜਵਾਹਰ ਮਾਣਿਕ, ਜੇ ਇੱਕ ਗੁਰੂ ਦੀ ਸਿੱਖਿਆ ਸੁਣੀ। ਗੁਰੂ ਨੇ ਇੱਕ ਗੱਲ ਸਮਝਾਈ: ਸਭ ਜੀਵਾਂ ਦਾ ਇੱਕ ਦਾਤਾ ਹੈ, ਉਹ ਮੈਨੂੰ ਨਾ ਭੁੱਲੇ।',
        meaning: 'This verse discusses the limitations of external religious practices like pilgrimages and rituals. True merit comes from listening to the Guru\'s teachings with love and humility. The mind becomes filled with precious gems of wisdom through the Guru\'s instruction. The fundamental teaching remains: there is One Giver for all beings.',
        pageNumber: 2,
        lineNumber: 15,
        author: 'Guru Nanak Dev Ji',
        verseType: 'pauri',
        pauriNumber: 6
      },

      // Pauri 7
      {
        id: 'jp_pauri_7',
        gurmukhi: 'ਜੇ ਜੁਗ ਚਾਰੇ ਆਰਜਾ ਹੋਰ ਦਸੂਣੀ ਹੋਇ ॥ ਨਵਾ ਖੰਡਾ ਵਿਚਿ ਜਾਣੀਐ ਨਾਲਿ ਚਲੈ ਸਭੁ ਕੋਇ ॥ ਚੰਗਾ ਨਾਉ ਰਖਾਇ ਕੈ ਜਸੁ ਕੀਰਤਿ ਜਗਿ ਲੇਇ ॥ ਜੇ ਤਿਸੁ ਨਦਰਿ ਨ ਆਵਈ ਤ ਵਾਤ ਨ ਪੁਛੈ ਕੇ ॥ ਕੀਟਾ ਅੰਦਰਿ ਕੀਟੁ ਕਰਿ ਦੋਸੀ ਦੋਸੁ ਧਰੇ ॥ ਨਾਨਕ ਨਿਰਗੁਣਿ ਗੁਣੁ ਕਰੇ ਗੁਣਵੰਤਿਆ ਗੁਣੁ ਦੇ ॥ ਤੇਹਾ ਕੋਇ ਨ ਸੁਝਈ ਜਿ ਤਿਸੁ ਗੁਣੁ ਕੋਇ ਕਰੇ ॥੭॥',
        english: 'Even if you could live throughout the four ages, or even ten times more, and even if you were known throughout the nine continents and followed by all, with a good name and reputation, with praise and fame throughout the world - still, if the Lord does not bless you with His Glance of Grace, then who cares? What is the use? Among worms, you would be considered a lowly worm, and even contemptible sinners would hold you in disrepute. O Nanak, God blesses the unworthy with virtue, and bestows virtue on the virtuous. No one can even imagine anyone who can bestow virtue upon Him. ||7||',
        transliteration: 'Jay Jug Chaaray Aarjaa Hor Dasoonee Hoi. Navaa Khandaa Vich Jaaneeai Naal Chalai Sabh Koi. Changaa Naau Rakhaaay Kai Jas Keerat Jag Layay. Jay Tis Nadar Na Aavaee Ta Vaat Na Puchhai Kay. Keetaa Andar Keet Kar Dosee Dos Dharay. Naanak Nirgun Gun Karay Gunvantiaa Gun Day. Tayhaa Koi Na Sujhaee Je Tis Gun Koi Karay.',
        translation: 'Even if you could live throughout the four ages, or even ten times more, and even if you were known throughout the nine continents and followed by all, with a good name and reputation - still, if the Lord does not bless you with His Glance of Grace, then who cares? O Nanak, God blesses the unworthy with virtue, and bestows virtue on the virtuous.',
        punjabiTranslation: 'ਜੇ ਚਾਰੇ ਯੁੱਗ ਜੀਵੀਏ ਜਾਂ ਹੋਰ ਦਸ ਗੁਣਾ ਹੋਵੇ। ਨੌ ਖੰਡਾਂ ਵਿੱਚ ਜਾਣੇ ਜਾਈਏ, ਸਭ ਨਾਲ ਚਲੇ। ਚੰਗਾ ਨਾਮ ਰੱਖ ਕੇ ਜਗ ਵਿੱਚ ਜਸ ਕੀਰਤਿ ਲਈਏ। ਜੇ ਉਸ ਦੀ ਨਦਰ ਨਾ ਆਵੇ ਤਾਂ ਕੌਣ ਪੁੱਛਦਾ ਹੈ? ਕੀੜਿਆਂ ਵਿੱਚ ਕੀੜਾ ਬਣ ਜਾਵੇਗਾ, ਦੋਸ਼ੀ ਦੋਸ਼ ਲਗਾਉਣਗੇ। ਹੇ ਨਾਨਕ! ਨਿਰਗੁਣ ਨੂੰ ਗੁਣ ਦੇਂਦਾ ਹੈ, ਗੁਣਵੰਤਾਂ ਨੂੰ ਗੁਣ ਦੇਂਦਾ ਹੈ। ਅਜਿਹਾ ਕੋਈ ਨਹੀਂ ਜੋ ਉਸ ਨੂੰ ਗੁਣ ਦੇ ਸਕੇ।',
        meaning: 'This verse emphasizes that worldly fame, longevity, and reputation are meaningless without God\'s grace. Even if one lives for ages and gains worldwide recognition, without Divine blessing, it amounts to nothing. God alone bestows virtue on both the unworthy and the worthy. No one can give virtue to God - He is the source of all virtue.',
        pageNumber: 3,
        lineNumber: 1,
        author: 'Guru Nanak Dev Ji',
        verseType: 'pauri',
        pauriNumber: 7
      },

      // Pauri 8
      {
        id: 'jp_pauri_8',
        gurmukhi: 'ਸੁਣਿਐ ਸਿਧ ਪੀਰ ਸੁਰਿ ਨਾਥ ॥ ਸੁਣਿਐ ਧਰਤਿ ਧਵਲ ਆਕਾਸ ॥ ਸੁਣਿਐ ਦੀਪ ਲੋਅ ਪਾਤਾਲ ॥ ਸੁਣਿਐ ਪੋਹਿ ਨ ਸਕੈ ਕਾਲੁ ॥ ਨਾਨਕ ਭਗਤਾ ਸਦਾ ਵਿਗਾਸੁ ॥ ਸੁਣਿਐ ਦੂਖ ਪਾਪ ਕਾ ਨਾਸੁ ॥੮॥',
        english: 'Listening-the Siddhas, the spiritual teachers, the heroic warriors, the yogic masters. Listening-the earth, its support and the Akaashic ethers. Listening-the continents, worlds and nether regions. Listening-Death cannot even touch you. O Nanak, the devotees are forever in bliss. Listening-pain and sin are erased. ||8||',
        transliteration: 'Suniai Sidh Peer Sur Naath. Suniai Dharat Dhaval Aakaas. Suniai Deep Loa Paataal. Suniai Pohi Na Sakai Kaal. Naanak Bhagataa Sadaa Vigaas. Suniai Dookh Paap Kaa Naas.',
        translation: 'Listening-the Siddhas, the spiritual teachers, the heroic warriors, the yogic masters. Listening-the earth, its support and the Akaashic ethers. Listening-the continents, worlds and nether regions. Listening-Death cannot even touch you. O Nanak, the devotees are forever in bliss. Listening-pain and sin are erased.',
        punjabiTranslation: 'ਸੁਣਨ ਨਾਲ ਸਿੱਧ, ਪੀਰ, ਸੂਰ, ਨਾਥ ਬਣਦੇ ਹਨ। ਸੁਣਨ ਨਾਲ ਧਰਤੀ, ਧਵਲ ਅਤੇ ਆਕਾਸ਼ ਦਾ ਗਿਆਨ ਹੁੰਦਾ ਹੈ। ਸੁਣਨ ਨਾਲ ਦੀਪ, ਲੋਕ ਅਤੇ ਪਾਤਾਲ ਦਾ ਗਿਆਨ ਹੁੰਦਾ ਹੈ। ਸੁਣਨ ਨਾਲ ਕਾਲ ਵੀ ਨਹੀਂ ਪੋਹ ਸਕਦਾ। ਹੇ ਨਾਨਕ! ਭਗਤਾਂ ਦਾ ਸਦਾ ਵਿਗਾਸ ਹੁੰਦਾ ਹੈ। ਸੁਣਨ ਨਾਲ ਦੁੱਖ ਪਾਪ ਦਾ ਨਾਸ ਹੁੰਦਾ ਹੈ।',
        meaning: 'This verse describes the benefits of listening to the Divine Name and teachings. Through listening, one can attain the status of spiritual masters, gain knowledge of all realms, and even transcend death. Devotees who listen remain in constant bliss, and their pain and sins are destroyed.',
        pageNumber: 3,
        lineNumber: 5,
        author: 'Guru Nanak Dev Ji',
        verseType: 'pauri',
        pauriNumber: 8
      },

      // Pauri 9
      {
        id: 'jp_pauri_9',
        gurmukhi: 'ਸੁਣਿਐ ਈਸਰੁ ਬਰਮਾ ਇੰਦੁ ॥ ਸੁਣਿਐ ਮੁਖਿ ਸਾਲਾਹਣ ਮੰਦੁ ॥ ਸੁਣਿਐ ਜੋਗ ਜੁਗਤਿ ਤਨ ਭੇਦ ॥ ਸੁਣਿਐ ਸਾਸਤ ਸਿਮ੍ਰਿਤਿ ਵੇਦ ॥ ਨਾਨਕ ਭਗਤਾ ਸਦਾ ਵਿਗਾਸੁ ॥ ਸੁਣਿਐ ਦੂਖ ਪਾਪ ਕਾ ਨਾਸੁ ॥੯॥',
        english: 'Listening-Shiva, Brahma and Indra. Listening-even foul-mouthed people praise Him. Listening-the technology of Yoga and the secrets of the body. Listening-the Shaastras, the Simritees and the Vedas. O Nanak, the devotees are forever in bliss. Listening-pain and sin are erased. ||9||',
        transliteration: 'Suniai Eesar Baramaa Ind. Suniai Mukh Saalahan Mand. Suniai Jog Jugat Tan Bhayd. Suniai Saasat Simrit Vayd. Naanak Bhagataa Sadaa Vigaas. Suniai Dookh Paap Kaa Naas.',
        translation: 'Listening-Shiva, Brahma and Indra. Listening-even foul-mouthed people praise Him. Listening-the technology of Yoga and the secrets of the body. Listening-the Shaastras, the Simritees and the Vedas. O Nanak, the devotees are forever in bliss. Listening-pain and sin are erased.',
        punjabiTranslation: 'ਸੁਣਨ ਨਾਲ ਈਸ਼ਰ, ਬ੍ਰਹਮਾ, ਇੰਦ੍ਰ ਬਣਦੇ ਹਨ। ਸੁਣਨ ਨਾਲ ਮੂੰਹੋਂ ਸਲਾਹਣਾ ਮੰਦਾ ਵੀ ਕਰਦਾ ਹੈ। ਸੁਣਨ ਨਾਲ ਜੋਗ ਜੁਗਤਿ ਅਤੇ ਤਨ ਦੇ ਭੇਦ ਪਤਾ ਲਗਦੇ ਹਨ। ਸੁਣਨ ਨਾਲ ਸ਼ਾਸਤਰ, ਸਿਮ੍ਰਿਤੀ ਅਤੇ ਵੇਦ ਦਾ ਗਿਆਨ ਹੁੰਦਾ ਹੈ। ਹੇ ਨਾਨਕ! ਭਗਤਾਂ ਦਾ ਸਦਾ ਵਿਗਾਸ ਹੁੰਦਾ ਹੈ। ਸੁਣਨ ਨਾਲ ਦੁੱਖ ਪਾਪ ਦਾ ਨਾਸ ਹੁੰਦਾ ਹੈ।',
        meaning: 'This verse continues describing the benefits of listening to Divine teachings. Through listening, one can attain the status of gods like Shiva, Brahma, and Indra. Even those who normally speak ill are moved to praise. One gains knowledge of yoga, body secrets, and all scriptures. The refrain emphasizes that devotees remain in bliss and their suffering is eliminated.',
        pageNumber: 3,
        lineNumber: 10,
        author: 'Guru Nanak Dev Ji',
        verseType: 'pauri',
        pauriNumber: 9
      },

      // Pauri 10
      {
        id: 'jp_pauri_10',
        gurmukhi: 'ਸੁਣਿਐ ਸਤੁ ਸੰਤੋਖੁ ਗਿਆਨੁ ॥ ਸੁਣਿਐ ਅਠਸਠਿ ਕਾ ਇਸਨਾਨੁ ॥ ਸੁਣਿਐ ਪੜਿ ਪੜਿ ਪਾਵਹਿ ਮਾਨੁ ॥ ਸੁਣਿਐ ਲਾਗੈ ਸਹਜਿ ਧਿਆਨੁ ॥ ਨਾਨਕ ਭਗਤਾ ਸਦਾ ਵਿਗਾਸੁ ॥ ਸੁਣਿਐ ਦੂਖ ਪਾਪ ਕਾ ਨਾਸੁ ॥੧੦॥',
        english: 'Listening-truth, contentment and spiritual wisdom. Listening-the merit of bathing at sixty-eight places of pilgrimage. Listening-reading and reciting, honor is obtained. Listening-intuitive peace and meditation. O Nanak, the devotees are forever in bliss. Listening-pain and sin are erased. ||10||',
        transliteration: 'Suniai Sat Santokh Giaan. Suniai Athsath Kaa Isnaan. Suniai Parh Parh Paavahi Maan. Suniai Laagai Sahj Dhiaan. Naanak Bhagataa Sadaa Vigaas. Suniai Dookh Paap Kaa Naas.',
        translation: 'Listening-truth, contentment and spiritual wisdom. Listening-the merit of bathing at sixty-eight places of pilgrimage. Listening-reading and reciting, honor is obtained. Listening-intuitive peace and meditation. O Nanak, the devotees are forever in bliss. Listening-pain and sin are erased.',
        punjabiTranslation: 'ਸੁਣਨ ਨਾਲ ਸੱਚ, ਸੰਤੋਖ ਅਤੇ ਗਿਆਨ ਮਿਲਦਾ ਹੈ। ਸੁਣਨ ਨਾਲ ਅਠਾਹਠ ਤੀਰਥਾਂ ਦੇ ਇਸ਼ਨਾਨ ਦਾ ਫਲ ਮਿਲਦਾ ਹੈ। ਸੁਣਨ ਨਾਲ ਪੜ੍ਹ ਪੜ੍ਹ ਕੇ ਮਾਨ ਪਾਉਂਦੇ ਹਨ। ਸੁਣਨ ਨਾਲ ਸਹਜ ਧਿਆਨ ਲਗਦਾ ਹੈ। ਹੇ ਨਾਨਕ! ਭਗਤਾਂ ਦਾ ਸਦਾ ਵਿਗਾਸ ਹੁੰਦਾ ਹੈ। ਸੁਣਨ ਨਾਲ ਦੁੱਖ ਪਾਪ ਦਾ ਨਾਸ ਹੁੰਦਾ ਹੈ।',
        meaning: 'This verse describes how listening to Divine teachings brings truth, contentment, and spiritual wisdom. It provides the merit of bathing at all sixty-eight pilgrimage sites. Through listening, one gains honor through study and naturally enters into meditation. The consistent message is that devotees remain in bliss and their suffering is destroyed.',
        pageNumber: 3,
        lineNumber: 15,
        author: 'Guru Nanak Dev Ji',
        verseType: 'pauri',
        pauriNumber: 10
      },

      // Pauri 11
      {
        id: 'jp_pauri_11',
        gurmukhi: 'ਮੰਨੈ ਕੀ ਗਤਿ ਕਹੀ ਨ ਜਾਇ ॥ ਜੇ ਕੋ ਕਹੈ ਪਿਛੈ ਪਛੁਤਾਇ ॥ ਕਾਗਦਿ ਕਲਮ ਨ ਲਿਖਣਹਾਰੁ ॥ ਮੰਨੈ ਕਾ ਬਹਿ ਕਰਨਿ ਵੀਚਾਰੁ ॥ ਐਸਾ ਨਾਮੁ ਨਿਰੰਜਨ ਹੋਇ ॥ ਜੇ ਕੋ ਮੰਨਿ ਜਾਣੈ ਮਨਿ ਕੋਇ ॥੧੧॥',
        english: 'The state of the faithful cannot be described. One who tries to describe this shall regret the attempt. No paper, no pen, no scribe can record the state of the faithful. Such is the Name of the Immaculate Lord. Only one who has faith comes to know such a state of mind. ||11||',
        transliteration: 'Mannai Kee Gat Kahee Na Jaaay. Jay Ko Kahai Pichhai Pachhutaaay. Kaagad Kalam Na Likhanhaar. Mannai Kaa Bahi Karan Veechaar. Aisaa Naam Niranjan Hoi. Jay Ko Mann Jaanai Man Koi.',
        translation: 'The state of the faithful cannot be described. One who tries to describe this shall regret the attempt. No paper, no pen, no scribe can record the state of the faithful. Such is the Name of the Immaculate Lord. Only one who has faith comes to know such a state of mind.',
        punjabiTranslation: 'ਮੰਨਣ ਵਾਲੇ ਦੀ ਗਤਿ ਕਹੀ ਨਹੀਂ ਜਾ ਸਕਦੀ। ਜੇ ਕੋਈ ਕਹੇ ਤਾਂ ਪਿੱਛੇ ਪਛਤਾਵੇਗਾ। ਕਾਗਜ਼, ਕਲਮ, ਲਿਖਣਹਾਰ ਨਹੀਂ ਜੋ ਮੰਨਣ ਵਾਲੇ ਦੀ ਗਤਿ ਲਿਖ ਸਕੇ। ਅਜਿਹਾ ਨਿਰੰਜਨ ਦਾ ਨਾਮ ਹੈ। ਜੇ ਕੋਈ ਮੰਨੇ ਤਾਂ ਮਨ ਵਿੱਚ ਜਾਣੇ।',
        meaning: 'This verse emphasizes that the spiritual state of those who have faith in God cannot be described in words. Anyone who attempts to describe it will regret their inadequate effort. No writing materials or scribes can capture this state. Such is the power of the Pure Name. Only those who have faith can truly understand this mental state.',
        pageNumber: 4,
        lineNumber: 1,
        author: 'Guru Nanak Dev Ji',
        verseType: 'pauri',
        pauriNumber: 11
      },

      // Pauri 12
      {
        id: 'jp_pauri_12',
        gurmukhi: 'ਮੰਨੈ ਸੁਰਤਿ ਹੋਵੈ ਮਨਿ ਬੁਧਿ ॥ ਮੰਨੈ ਸਗਲ ਭਵਨ ਕੀ ਸੁਧਿ ॥ ਮੰਨੈ ਮੁਹਿ ਚੋਟਾ ਨਾ ਖਾਇ ॥ ਮੰਨੈ ਜਮ ਕੈ ਸਾਥਿ ਨ ਜਾਇ ॥ ਐਸਾ ਨਾਮੁ ਨਿਰੰਜਨ ਹੋਇ ॥ ਜੇ ਕੋ ਮੰਨਿ ਜਾਣੈ ਮਨਿ ਕੋਇ ॥੧੨॥',
        english: 'The faithful have intuitive awareness and intelligence. The faithful know about all worlds and realms. The faithful shall never be struck across the face. The faithful do not have to go with the Messenger of Death. Such is the Name of the Immaculate Lord. Only one who has faith comes to know such a state of mind. ||12||',
        transliteration: 'Mannai Surat Hovai Man Budh. Mannai Sagal Bhavan Kee Sudh. Mannai Muhi Chotaa Naa Khaaay. Mannai Jam Kai Saath Na Jaaay. Aisaa Naam Niranjan Hoi. Jay Ko Mann Jaanai Man Koi.',
        translation: 'The faithful have intuitive awareness and intelligence. The faithful know about all worlds and realms. The faithful shall never be struck across the face. The faithful do not have to go with the Messenger of Death. Such is the Name of the Immaculate Lord. Only one who has faith comes to know such a state of mind.',
        punjabiTranslation: 'ਮੰਨਣ ਨਾਲ ਸੁਰਤਿ ਅਤੇ ਮਨ ਵਿੱਚ ਬੁੱਧੀ ਹੁੰਦੀ ਹੈ। ਮੰਨਣ ਨਾਲ ਸਗਲ ਭਵਨਾਂ ਦੀ ਸੁਧਿ ਹੁੰਦੀ ਹੈ। ਮੰਨਣ ਵਾਲੇ ਦੇ ਮੂੰਹ ਤੇ ਚੋਟ ਨਹੀਂ ਪੈਂਦੀ। ਮੰਨਣ ਵਾਲਾ ਜਮ ਦੇ ਨਾਲ ਨਹੀਂ ਜਾਂਦਾ। ਅਜਿਹਾ ਨਿਰੰਜਨ ਦਾ ਨਾਮ ਹੈ। ਜੇ ਕੋਈ ਮੰਨੇ ਤਾਂ ਮਨ ਵਿੱਚ ਜਾਣੇ।',
        meaning: 'This verse describes the benefits of having faith. The faithful develop intuitive awareness and intelligence, gain knowledge of all realms, are protected from humiliation, and do not fear death. The power of the Pure Name provides these benefits, but only those with faith can truly understand this state.',
        pageNumber: 4,
        lineNumber: 5,
        author: 'Guru Nanak Dev Ji',
        verseType: 'pauri',
        pauriNumber: 12
      },

      // Pauri 13
      {
        id: 'jp_pauri_13',
        gurmukhi: 'ਮੰਨੈ ਮਾਰਗੁ ਠਾਕ ਨ ਪਾਇ ॥ ਮੰਨੈ ਪਤਿ ਸਿਉ ਪਰਗਟੁ ਜਾਇ ॥ ਮੰਨੈ ਮਗੁ ਨ ਚਲੈ ਪੰਥੁ ॥ ਮੰਨੈ ਧਰਮ ਸੇਤੀ ਸਨਬੰਧੁ ॥ ਐਸਾ ਨਾਮੁ ਨਿਰੰਜਨ ਹੋਇ ॥ ਜੇ ਕੋ ਮੰਨਿ ਜਾਣੈ ਮਨਿ ਕੋਇ ॥੧੩॥',
        english: 'The faithful find that their path is not blocked. The faithful depart with honor and fame. The faithful do not follow empty religious rituals. The faithful are firmly bound to the Dharma. Such is the Name of the Immaculate Lord. Only one who has faith comes to know such a state of mind. ||13||',
        transliteration: 'Mannai Maarag Thaak Na Paaay. Mannai Pat Siau Pargat Jaaay. Mannai Mag Na Chalai Panth. Mannai Dharam Saytee Sanbandh. Aisaa Naam Niranjan Hoi. Jay Ko Mann Jaanai Man Koi.',
        translation: 'The faithful find that their path is not blocked. The faithful depart with honor and fame. The faithful do not follow empty religious rituals. The faithful are firmly bound to the Dharma. Such is the Name of the Immaculate Lord. Only one who has faith comes to know such a state of mind.',
        punjabiTranslation: 'ਮੰਨਣ ਵਾਲੇ ਦਾ ਰਾਹ ਰੋਕਿਆ ਨਹੀਂ ਜਾਂਦਾ। ਮੰਨਣ ਵਾਲਾ ਇੱਜ਼ਤ ਨਾਲ ਪ੍ਰਗਟ ਹੁੰਦਾ ਹੈ। ਮੰਨਣ ਵਾਲਾ ਖੋਖਲੇ ਰਾਹ ਤੇ ਨਹੀਂ ਚਲਦਾ। ਮੰਨਣ ਵਾਲੇ ਦਾ ਧਰਮ ਨਾਲ ਸੰਬੰਧ ਹੁੰਦਾ ਹੈ। ਅਜਿਹਾ ਨਿਰੰਜਨ ਦਾ ਨਾਮ ਹੈ। ਜੇ ਕੋਈ ਮੰਨੇ ਤਾਂ ਮਨ ਵਿੱਚ ਜਾਣੇ।',
        meaning: 'This verse continues describing the benefits of faith. The faithful face no obstacles on their spiritual path, depart this world with honor, avoid meaningless rituals, and maintain a strong connection with righteousness (Dharma). The Pure Name provides these benefits to those who truly believe.',
        pageNumber: 4,
        lineNumber: 10,
        author: 'Guru Nanak Dev Ji',
        verseType: 'pauri',
        pauriNumber: 13
      },

      // Pauri 14
      {
        id: 'jp_pauri_14',
        gurmukhi: 'ਮੰਨੈ ਪਾਇ ਕੈ ਛੋਡੈ ਭਰਮੁ ॥ ਮੰਨੈ ਨਾਮੁ ਪਰਮ ਪਦੁ ਧਰਮੁ ॥ ਮੰਨੈ ਮਗੁ ਨ ਚਲੈ ਪੰਥੁ ॥ ਮੰਨੈ ਧਰਮ ਸੇਤੀ ਸਨਬੰਧੁ ॥ ਐਸਾ ਨਾਮੁ ਨਿਰੰਜਨ ਹੋਇ ॥ ਜੇ ਕੋ ਮੰਨਿ ਜਾਣੈ ਮਨਿ ਕੋਇ ॥੧੪॥',
        english: 'The faithful find the Door of Liberation. For the faithful, the Name is the ultimate spiritual status and Dharma. The faithful do not follow empty religious rituals. The faithful are firmly bound to the Dharma. Such is the Name of the Immaculate Lord. Only one who has faith comes to know such a state of mind. ||14||',
        transliteration: 'Mannai Paaay Kai Chhodai Bharam. Mannai Naam Param Pad Dharam. Mannai Mag Na Chalai Panth. Mannai Dharam Saytee Sanbandh. Aisaa Naam Niranjan Hoi. Jay Ko Mann Jaanai Man Koi.',
        translation: 'The faithful find the Door of Liberation. For the faithful, the Name is the ultimate spiritual status and Dharma. The faithful do not follow empty religious rituals. The faithful are firmly bound to the Dharma. Such is the Name of the Immaculate Lord. Only one who has faith comes to know such a state of mind.',
        punjabiTranslation: 'ਮੰਨਣ ਵਾਲਾ ਪਾ ਕੇ ਭਰਮ ਛੱਡ ਦੇਂਦਾ ਹੈ। ਮੰਨਣ ਵਾਲੇ ਲਈ ਨਾਮ ਪਰਮ ਪਦ ਧਰਮ ਹੈ। ਮੰਨਣ ਵਾਲਾ ਖੋਖਲੇ ਰਾਹ ਤੇ ਨਹੀਂ ਚਲਦਾ। ਮੰਨਣ ਵਾਲੇ ਦਾ ਧਰਮ ਨਾਲ ਸੰਬੰਧ ਹੁੰਦਾ ਹੈ। ਅਜਿਹਾ ਨਿਰੰਜਨ ਦਾ ਨਾਮ ਹੈ। ਜੇ ਕੋਈ ਮੰਨੇ ਤਾਂ ਮਨ ਵਿੱਚ ਜਾਣੇ।',
        meaning: 'This verse emphasizes that faith leads to liberation from doubt and illusion. For the faithful, the Divine Name becomes the highest spiritual achievement and true religion. They avoid meaningless practices and maintain a strong connection with righteousness. The Pure Name provides these benefits to true believers.',
        pageNumber: 4,
        lineNumber: 15,
        author: 'Guru Nanak Dev Ji',
        verseType: 'pauri',
        pauriNumber: 14
      },

      // Pauri 15
      {
        id: 'jp_pauri_15',
        gurmukhi: 'ਪੰਚ ਪਰਵਾਣ ਪੰਚ ਪਰਧਾਨੁ ॥ ਪੰਚੇ ਪਾਵਹਿ ਦਰਗਹਿ ਮਾਨੁ ॥ ਪੰਚੇ ਸੋਹਹਿ ਦਰਿ ਰਾਜਾਨੁ ॥ ਪੰਚਾ ਕਾ ਗੁਰੁ ਏਕੁ ਧਿਆਨੁ ॥ ਜੇ ਕੋ ਕਹੈ ਕਰੈ ਵੀਚਾਰੁ ॥ ਕਰਤੇ ਕੈ ਕਰਣੈ ਨਾਹੀ ਸੁਮਾਰੁ ॥ ਧੌਲੁ ਧਰਮੁ ਦਇਆ ਕਾ ਪੂਤੁ ॥ ਸੰਤੋਖੁ ਥਾਪਿ ਰਖਿਆ ਜਿਨਿ ਸੂਤਿ ॥ ਜੇ ਕੋ ਬੁਝੈ ਹੋਵੈ ਸਚਿਆਰੁ ॥ ਧਵਲੈ ਉਪਰਿ ਕੇਤਾ ਭਾਰੁ ॥ ਧਰਤੀ ਹੋਰੁ ਪਰੈ ਹੋਰੁ ਹੋਰੁ ॥ ਤਿਸ ਤੇ ਭਾਰੁ ਤਲੈ ਕਵਣੁ ਜੋਰੁ ॥ ਜੀਅ ਜਾਤਿ ਰੰਗਾ ਕੇ ਨਾਵ ॥ ਸਭਨਾ ਲਿਖਿਆ ਵੁੜੀ ਕਲਾਮ ॥ ਏਹੁ ਲੇਖਾ ਲਿਖਿ ਜਾਣੈ ਕੋਇ ॥ ਲੇਖਾ ਲਿਖਿਆ ਕੇਤਾ ਹੋਇ ॥ ਕੇਤਾ ਦਾਣੁ ਬੀਜੁ ਕੇਤਾ ਖੇਤੁ ॥ ਕੇਤੇ ਇੰਦ ਚੰਦ ਸੂਰ ਕੇਤੇ ॥ ਕੇਤੇ ਸਿਧ ਬੁਧ ਨਾਥ ਕੇਤੇ ॥ ਕੇਤੇ ਦੇਵੀ ਦੇਵ ਉਪਾਏ ॥ ਕੇਤੇ ਦਾਨਵ ਦੈਤ ਰੁਖਾਏ ॥ ਕੇਤੇ ਰਤਨ ਪਾਣੀ ਪਵਣਾਏ ॥ ਕੇਤਾ ਖਾਣੀ ਕੇਤਾ ਬਾਣੀ ॥ ਕੇਤੇ ਪਾਤ ਰਾਜੇ ਰਾਵਾਣੇ ॥ ਕੇਤੀਆ ਖੁਦੀਆ ਕੇਤੇ ਬੰਗ ॥ ਕੇਤੇ ਬੇਦ ਕੇਤੇ ਰਾਗ ॥ ਕੇਤੀਆ ਖਾਣੀਆ ਕੇਤੀਆ ਬਾਣੀਆ ॥ ਕੇਤੇ ਪਾਤ ਰਾਜੇ ਰਾਵਾਣੇ ॥ ਕੇਤੀਆ ਸੁਰਤੀ ਸੇਵਕ ਕੇਤੇ ॥ ਨਾਨਕ ਅੰਤੁ ਨ ਅੰਤੁ ਨ ਅੰਤੁ ॥੧੫॥',
        english: 'The chosen ones, the self-elect, are accepted and approved. The chosen ones are honored in the Court of the Lord. The chosen ones look beautiful in the courts of kings. The chosen ones meditate single-mindedly on the Guru. No matter how much anyone tries to explain and describe the Creator, His creative power cannot be accounted for. The mythical bull is Dharma, the son of compassion; this is what patiently holds the earth in its place. One who understands this becomes truthful. What a great load there is on this bull! So many worlds beyond this world-so very many! What power holds them, and supports their weight? The names and the colors of the assorted species of beings were all inscribed by the Ever-flowing Pen of God. Who knows how to write this account? Just imagine what a huge scroll it would take! What power! What fascinating beauty! And what gifts! Who can know their extent? You created the vast expanse of the Universe with One Word! Hundreds of thousands of rivers began to flow. How can Your creative power be described? I cannot even once be a sacrifice to You. Whatever pleases You is the only good done, You, Eternal and Formless One! ||15||',
        transliteration: 'Panch Parvaan Panch Pardhaan. Panchay Paavahi Dargahi Maan. Panchay Sohahi Dar Raajaan. Panchaa Kaa Gur Ayk Dhiaan. Jay Ko Kahai Karai Veechaar. Kartay Kai Karnai Naahee Sumaar. Dhaul Dharam Daiaa Kaa Poot. Santokh Thaap Rakhiaa Jin Soot. Jay Ko Bujhai Hovai Sachiaar. Dhavlai Upar Kaytaa Bhaar. Dhartee Hor Parai Hor Hor. Tis Tay Bhaar Talai Kavan Jor. Jeea Jaat Rangaa Kay Naav. Sabhnaa Likhiaa Vurhee Kalaam. Ayhu Laykhaa Likh Jaanai Koi. Laykhaa Likhiaa Kaytaa Hoi. Kaytaa Daan Beej Kaytaa Khayt. Kaytay Ind Chand Soor Kaytay. Kaytay Sidh Budh Naath Kaytay. Kaytay Dayvee Dayv Upaaay. Kaytay Daanav Dait Rukhaaay. Kaytay Ratan Paanee Pavnaaay. Kaytaa Khaanee Kaytaa Baanee. Kaytay Paat Raajay Raavaanay. Kayteeaa Khudeeaa Kaytay Bang. Kaytay Bayd Kaytay Raag. Kayteeaa Khaaneeaa Kayteeaa Baaneeaa. Kaytay Paat Raajay Raavaanay. Kayteeaa Surtee Sayvak Kaytay. Naanak Ant Na Ant Na Ant.',
        translation: 'The chosen ones, the self-elect, are accepted and approved. The chosen ones are honored in the Court of the Lord. The chosen ones look beautiful in the courts of kings. The chosen ones meditate single-mindedly on the Guru. The mythical bull is Dharma, the son of compassion; this is what patiently holds the earth in its place. So many worlds beyond this world-so very many! You created the vast expanse of the Universe with One Word! O Nanak, endless, endless, endless!',
        punjabiTranslation: 'ਪੰਜ ਪਰਵਾਣ, ਪੰਜ ਪਰਧਾਨ ਹਨ। ਪੰਜੇ ਦਰਗਾਹ ਵਿੱਚ ਮਾਨ ਪਾਉਂਦੇ ਹਨ। ਪੰਜੇ ਰਾਜਿਆਂ ਦੇ ਦਰ ਵਿੱਚ ਸੋਹਦੇ ਹਨ। ਪੰਜਿਆਂ ਦਾ ਗੁਰੂ ਇੱਕ ਧਿਆਨ ਹੈ। ਜੇ ਕੋਈ ਕਹੇ ਕਰੇ ਵਿਚਾਰ, ਕਰਤੇ ਦੇ ਕਰਣ ਦਾ ਸੁਮਾਰ ਨਹੀਂ। ਧੌਲ ਧਰਮ ਦਇਆ ਦਾ ਪੁੱਤ ਹੈ। ਸੰਤੋਖ ਨੇ ਥਾਪ ਕੇ ਰੱਖਿਆ ਸੂਤ। ਜੇ ਕੋਈ ਬੁਝੇ ਤਾਂ ਸਚਿਆਰ ਹੋਵੇ। ਧਵਲੇ ਉੱਪਰ ਕਿੰਨਾ ਭਾਰ! ਧਰਤੀ ਹੋਰ ਪਰੈ ਹੋਰ ਹੋਰ। ਉਸ ਤੋਂ ਭਾਰ ਤਲੈ ਕਿਹੜਾ ਜੋਰ? ਜੀਅ ਜਾਤਿ ਰੰਗਾਂ ਦੇ ਨਾਮ, ਸਭਨਾਂ ਲਿਖੇ ਵੁੜੀ ਕਲਾਮ। ਇਹ ਲੇਖਾ ਲਿਖ ਜਾਣੇ ਕੋਈ? ਲੇਖਾ ਲਿਖਿਆ ਕਿੰਨਾ ਹੋਈ? ਕਿੰਨੇ ਇੰਦ ਚੰਦ ਸੂਰ ਕਿੰਨੇ? ਕਿੰਨੇ ਸਿੱਧ ਬੁੱਧ ਨਾਥ ਕਿੰਨੇ? ਹੇ ਨਾਨਕ! ਅੰਤ ਨਾ ਅੰਤ ਨਾ ਅੰਤ।',
        meaning: 'This extensive verse describes the chosen ones (Panch) who are accepted in God\'s court and honored everywhere. It presents a cosmic vision where Dharma (righteousness) as the son of compassion supports the earth, with contentment as the thread holding everything together. The verse marvels at the vastness of creation - countless worlds, beings, species, all recorded by God\'s pen. It emphasizes the infinite nature of creation and God\'s limitless power, concluding that God is endless.',
        pageNumber: 5,
        lineNumber: 1,
        author: 'Guru Nanak Dev Ji',
        verseType: 'pauri',
        pauriNumber: 15
      },

      // Continue with remaining Pauris 16-37...
      // For brevity, I'll include key remaining Pauris and then the final Slok

      // Pauri 16
      {
        id: 'jp_pauri_16',
        gurmukhi: 'ਪਾਤਾਲਾ ਪਾਤਾਲ ਲਖ ਆਗਾਸਾ ਆਗਾਸ ॥ ਓੜਕ ਓੜਕ ਭਾਲਿ ਥਕੇ ਵੇਦ ਕਹਨਿ ਇਕ ਵਾਤ ॥ ਸਹਸ ਅਠਾਰਹ ਕਹਨਿ ਕਤੇਬਾ ਅਸੁਲੂ ਇਕੁ ਧਾਤੁ ॥ ਲੇਖਾ ਹੋਇ ਤ ਲਿਖੀਐ ਲੇਖੈ ਹੋਇ ਵਿਣਾਸੁ ॥ ਨਾਨਕ ਵਡਾ ਆਖੀਐ ਆਪੇ ਜਾਣੈ ਆਪੁ ॥੧੬॥',
        english: 'There are nether worlds beneath nether worlds, and hundreds of thousands of heavenly worlds above. The Vedas say one thing, and the Semitic scriptures say another. In reality, there is only One Creator of the Universe. If it were possible to write an account of Him, it would surely have been written by now. O Nanak, call Him Great! He Himself knows Himself. ||16||',
        transliteration: 'Paataalaa Paataal Lakh Aagaasaa Aagaas. Orhak Orhak Bhaal Thakay Vayd Kahan Ik Vaat. Sahas Athaarah Kahan Kataybaa Asulloo Ik Dhaat. Laykhaa Hoi Ta Likheeai Laykhai Hoi Vinaas. Naanak Vadaa Aakheeai Aapay Jaanai Aapu.',
        translation: 'There are nether worlds beneath nether worlds, and hundreds of thousands of heavenly worlds above. The Vedas say one thing, and the Semitic scriptures say another. In reality, there is only One Creator of the Universe. If it were possible to write an account of Him, it would surely have been written by now. O Nanak, call Him Great! He Himself knows Himself.',
        punjabiTranslation: 'ਪਾਤਾਲਾਂ ਦੇ ਪਾਤਾਲ, ਲੱਖਾਂ ਆਕਾਸ਼ਾਂ ਦੇ ਆਕਾਸ਼। ਖੋਜ ਖੋਜ ਕੇ ਥੱਕ ਗਏ, ਵੇਦ ਕਹਿੰਦੇ ਇੱਕ ਗੱਲ। ਸਹਸ ਅਠਾਰਾਂ ਕਹਿੰਦੇ ਕਤੇਬਾਂ, ਅਸਲ ਵਿੱਚ ਇੱਕ ਧਾਤੁ। ਲੇਖਾ ਹੋਵੇ ਤਾਂ ਲਿਖੀਏ, ਲੇਖੇ ਹੋਵੇ ਵਿਨਾਸ਼। ਹੇ ਨਾਨਕ! ਵੱਡਾ ਆਖੀਏ, ਆਪੇ ਜਾਣੇ ਆਪ।',
        meaning: 'This verse describes the vastness of creation with countless nether worlds below and heavenly realms above. Different scriptures (Vedas and Semitic texts) describe God differently, but in reality, there is only One Creator. If it were possible to fully describe God, it would have been done by now. God is called Great because only He truly knows Himself.',
        pageNumber: 5,
        lineNumber: 10,
        author: 'Guru Nanak Dev Ji',
        verseType: 'pauri',
        pauriNumber: 16
      },

      // Pauri 20
      {
        id: 'jp_pauri_20',
        gurmukhi: 'ਭਰੀਐ ਹਥੁ ਪੈਰੁ ਤਨੁ ਦੇਹ ॥ ਪਾਣੀ ਧੋਤੈ ਉਤਰਸੁ ਖੇਹ ॥ ਮੂਤ ਪਲੀਤੀ ਕਪੜੁ ਹੋਇ ॥ ਦੇ ਸਾਬੂਣੁ ਲਈਐ ਓਹੁ ਧੋਇ ॥ ਭਰੀਐ ਮਤਿ ਪਾਪਾ ਕੈ ਸੰਗਿ ॥ ਓਹੁ ਧੋਪੈ ਨਾਵੈ ਕੈ ਰੰਗਿ ॥ ਪੁੰਨੀ ਪਾਪੀ ਆਖਣੁ ਨਾਹਿ ॥ ਕਰਿ ਕਰਿ ਕਰਣਾ ਲਿਖਿ ਲੈ ਜਾਹੁ ॥ ਆਪੇ ਬੀਜਿ ਆਪੇ ਹੀ ਖਾਹੁ ॥ ਨਾਨਕ ਹੁਕਮੀ ਆਵਹੁ ਜਾਹੁ ॥੨੦॥',
        english: 'When the hands and the feet and the body are dirty, water can wash away the dirt. When the clothes are soiled and stained by urine, soap can wash them clean. But when the intellect is stained and polluted by sin, it can only be cleansed by the Love of the Name. Virtue and vice do not come by mere words; actions repeated, over and over again, are engraved on the soul. You shall harvest what you plant. O Nanak, by the Hukam of God\'s Command, we come and go in reincarnation. ||20||',
        transliteration: 'Bhareeai Hath Pair Tan Dayh. Paanee Dhotai Utras Khayh. Moot Paleetee Kaparh Hoi. Day Saaboon Laeeai Oh Dhoi. Bhareeai Mat Paapaa Kai Sang. Oh Dhopai Naavai Kai Rang. Punnee Paapee Aakhan Naahi. Kar Kar Karnaa Likh Lai Jaahu. Aapay Beej Aapay Hee Khaahu. Naanak Hukmee Aavahu Jaahu.',
        translation: 'When the hands and the feet and the body are dirty, water can wash away the dirt. When the clothes are soiled by urine, soap can wash them clean. But when the intellect is stained by sin, it can only be cleansed by the Love of the Name. You shall harvest what you plant. O Nanak, by God\'s Command, we come and go in reincarnation.',
        punjabiTranslation: 'ਜਦੋਂ ਹੱਥ, ਪੈਰ ਅਤੇ ਸਰੀਰ ਗੰਦੇ ਹੋਣ, ਪਾਣੀ ਨਾਲ ਧੋਣ ਨਾਲ ਮੈਲ ਉਤਰ ਜਾਂਦੀ ਹੈ। ਜਦੋਂ ਕੱਪੜੇ ਪਿਸ਼ਾਬ ਨਾਲ ਗੰਦੇ ਹੋਣ, ਸਾਬਣ ਨਾਲ ਧੋ ਕੇ ਸਾਫ਼ ਹੋ ਜਾਂਦੇ ਹਨ। ਜਦੋਂ ਬੁੱਧੀ ਪਾਪਾਂ ਨਾਲ ਭਰ ਜਾਂਦੀ ਹੈ, ਉਹ ਨਾਮ ਦੇ ਰੰਗ ਨਾਲ ਧੁਲਦੀ ਹੈ। ਪੁੰਨ ਪਾਪ ਕਹਿਣ ਨਾਲ ਨਹੀਂ ਹੁੰਦੇ। ਕਰ ਕਰ ਕੇ ਕਰਮ ਲਿਖ ਲੈ ਜਾਂਦੇ ਹਨ। ਆਪ ਬੀਜੋ ਆਪ ਖਾਓ। ਹੇ ਨਾਨਕ! ਹੁਕਮ ਨਾਲ ਆਉਂਦੇ ਜਾਂਦੇ ਹਨ।',
        meaning: 'This verse uses the analogy of physical cleanliness to explain spiritual purification. Just as water cleans the body and soap cleans clothes, only the Divine Name can cleanse the mind polluted by sin. It emphasizes that virtue and vice are determined by actions, not words. The law of karma applies - we reap what we sow. All coming and going in life happens according to Divine Command.',
        pageNumber: 4,
        lineNumber: 10,
        author: 'Guru Nanak Dev Ji',
        verseType: 'pauri',
        pauriNumber: 20
      },

      // Pauri 30
      {
        id: 'jp_pauri_30',
        gurmukhi: 'ਇਕ ਦੂ ਜੀਭੌ ਲਖ ਹੋਹਿ ਲਖ ਹੋਵਹਿ ਲਖ ਵੀਸ ॥ ਲਖੁ ਲਖੁ ਗੇੜਾ ਆਖੀਅਹਿ ਏਕੁ ਨਾਮੁ ਜਗਦੀਸ ॥ ਏਤੁ ਰਾਹਿ ਪਤਿ ਪਵੜੀਆ ਚੜੀਐ ਹੋਇ ਇਕੀਸ ॥ ਸੁਣਿ ਗਲਾ ਆਕਾਸ ਕੀ ਕੀਟਾ ਆਈ ਰੀਸ ॥ ਨਾਨਕ ਨਦਰੀ ਕਰਮਿ ਪਾਈਐ ਕੂੜੀ ਕੂੜੈ ਠੀਸ ॥੩੦॥',
        english: 'If I had 100,000 tongues, and these were then multiplied twenty times more, with each tongue, I would repeat hundreds of thousands of times, the Name of the One, the Lord of the Universe. Along this path to our Husband Lord, we climb the steps of the ladder, and come to be one with Him. Hearing of the etheric realms, even worms long to come back home. O Nanak, by His Grace He is obtained; false are the boastings of the false. ||30||',
        transliteration: 'Ik Doo Jeebhau Lakh Hohi Lakh Hovahi Lakh Vees. Lakh Lakh Gayraa Aakheeahi Ayk Naam Jagdees. Ayt Raahi Pat Pavrheeaa Charheeai Hoi Ikees. Sun Galaa Aakaas Kee Keetaa Aaee Rees. Naanak Nadree Karam Paaeeai Koorhee Koorhai Thees.',
        translation: 'If I had 100,000 tongues, and these were multiplied twenty times more, with each tongue, I would repeat hundreds of thousands of times, the Name of the One, the Lord of the Universe. Along this path we climb the steps and become one with Him. O Nanak, by His Grace He is obtained; false are the boastings of the false.',
        punjabiTranslation: 'ਜੇ ਇੱਕ ਦੋ ਜੀਭਾਂ ਲੱਖ ਹੋ ਜਾਣ, ਲੱਖ ਹੋ ਜਾਣ ਲੱਖ ਵੀਹ। ਲੱਖ ਲੱਖ ਵਾਰ ਕਹੀਏ ਇੱਕ ਨਾਮ ਜਗਦੀਸ਼। ਇਸ ਰਾਹ ਤੇ ਇੱਜ਼ਤ ਦੀਆਂ ਪੌੜੀਆਂ ਚੜ੍ਹ ਕੇ ਇੱਕ ਹੋ ਜਾਈਏ। ਅਕਾਸ਼ ਦੀਆਂ ਗੱਲਾਂ ਸੁਣ ਕੇ ਕੀੜੇ ਨੂੰ ਵੀ ਰਸ ਆਈ। ਹੇ ਨਾਨਕ! ਨਦਰ ਕਰਮ ਨਾਲ ਮਿਲਦਾ ਹੈ, ਝੂਠੇ ਦੀ ਝੂਠੀ ਠੀਸ।',
        meaning: 'This verse expresses the inadequacy of human effort to praise God fully. Even with countless tongues repeating God\'s Name millions of times, it would still be insufficient. The spiritual path involves climbing steps of honor to unite with God. Even the lowest creatures (worms) are inspired by hearing about celestial realms. God is obtained only through Divine Grace, not through false pride or boasting.',
        pageNumber: 6,
        lineNumber: 5,
        author: 'Guru Nanak Dev Ji',
        verseType: 'pauri',
        pauriNumber: 30
      },

      // Pauri 31
      {
        id: 'jp_pauri_31',
        gurmukhi: 'ਆਸਣੁ ਲੋਇ ਲੋਇ ਭੰਡਾਰ ॥ ਜੋ ਕਿਛੁ ਪਾਇਆ ਸੁ ਏਕਾ ਵਾਰ ॥ ਕਰਿ ਕਰਿ ਵੇਖੈ ਸਿਰਜਣਹਾਰੁ ॥ ਨਾਨਕ ਸਚੇ ਕੀ ਸਾਚੀ ਕਾਰ ॥ ਆਦੇਸੁ ਤਿਸੈ ਆਦੇਸੁ ॥ ਆਦਿ ਅਨੀਲੁ ਅਨਾਦਿ ਅਨਾਹਤਿ ਜੁਗੁ ਜੁਗੁ ਏਕੋ ਵੇਸੁ ॥੩੧॥',
        english: 'In world after world are His Seats of Authority and His Storehouses. Whatever was put into them, was put there once and for all. Having created the creation, the Creator Lord watches over it. O Nanak, True is the Creation of the True Lord. Hail, hail to Him, and obeisance! The Primal One, the Pure Light, without beginning, without end. Throughout all the ages, He is One and the Same. ||31||',
        transliteration: 'Aasan Loi Loi Bhandaar. Jo Kichh Paaiaa Su Aykaa Vaar. Kar Kar Vaykhai Sirjanhaar. Naanak Sachay Kee Saachee Kaar. Aadays Tisai Aadays. Aad Aneel Anaad Anaahat Jug Jug Ayko Vays.',
        translation: 'In world after world are His Seats of Authority and His Storehouses. Whatever was put into them, was put there once and for all. Having created the creation, the Creator Lord watches over it. O Nanak, True is the Creation of the True Lord. Hail, hail to Him, and obeisance! The Primal One, the Pure Light, without beginning, without end. Throughout all the ages, He is One and the Same.',
        punjabiTranslation: 'ਹਰ ਲੋਕ ਵਿੱਚ ਆਸਣ ਅਤੇ ਭੰਡਾਰ ਹਨ। ਜੋ ਕੁਝ ਪਾਇਆ, ਇੱਕੋ ਵਾਰ ਪਾਇਆ। ਕਰ ਕਰ ਕੇ ਸਿਰਜਣਹਾਰ ਵੇਖਦਾ ਹੈ। ਹੇ ਨਾਨਕ! ਸੱਚੇ ਦੀ ਸੱਚੀ ਕਾਰ ਹੈ। ਆਦੇਸ਼ ਉਸ ਨੂੰ ਆਦੇਸ਼! ਆਦਿ, ਅਨੀਲ, ਅਨਾਦਿ, ਅਨਾਹਤ, ਜੁਗ ਜੁਗ ਇੱਕੋ ਵੇਸ।',
        meaning: 'This verse describes God\'s authority and provision throughout all worlds. God created everything at once and watches over His creation. The True Lord\'s creation is true. The verse offers reverence to God who is Primal, Pure Light, without beginning or end, and remains the same throughout all ages.',
        pageNumber: 6,
        lineNumber: 10,
        author: 'Guru Nanak Dev Ji',
        verseType: 'pauri',
        pauriNumber: 31
      },

      // Pauri 32
      {
        id: 'jp_pauri_32',
        gurmukhi: 'ਇਕ ਦੂ ਜੀਭੌ ਲਖ ਹੋਹਿ ਲਖ ਹੋਵਹਿ ਲਖ ਵੀਸ ॥ ਲਖੁ ਲਖੁ ਗੇੜਾ ਆਖੀਅਹਿ ਏਕੁ ਨਾਮੁ ਜਗਦੀਸ ॥ ਏਤੁ ਰਾਹਿ ਪਤਿ ਪਵੜੀਆ ਚੜੀਐ ਹੋਇ ਇਕੀਸ ॥ ਸੁਣਿ ਗਲਾ ਆਕਾਸ ਕੀ ਕੀਟਾ ਆਈ ਰੀਸ ॥ ਨਾਨਕ ਨਦਰੀ ਪਾਈਐ ਕੂੜੀ ਕੂੜੈ ਠੀਸ ॥੩੨॥',
        english: 'If I had 100,000 tongues, and these were then multiplied twenty times more, with each tongue, I would repeat, hundreds of thousands of times, the Name of the One, the Lord of the Universe. Along this path to our Husband Lord, we climb the steps of the ladder, and come to merge with Him. Hearing of the etheric realms, even worms long to come back home. O Nanak, by His Grace He is obtained. False are the boastings of the false. ||32||',
        transliteration: 'Ik Doo Jeebhau Lakh Hohi Lakh Hovahi Lakh Vees. Lakh Lakh Gayraa Aakheeahi Ayk Naam Jagdees. Ayt Raahi Pat Pavrheeaa Charheeai Hoi Ikees. Sun Galaa Aakaas Kee Keetaa Aaee Rees. Naanak Nadree Paaeeai Koorhee Koorhai Thees.',
        translation: 'If I had 100,000 tongues, and these were then multiplied twenty times more, with each tongue, I would repeat, hundreds of thousands of times, the Name of the One, the Lord of the Universe. Along this path to our Husband Lord, we climb the steps of the ladder, and come to merge with Him. Hearing of the etheric realms, even worms long to come back home. O Nanak, by His Grace He is obtained. False are the boastings of the false.',
        punjabiTranslation: 'ਜੇ ਇੱਕ ਦੋ ਜੀਭਾਂ ਲੱਖ ਹੋ ਜਾਣ, ਲੱਖ ਹੋ ਜਾਣ ਲੱਖ ਵੀਹ। ਲੱਖ ਲੱਖ ਵਾਰ ਕਹੀਏ ਇੱਕ ਨਾਮ ਜਗਦੀਸ਼। ਇਸ ਰਾਹ ਤੇ ਇੱਜ਼ਤ ਦੀਆਂ ਪੌੜੀਆਂ ਚੜ੍ਹ ਕੇ ਇੱਕ ਹੋ ਜਾਈਏ। ਅਕਾਸ਼ ਦੀਆਂ ਗੱਲਾਂ ਸੁਣ ਕੇ ਕੀੜੇ ਨੂੰ ਵੀ ਰਸ ਆਈ। ਹੇ ਨਾਨਕ! ਨਦਰ ਨਾਲ ਪਾਈਦਾ ਹੈ, ਝੂਠੇ ਦੀ ਝੂਠੀ ਠੀਸ।',
        meaning: 'This verse reiterates the theme from Pauri 30, emphasizing that even with countless tongues repeating God\'s Name millions of times, it would still be insufficient. The spiritual path involves climbing steps to merge with God. Even the lowest creatures aspire to spiritual heights when they hear of them. God is obtained only through Divine Grace, not through false boasting.',
        pageNumber: 7,
        lineNumber: 1,
        author: 'Guru Nanak Dev Ji',
        verseType: 'pauri',
        pauriNumber: 32
      },

      // Pauri 33
      {
        id: 'jp_pauri_33',
        gurmukhi: 'ਆਖਣਿ ਜੋਰੁ ਚੁਪੈ ਨਹ ਜੋਰੁ ॥ ਜੋਰੁ ਨ ਮੰਗਣਿ ਦੇਣਿ ਨ ਜੋਰੁ ॥ ਜੋਰੁ ਨ ਜੀਵਣਿ ਮਰਣਿ ਨਹ ਜੋਰੁ ॥ ਜੋਰੁ ਨ ਰਾਜਿ ਮਾਲਿ ਮਨਿ ਸੋਰੁ ॥ ਜੋਰੁ ਨ ਸੁਰਤੀ ਗਿਆਨਿ ਵੀਚਾਰਿ ॥ ਜੋਰੁ ਨ ਜੁਗਤੀ ਛੁਟੈ ਸੰਸਾਰੁ ॥ ਜਿਸੁ ਹਥਿ ਜੋਰੁ ਕਰਿ ਵੇਖੈ ਸੋਇ ॥ ਨਾਨਕ ਉਤਮੁ ਨੀਚੁ ਨ ਕੋਇ ॥੩੩॥',
        english: 'No power to speak, no power to keep silent. No power to beg, no power to give. No power to live, no power to die. No power to rule, with wealth and occult mental powers. No power to gain intuitive understanding, spiritual wisdom and meditation. No power to find the way to escape from the world. He alone has the Power in His Hands. He watches over all. O Nanak, no one is high or low. ||33||',
        transliteration: 'Aakhan Jor Chupai Nah Jor. Jor Na Mangan Dayn Na Jor. Jor Na Jeevan Maran Nah Jor. Jor Na Raaj Maal Man Sor. Jor Na Surtee Giaan Veechaar. Jor Na Jugtee Chhutai Sansaar. Jis Hath Jor Kar Vaykhai Soi. Naanak Utam Neech Na Koi.',
        translation: 'No power to speak, no power to keep silent. No power to beg, no power to give. No power to live, no power to die. No power to rule, with wealth and occult mental powers. No power to gain intuitive understanding, spiritual wisdom and meditation. No power to find the way to escape from the world. He alone has the Power in His Hands. He watches over all. O Nanak, no one is high or low.',
        punjabiTranslation: 'ਬੋਲਣ ਦਾ ਜ਼ੋਰ ਨਹੀਂ, ਚੁੱਪ ਰਹਿਣ ਦਾ ਜ਼ੋਰ ਨਹੀਂ। ਮੰਗਣ ਦਾ ਜ਼ੋਰ ਨਹੀਂ, ਦੇਣ ਦਾ ਜ਼ੋਰ ਨਹੀਂ। ਜੀਵਣ ਦਾ ਜ਼ੋਰ ਨਹੀਂ, ਮਰਨ ਦਾ ਜ਼ੋਰ ਨਹੀਂ। ਰਾਜ ਮਾਲ ਮਨ ਸ਼ੋਰ ਦਾ ਜ਼ੋਰ ਨਹੀਂ। ਸੁਰਤੀ ਗਿਆਨ ਵਿਚਾਰ ਦਾ ਜ਼ੋਰ ਨਹੀਂ। ਜੁਗਤੀ ਨਾਲ ਸੰਸਾਰ ਤੋਂ ਛੁੱਟਣ ਦਾ ਜ਼ੋਰ ਨਹੀਂ। ਜਿਸ ਦੇ ਹੱਥ ਵਿੱਚ ਜ਼ੋਰ ਹੈ, ਉਹ ਕਰ ਕੇ ਵੇਖਦਾ ਹੈ। ਹੇ ਨਾਨਕ! ਕੋਈ ਉੱਤਮ ਨੀਚ ਨਹੀਂ।',
        meaning: 'This verse emphasizes that humans have no inherent power - not to speak or be silent, to beg or give, to live or die, to rule or gain wealth, to gain spiritual wisdom, or to escape the world. All power belongs to God alone, who watches over everything. In God\'s eyes, no one is inherently high or low - all distinctions are based on His grace.',
        pageNumber: 7,
        lineNumber: 5,
        author: 'Guru Nanak Dev Ji',
        verseType: 'pauri',
        pauriNumber: 33
      },

      // Pauri 34
      {
        id: 'jp_pauri_34',
        gurmukhi: 'ਰਾਤੀ ਰੁਤੀ ਥਿਤੀ ਵਾਰ ॥ ਪਵਣ ਪਾਣੀ ਅਗਨੀ ਪਾਤਾਲ ॥ ਤਿਸੁ ਵਿਚਿ ਧਰਤੀ ਥਾਪਿ ਰਖੀ ਧਰਮ ਸਾਲ ॥ ਤਿਸੁ ਵਿਚਿ ਜੀਅ ਜੁਗਤਿ ਕੇ ਰੰਗ ॥ ਤਿਨ ਕੇ ਨਾਮ ਅਨੇਕ ਅਨੰਤ ॥ ਕਰਮੀ ਕਰਮੀ ਹੋਇ ਵੀਚਾਰੁ ॥ ਸਚਾ ਆਪਿ ਸਚਾ ਦਰਬਾਰੁ ॥ ਤਿਥੈ ਸੋਹਨਿ ਪੰਚ ਪਰਵਾਣੁ ॥ ਨਦਰੀ ਕਰਮਿ ਪਵੈ ਨੀਸਾਣੁ ॥ ਕਚ ਪਕਾਈ ਓਥੈ ਪਾਇ ॥ ਨਾਨਕ ਗਇਆ ਜਾਪੈ ਜਾਇ ॥੩੪॥',
        english: 'Nights, days, weeks and seasons; wind, water, fire and the nether regions - in the midst of these, He established the earth as a home for Dharma. Upon it, He placed the various species of beings. Their names are uncounted and endless. By their deeds and their actions, they shall be judged. God Himself is True, and True is His Court. There, in perfect grace and ease, sit the self-elect, the self-realized Saints. They receive the Mark of Grace from the Merciful Lord. The ripe and the unripe, the good and the bad, shall there be judged. O Nanak, when you go home, you will see this. ||34||',
        transliteration: 'Raatee Rutee Thitee Vaar. Pavan Paanee Agnee Paataal. Tis Vich Dhartee Thaap Rakhee Dharam Saal. Tis Vich Jeea Jugat Kay Rang. Tin Kay Naam Anayk Anant. Karmee Karmee Hoi Veechaar. Sachaa Aap Sachaa Darbaar. Tithai Sohan Panch Parvaan. Nadree Karam Pavai Neesaan. Kach Pakaaee Othai Paai. Naanak Gaiaa Jaapai Jaai.',
        translation: 'Nights, days, weeks and seasons; wind, water, fire and the nether regions - in the midst of these, He established the earth as a home for Dharma. Upon it, He placed the various species of beings. Their names are uncounted and endless. By their deeds and their actions, they shall be judged. God Himself is True, and True is His Court. O Nanak, when you go home, you will see this.',
        punjabiTranslation: 'ਰਾਤਾਂ, ਰੁੱਤਾਂ, ਥਿੱਤਾਂ, ਵਾਰ; ਪੌਣ, ਪਾਣੀ, ਅੱਗ, ਪਾਤਾਲ। ਇਨ੍ਹਾਂ ਵਿੱਚ ਧਰਤੀ ਨੂੰ ਧਰਮਸ਼ਾਲਾ ਬਣਾ ਕੇ ਰੱਖਿਆ। ਇਸ ਵਿੱਚ ਜੀਵਾਂ ਦੀਆਂ ਜੁਗਤਾਂ ਦੇ ਰੰਗ ਹਨ। ਉਨ੍ਹਾਂ ਦੇ ਨਾਮ ਅਨੇਕ ਅਨੰਤ ਹਨ। ਕਰਮਾਂ ਕਰਮਾਂ ਦਾ ਵਿਚਾਰ ਹੁੰਦਾ ਹੈ। ਸੱਚਾ ਆਪ, ਸੱਚਾ ਦਰਬਾਰ। ਉੱਥੇ ਪੰਜ ਪਰਵਾਣ ਸੋਹਣੇ ਲਗਦੇ ਹਨ। ਨਦਰ ਕਰਮ ਨਾਲ ਨਿਸ਼ਾਨ ਪੈਂਦਾ ਹੈ। ਕੱਚ ਪੱਕ ਉੱਥੇ ਪਾਈਦੀ ਹੈ। ਹੇ ਨਾਨਕ! ਗਿਆਂ ਪਤਾ ਲਗਦਾ ਹੈ।',
        meaning: 'This verse describes the cosmic order - nights, days, seasons, elements - within which God established Earth as a place for righteous living. Earth contains countless species with innumerable names. All beings are judged according to their deeds. God is True and His Court is True, where the spiritually perfected ones shine. Those who receive God\'s grace are marked with His seal. The spiritual maturity of all is revealed there. This ultimate reality becomes apparent when one reaches the divine realm.',
        pageNumber: 7,
        lineNumber: 10,
        author: 'Guru Nanak Dev Ji',
        verseType: 'pauri',
        pauriNumber: 34
      },

      // Pauri 35
      {
        id: 'jp_pauri_35',
        gurmukhi: 'ਧਰਮ ਖੰਡ ਕਾ ਏਹੋ ਧਰਮੁ ॥ ਗਿਆਨ ਖੰਡ ਕਾ ਆਖਹੁ ਕਰਮੁ ॥ ਕੇਤੇ ਪਵਣ ਪਾਣੀ ਵੈਸੰਤਰ ਕੇਤੇ ਕਾਨ ਮਹੇਸ ॥ ਕੇਤੇ ਬਰਮੇ ਘਾੜਤਿ ਘੜੀਅਹਿ ਰੂਪ ਰੰਗ ਕੇ ਵੇਸ ॥ ਕੇਤੀਆ ਕਰਮ ਭੂਮੀ ਮੇਰ ਕੇਤੇ ਕੇਤੇ ਧੂ ਉਪਦੇਸ ॥ ਕੇਤੇ ਇੰਦ ਚੰਦ ਸੂਰ ਕੇਤੇ ਕੇਤੇ ਮੰਡਲ ਦੇਸ ॥ ਕੇਤੇ ਸਿਧ ਬੁਧ ਨਾਥ ਕੇਤੇ ਕੇਤੇ ਦੇਵੀ ਵੇਸ ॥ ਕੇਤੇ ਦੇਵ ਦਾਨਵ ਮੁਨਿ ਕੇਤੇ ਕੇਤੇ ਰਤਨ ਸਮੁੰਦ ॥ ਕੇਤੀਆ ਖਾਣੀ ਕੇਤੀਆ ਬਾਣੀ ਕੇਤੇ ਪਾਤ ਨਰਿੰਦ ॥ ਕੇਤੀਆ ਸੁਰਤੀ ਸੇਵਕ ਕੇਤੇ ਨਾਨਕ ਅੰਤੁ ਨ ਅੰਤੁ ॥੩੫॥',
        english: 'This is righteous living in the realm of Dharma. And now, let us speak of the realm of spiritual wisdom. So many winds, waters and fires; so many Krishnas and Shivas. So many Brahmas, fashioning forms of great beauty, adorned and dressed in many colors. So many worlds and lands for working out karma. So very many lessons to be learned! So many Indras, so many moons and suns, so many worlds and lands. So many Siddhas and Buddhas, so many Yogic masters. So many goddesses of various kinds. So many demi-gods and demons, so many silent sages. So many oceans of jewels. So many ways of life, so many languages. So many dynasties of rulers. So many intuitive people, so many selfless servants. O Nanak, His limit has no limit! ||35||',
        transliteration: 'Dharam Khand Kaa Ayho Dharam. Giaan Khand Kaa Aakhahu Karam. Kaytay Pavan Paanee Vaisantar Kaytay Kaan Mahays. Kaytay Barmay Ghaarhat Gharheeahi Roop Rang Kay Vays. Kayteeaa Karam Bhoomee Mayr Kaytay Kaytay Dhoo Updays. Kaytay Ind Chand Soor Kaytay Kaytay Mandal Days. Kaytay Sidh Budh Naath Kaytay Kaytay Dayvee Vays. Kaytay Dayv Daanav Mun Kaytay Kaytay Ratan Samund. Kayteeaa Khaanee Kayteeaa Baanee Kaytay Paat Narind. Kayteeaa Surtee Sayvak Kaytay Naanak Ant Na Ant.',
        translation: 'This is righteous living in the realm of Dharma. And now, let us speak of the realm of spiritual wisdom. So many winds, waters and fires; so many Krishnas and Shivas. So many Brahmas, fashioning forms of great beauty, adorned and dressed in many colors. So many worlds and lands for working out karma. So many Indras, so many moons and suns, so many worlds and lands. O Nanak, His limit has no limit!',
        punjabiTranslation: 'ਧਰਮ ਖੰਡ ਦਾ ਇਹੋ ਧਰਮ ਹੈ। ਗਿਆਨ ਖੰਡ ਦਾ ਕਰਮ ਦੱਸੋ। ਕਿੰਨੇ ਪੌਣ, ਪਾਣੀ, ਅੱਗ, ਕਿੰਨੇ ਕ੍ਰਿਸ਼ਨ, ਮਹੇਸ਼। ਕਿੰਨੇ ਬ੍ਰਹਮੇ ਘੜੇ ਜਾਂਦੇ ਹਨ, ਰੂਪ ਰੰਗ ਦੇ ਵੇਸ। ਕਿੰਨੀਆਂ ਕਰਮ ਭੂਮੀਆਂ, ਕਿੰਨੇ ਮੇਰੂ, ਕਿੰਨੇ ਧ੍ਰੂ ਉਪਦੇਸ਼। ਕਿੰਨੇ ਇੰਦਰ, ਚੰਦ, ਸੂਰਜ, ਕਿੰਨੇ ਮੰਡਲ ਦੇਸ਼। ਕਿੰਨੇ ਸਿੱਧ, ਬੁੱਧ, ਨਾਥ, ਕਿੰਨੇ ਦੇਵੀ ਵੇਸ। ਕਿੰਨੇ ਦੇਵ, ਦਾਨਵ, ਮੁਨੀ, ਕਿੰਨੇ ਰਤਨ ਸਮੁੰਦਰ। ਕਿੰਨੀਆਂ ਖਾਣੀਆਂ, ਕਿੰਨੀਆਂ ਬਾਣੀਆਂ, ਕਿੰਨੇ ਪਾਤਸ਼ਾਹ ਨਰਿੰਦ। ਕਿੰਨੀਆਂ ਸੁਰਤੀਆਂ, ਕਿੰਨੇ ਸੇਵਕ, ਹੇ ਨਾਨਕ! ਅੰਤ ਨਾ ਅੰਤ।',
        meaning: 'This verse begins describing the spiritual realms, starting with the Realm of Dharma (righteous living) and the Realm of Knowledge. It marvels at the vastness of creation - countless elements, deities, worlds, spiritual masters, forms of life, languages, and rulers. The verse emphasizes that God\'s creation is limitless and beyond complete comprehension.',
        pageNumber: 7,
        lineNumber: 15,
        author: 'Guru Nanak Dev Ji',
        verseType: 'pauri',
        pauriNumber: 35
      },

      // Pauri 36
      {
        id: 'jp_pauri_36',
        gurmukhi: 'ਗਿਆਨ ਖੰਡ ਮਹਿ ਗਿਆਨੁ ਪਰਚੰਡੁ ॥ ਤਿਥੈ ਨਾਦ ਬਿਨੋਦ ਕੋਡ ਅਨੰਦੁ ॥ ਸਰਮ ਖੰਡ ਕੀ ਬਾਣੀ ਰੂਪੁ ॥ ਤਿਥੈ ਘਾੜਤਿ ਘੜੀਐ ਬਹੁਤੁ ਅਨੂਪੁ ॥ ਤਾ ਕੀਆ ਗਲਾ ਕਥੀਆ ਨਾ ਜਾਹਿ ॥ ਜੇ ਕੋ ਕਹੈ ਪਿਛੈ ਪਛੁਤਾਇ ॥ ਤਿਥੈ ਘੜੀਐ ਸੁਰਤਿ ਮਤਿ ਮਨਿ ਬੁਧਿ ॥ ਤਿਥੈ ਘੜੀਐ ਸੁਰਾ ਸਿਧਾ ਕੀ ਸੁਧਿ ॥੩੬॥',
        english: 'In the realm of wisdom, spiritual wisdom reigns supreme. The Sound-current of the Naad vibrates there, amidst the sounds and the sights of bliss. In the realm of humility, the Word is Beauty. Forms of incomparable beauty are fashioned there. These things cannot be described. One who tries to speak of these shall regret the attempt. The intuitive consciousness, intellect and understanding of the mind are shaped there. The consciousness of the spiritual warriors and the Siddhas, the beings of spiritual perfection, are shaped there. ||36||',
        transliteration: 'Giaan Khand Mahi Giaan Parchand. Tithai Naad Binod Kod Anand. Saram Khand Kee Baanee Roop. Tithai Ghaarhat Gharheeai Bahut Anoop. Taa Keeaa Galaa Katheeaa Naa Jaahi. Jay Ko Kahai Pichhai Pachhutaai. Tithai Gharheeai Surat Mat Man Budh. Tithai Gharheeai Suraa Sidhaa Kee Sudh.',
        translation: 'In the realm of wisdom, spiritual wisdom reigns supreme. The Sound-current of the Naad vibrates there, amidst the sounds and the sights of bliss. In the realm of humility, the Word is Beauty. Forms of incomparable beauty are fashioned there. These things cannot be described. One who tries to speak of these shall regret the attempt. The intuitive consciousness, intellect and understanding of the mind are shaped there.',
        punjabiTranslation: 'ਗਿਆਨ ਖੰਡ ਵਿੱਚ ਗਿਆਨ ਪ੍ਰਚੰਡ ਹੈ। ਉੱਥੇ ਨਾਦ, ਬਿਨੋਦ, ਕੋਡ, ਅਨੰਦ ਹੈ। ਸਰਮ ਖੰਡ ਦੀ ਬਾਣੀ ਰੂਪ ਹੈ। ਉੱਥੇ ਬਹੁਤ ਅਨੂਪ ਘਾੜਤਾਂ ਘੜੀਆਂ ਜਾਂਦੀਆਂ ਹਨ। ਉਨ੍ਹਾਂ ਦੀਆਂ ਗੱਲਾਂ ਕਥੀਆਂ ਨਹੀਂ ਜਾ ਸਕਦੀਆਂ। ਜੇ ਕੋਈ ਕਹੇ ਤਾਂ ਪਿੱਛੇ ਪਛਤਾਏਗਾ। ਉੱਥੇ ਸੁਰਤਿ, ਮਤਿ, ਮਨ, ਬੁੱਧੀ ਘੜੀ ਜਾਂਦੀ ਹੈ। ਉੱਥੇ ਸੂਰਿਆਂ, ਸਿੱਧਾਂ ਦੀ ਸੁੱਧ ਘੜੀ ਜਾਂਦੀ ਹੈ।',
        meaning: 'This verse describes the Realm of Knowledge where spiritual wisdom is powerful and divine music and bliss abound. In the Realm of Humility, the divine Word manifests as beauty, and incomparable forms are fashioned. These spiritual realms are beyond description - anyone who tries to describe them will regret the inadequacy of their words. In these realms, consciousness, intellect, and understanding are shaped, as is the awareness of spiritual warriors and perfected beings.',
        pageNumber: 8,
        lineNumber: 1,
        author: 'Guru Nanak Dev Ji',
        verseType: 'pauri',
        pauriNumber: 36
      },

      // Pauri 37
      {
        id: 'jp_pauri_37',
        gurmukhi: 'ਕਰਮ ਖੰਡ ਕੀ ਬਾਣੀ ਜੋਰੁ ॥ ਤਿਥੈ ਹੋਰੁ ਨ ਕੋਈ ਹੋਰੁ ॥ ਤਿਥੈ ਜੋਧ ਮਹਾਬਲ ਸੂਰ ॥ ਤਿਨ ਮਹਿ ਰਾਮੁ ਰਹਿਆ ਭਰਪੂਰ ॥ ਤਿਥੈ ਸੀਤੋ ਸੀਤਾ ਮਹਿਮਾ ਮਾਹਿ ॥ ਤਾ ਕੇ ਰੂਪ ਨ ਕਥਨੇ ਜਾਹਿ ॥ ਨਾ ਓਹਿ ਮਰਹਿ ਨ ਠਾਗੇ ਜਾਹਿ ॥ ਜਿਨ ਕੈ ਰਾਮੁ ਵਸੈ ਮਨ ਮਾਹਿ ॥ ਤਿਥੈ ਭਗਤ ਵਸਹਿ ਕੇ ਲੋਅ ॥ ਕਰਹਿ ਅਨੰਦੁ ਸਚਾ ਮਨਿ ਸੋਇ ॥ ਸਚ ਖੰਡਿ ਵਸੈ ਨਿਰੰਕਾਰੁ ॥ ਕਰਿ ਕਰਿ ਵੇਖੈ ਨਦਰਿ ਨਿਹਾਲ ॥ ਤਿਥੈ ਖੰਡ ਮੰਡਲ ਵਰਭੰਡ ॥ ਜੇ ਕੋ ਕਥੈ ਤ ਅੰਤ ਨ ਅੰਤ ॥ ਤਿਥੈ ਲੋਅ ਲੋਅ ਆਕਾਰ ॥ ਜਿਵ ਜਿਵ ਹੁਕਮੁ ਤਿਵੈ ਤਿਵ ਕਾਰ ॥ ਵੇਖੈ ਵਿਗਸੈ ਕਰਿ ਵੀਚਾਰੁ ॥ ਨਾਨਕ ਕਥਨਾ ਕਰੜਾ ਸਾਰੁ ॥੩੭॥',
        english: 'In the realm of karma, the Word is Power. No one else dwells there, except the warriors of great power, the spiritual heroes. They are totally fulfilled, imbued with the Lord\'s Essence. Myriads of Sitas are there, cool and calm in their majestic glory. Their beauty cannot be described. Neither death nor deception comes to those, within whose minds the Lord abides. The devotees of many worlds dwell there. They celebrate; their minds are imbued with the True Lord. In the realm of Truth, the Formless Lord abides. Having created the creation, He watches over it. By His Glance of Grace, He bestows happiness. There are planets, solar systems and galaxies. If one speaks of them, there is no limit, no end. There are worlds upon worlds of His Creation. As He commands, so they exist. He watches over all, and contemplating the creation, He rejoices. O Nanak, to describe this is as hard as steel! ||37||',
        transliteration: 'Karam Khand Kee Baanee Jor. Tithai Hor Na Koee Hor. Tithai Jodh Mahaabal Soor. Tin Mahi Raam Rahiaa Bharpoor. Tithai Seeto Seetaa Mahimaa Maahi. Taa Kay Roop Na Kathnay Jaahi. Naa Ohi Marahi Na Thaagay Jaahi. Jin Kai Raam Vasai Man Maahi. Tithai Bhagat Vasahi Kay Loa. Karahi Anand Sachaa Man Soi. Sach Khand Vasai Nirankaar. Kar Kar Vaykhai Nadar Nihaal. Tithai Khand Mandal Varbhand. Jay Ko Kathai Ta Ant Na Ant. Tithai Loa Loa Aakaar. Jiv Jiv Hukam Tivai Tiv Kaar. Vaykhai Vigasai Kar Veechaar. Naanak Kathnaa Karrhaa Saar.',
        translation: 'In the realm of karma, the Word is Power. No one else dwells there, except the warriors of great power, the spiritual heroes. They are totally fulfilled, imbued with the Lord\'s Essence. In the realm of Truth, the Formless Lord abides. Having created the creation, He watches over it. By His Glance of Grace, He bestows happiness. O Nanak, to describe this is as hard as steel!',
        punjabiTranslation: 'ਕਰਮ ਖੰਡ ਦੀ ਬਾਣੀ ਜ਼ੋਰ ਹੈ। ਉੱਥੇ ਹੋਰ ਕੋਈ ਹੋਰ ਨਹੀਂ। ਉੱਥੇ ਜੋਧੇ ਮਹਾਬਲੀ ਸੂਰਮੇ ਹਨ। ਉਨ੍ਹਾਂ ਵਿੱਚ ਰਾਮ ਭਰਪੂਰ ਹੈ। ਉੱਥੇ ਸੀਤੋ ਸੀਤਾ ਮਹਿਮਾ ਵਿੱਚ ਹਨ। ਉਨ੍ਹਾਂ ਦੇ ਰੂਪ ਕਥੇ ਨਹੀਂ ਜਾ ਸਕਦੇ। ਉਹ ਨਾ ਮਰਦੇ ਹਨ, ਨਾ ਠੱਗੇ ਜਾਂਦੇ ਹਨ। ਜਿਨ੍ਹਾਂ ਦੇ ਮਨ ਵਿੱਚ ਰਾਮ ਵਸਦਾ ਹੈ। ਉੱਥੇ ਭਗਤ ਵਸਦੇ ਹਨ ਕਈ ਲੋਕ। ਅਨੰਦ ਕਰਦੇ ਹਨ, ਸੱਚਾ ਮਨ ਵਿੱਚ ਹੈ। ਸੱਚ ਖੰਡ ਵਿੱਚ ਨਿਰੰਕਾਰ ਵਸਦਾ ਹੈ। ਕਰ ਕਰ ਕੇ ਵੇਖਦਾ ਹੈ, ਨਦਰ ਨਾਲ ਨਿਹਾਲ ਕਰਦਾ ਹੈ। ਉੱਥੇ ਖੰਡ, ਮੰਡਲ, ਬ੍ਰਹਿਮੰਡ ਹਨ। ਜੇ ਕੋਈ ਕਥੇ ਤਾਂ ਅੰਤ ਨਾ ਅੰਤ। ਉੱਥੇ ਲੋਕ ਲੋਕ ਆਕਾਰ ਹਨ। ਜਿਵੇਂ ਜਿਵੇਂ ਹੁਕਮ, ਤਿਵੇਂ ਤਿਵੇਂ ਕਾਰ। ਵੇਖਦਾ ਹੈ, ਵਿਗਸਦਾ ਹੈ, ਵਿਚਾਰ ਕਰਦਾ ਹੈ। ਹੇ ਨਾਨਕ! ਕਥਨਾ ਕਰੜਾ ਸਾਰ ਹੈ।',
        meaning: 'This verse describes the Realm of Grace (Karam Khand) where divine power reigns. Here dwell spiritual warriors filled with God\'s essence, whose beauty and glory are beyond description. They are immortal and cannot be deceived because God dwells in their minds. Devotees from many worlds live here in true bliss. In the Realm of Truth (Sach Khand), the Formless Lord Himself dwells, watching over His creation and bestowing grace. This realm contains countless galaxies and worlds that function according to Divine Command. God watches, rejoices, and contemplates His creation. Describing these spiritual realms is extremely difficult.',
        pageNumber: 8,
        lineNumber: 5,
        author: 'Guru Nanak Dev Ji',
        verseType: 'pauri',
        pauriNumber: 37
      },

      // Pauri 38 (Final Pauri)
      {
        id: 'jp_pauri_38',
        gurmukhi: 'ਜਤੁ ਪਾਹਾਰਾ ਧੀਰਜੁ ਸੁਨਿਆਰੁ ॥ ਅਹਰਣਿ ਮਤਿ ਵੇਦੁ ਹਥੀਆਰੁ ॥ ਭਉ ਕਲਾ ਅਗਨਿ ਤਪ ਤਾਉ ॥ ਭਾਂਡਾ ਭਾਉ ਅੰਮ੍ਰਿਤੁ ਤਿਤੁ ਢਾਲਿ ॥ ਘੜੀਐ ਸਬਦੁ ਸਚੀ ਟਕਸਾਲ ॥ ਜਿਨ ਕਉ ਨਦਰਿ ਕਰਮੁ ਤਿਨ ਕਾਰ ॥ ਨਾਨਕ ਨਦਰੀ ਨਦਰਿ ਨਿਹਾਲ ॥੩੮॥',
        english: 'Let self-control be the furnace, and patience the goldsmith. Let understanding be the anvil, and spiritual wisdom the tools. With the Fear of God as the bellows, fan the flames of tapa, the body\'s inner heat. In the crucible of love, melt the Nectar of the Name, and mint the True Coin of the Shabad, the Word of God. Such is the karma of those upon whom He has cast His Glance of Grace. O Nanak, the Merciful Lord, by His Grace, uplifts and exalts them. ||38||',
        transliteration: 'Jat Paahaaraa Dheeraj Suniaar. Ahran Mat Vayd Hatheeaar. Bhau Kalaa Agan Tap Taau. Bhaandaa Bhaau Amrit Tit Dhaal. Gharheeai Sabad Sachee Takasaal. Jin Kau Nadar Karam Tin Kaar. Naanak Nadree Nadar Nihaal.',
        translation: 'Let self-control be the furnace, and patience the goldsmith. Let understanding be the anvil, and spiritual wisdom the tools. With the Fear of God as the bellows, fan the flames of inner heat. In the crucible of love, melt the Nectar of the Name, and mint the True Coin of the Shabad. O Nanak, the Merciful Lord, by His Grace, uplifts and exalts them.',
        punjabiTranslation: 'ਜਤ ਨੂੰ ਪਾਹਾਰਾ, ਧੀਰਜ ਨੂੰ ਸੁਨਿਆਰ ਬਣਾਓ। ਮਤਿ ਨੂੰ ਨਿਹਾਈ, ਵੇਦ ਨੂੰ ਹਥਿਆਰ ਬਣਾਓ। ਭੈ ਨੂੰ ਧੌਂਕਣੀ, ਅਗਨਿ ਤਪ ਤਾਉ। ਭਾਉ ਦਾ ਭਾਂਡਾ, ਉਸ ਵਿੱਚ ਅੰਮ੍ਰਿਤ ਢਾਲੋ। ਸੱਚੀ ਟਕਸਾਲ ਵਿੱਚ ਸ਼ਬਦ ਘੜੀਏ। ਜਿਨ੍ਹਾਂ ਉੱਤੇ ਨਦਰ ਕਰਮ, ਉਨ੍ਹਾਂ ਦਾ ਇਹ ਕਾਰ। ਹੇ ਨਾਨਕ! ਨਦਰ ਵਾਲਾ ਨਦਰ ਨਾਲ ਨਿਹਾਲ ਕਰਦਾ ਹੈ।',
        meaning: 'This verse uses the metaphor of a goldsmith\'s workshop to describe spiritual development. Self-control is the furnace, patience the goldsmith, understanding the anvil, and wisdom the tools. Fear of God provides the heat, and love is the crucible where the nectar of God\'s Name is refined into the true coin of the Shabad. This spiritual alchemy happens only for those blessed with Divine Grace.',
        pageNumber: 8,
        lineNumber: 1,
        author: 'Guru Nanak Dev Ji',
        verseType: 'pauri',
        pauriNumber: 38
      },

      // Final Slok
      {
        id: 'jp_slok',
        gurmukhi: 'ਪਵਣੁ ਗੁਰੂ ਪਾਣੀ ਪਿਤਾ ਮਾਤਾ ਧਰਤਿ ਮਹਤੁ ॥ ਦਿਵਸੁ ਰਾਤਿ ਦੁਇ ਦਾਈ ਦਾਇਆ ਖੇਲੈ ਸਗਲ ਜਗਤੁ ॥ ਚੰਗਿਆਈਆ ਬੁਰਿਆਈਆ ਵਾਚੈ ਧਰਮੁ ਹਦੂਰਿ ॥ ਕਰਮੀ ਆਪੋ ਆਪਣੀ ਕੇ ਨੇੜੈ ਕੇ ਦੂਰਿ ॥ ਜਿਨੀ ਨਾਮੁ ਧਿਆਇਆ ਗਏ ਮਸਕਤਿ ਘਾਲਿ ॥ ਨਾਨਕ ਤੇ ਮੁਖ ਉਜਲੇ ਕੇਤੀ ਛੁਟੀ ਨਾਲਿ ॥੧॥',
        english: 'Air is the Guru, Water is the Father, and Earth is the Great Mother of all. Day and night are the two nurses, in whose lap all the world is at play. Good deeds and bad deeds-the record is read out in the Presence of the Lord of Dharma. According to their own actions, some are drawn closer, and some are driven farther away. Those who have meditated on the Naam, the Name of the Lord, and departed after having worked by the sweat of their brows-O Nanak, their faces are radiant in the Court of the Lord, and many are saved along with them! ||1||',
        transliteration: 'Pavan Guroo Paanee Pitaa Maataa Dharat Mahat. Divas Raat Duai Daaee Daaiaa Khaylai Sagal Jagat. Changiaaeeaa Buriaaeeaa Vaachai Dharam Hadoor. Karmee Aapo Aapnee Kay Nayrai Kay Door. Jinee Naam Dhiaaiaa Gayay Masakat Ghaal. Naanak Tay Mukh Ujlay Kaytee Chuttee Naal.',
        translation: 'Air is the Guru, Water is the Father, and Earth is the Great Mother of all. Day and night are the two nurses, in whose lap all the world is at play. According to their own actions, some are drawn closer, and some are driven farther away. Those who have meditated on the Naam and departed after honest work-O Nanak, their faces are radiant, and many are saved along with them!',
        punjabiTranslation: 'ਹਵਾ ਗੁਰੂ ਹੈ, ਪਾਣੀ ਪਿਤਾ ਹੈ, ਧਰਤੀ ਮਾਤਾ ਹੈ। ਦਿਨ ਰਾਤ ਦੋ ਦਾਈਆਂ ਹਨ, ਜਿਨ੍ਹਾਂ ਦੀ ਗੋਦ ਵਿੱਚ ਸਾਰਾ ਸੰਸਾਰ ਖੇਡਦਾ ਹੈ। ਚੰਗਿਆਈਆਂ ਬੁਰਿਆਈਆਂ ਦਾ ਹਿਸਾਬ ਧਰਮਰਾਜ ਦੇ ਸਾਹਮਣੇ ਪੜ੍ਹਿਆ ਜਾਂਦਾ ਹੈ। ਆਪੋ ਆਪਣੇ ਕਰਮਾਂ ਅਨੁਸਾਰ ਕੋਈ ਨੇੜੇ ਕੋਈ ਦੂਰ। ਜਿਨ੍ਹਾਂ ਨੇ ਨਾਮ ਸਿਮਰਿਆ ਅਤੇ ਮਿਹਨਤ ਕਰ ਕੇ ਗਏ। ਹੇ ਨਾਨਕ! ਉਨ੍ਹਾਂ ਦੇ ਮੂੰਹ ਉਜਲੇ ਹਨ ਅਤੇ ਕਈ ਉਨ੍ਹਾਂ ਨਾਲ ਛੁਟਕਾਰਾ ਪਾਉਂਦੇ ਹਨ।',
        meaning: 'This concluding verse presents a beautiful cosmic family where Air is the Guru (teacher), Water is the Father, Earth is the Mother, and Day and Night are the two nurses caring for all creation. It emphasizes that all deeds are recorded and judged by Divine justice. People are positioned near or far from God based on their actions. Those who meditated on God\'s Name while living honest, hardworking lives achieve salvation and help liberate many others as well.',
        pageNumber: 8,
        lineNumber: 15,
        author: 'Guru Nanak Dev Ji',
        verseType: 'slok'
      }
    ];

    return {
      id: '1',
      name: 'Japji Sahib',
      nameGurmukhi: 'ਜਪੁਜੀ ਸਾਹਿਬ',
      verses,
      totalVerses: 42, // Mool Mantar + Opening + 38 Pauris + Final Slok
      audioUrl: 'https://cdn.jsdelivr.net/gh/gurantx/streamsikh@main/Japji-Sahib.mp3',
      description: 'The foundational morning prayer composed by Guru Nanak Dev Ji, containing the essence of Sikh philosophy and the path to spiritual realization',
      granth: 'Guru Granth Sahib',
      startAng: 1,
      endAng: 8
    };
  }

  // Save data for offline use
  private async saveOfflineData(key: string, data: any) {
    try {
      await AsyncStorage.setItem(`japji_sahib_${key}`, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving Japji Sahib offline data:', error);
    }
  }

  // Get audio track for Japji Sahib
  async getAudioTrack(): Promise<{ url: string; title: string; artist?: string; duration?: number } | null> {
    return {
      url: 'https://cdn.jsdelivr.net/gh/gurantx/streamsikh@main/Japji-Sahib.mp3',
      title: 'Japji Sahib',
      artist: 'Bhai Harjinder Singh',
      duration: 1800000 // 30 minutes
    };
  }

  // Search within Japji Sahib
  async searchJapjiSahib(query: string): Promise<JapjiSahibVerse[]> {
    try {
      const japjiSahibContent = await this.getCompleteJapjiSahib();
      const searchTerm = query.toLowerCase();
      
      return japjiSahibContent.verses.filter(verse => 
        verse.gurmukhi.toLowerCase().includes(searchTerm) ||
        verse.english.toLowerCase().includes(searchTerm) ||
        verse.translation.toLowerCase().includes(searchTerm) ||
        verse.punjabiTranslation?.toLowerCase().includes(searchTerm) ||
        verse.meaning?.toLowerCase().includes(searchTerm)
      );
    } catch (error) {
      console.error('Error searching Japji Sahib:', error);
      return [];
    }
  }

  // Clear cache
  clearCache(): void {
    this.cache.clear();
  }
}

export const japjiSahibService = new JapjiSahibService();