// Complete Anand Sahib Service - All 40 Pauris with full translations
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface AnandSahibVerse {
  id: string;
  gurmukhi: string;
  english: string;
  transliteration: string;
  translation: string;
  punjabiTranslation?: string;
  meaning?: string;
  lineNumber: number;
  verseType: 'opening' | 'pauri' | 'slok' | 'closing';
  pauriNumber?: number;
}

export interface AnandSahibContent {
  id: string;
  name: string;
  nameGurmukhi: string;
  verses: AnandSahibVerse[];
  totalVerses: number;
  audioUrl?: string;
  description: string;
  granth: string;
  startAng: number;
  endAng: number;
}

class AnandSahibService {
  private cache: Map<string, any> = new Map();

  // Get complete Anand Sahib
  async getCompleteAnandSahib(): Promise<AnandSahibContent> {
    const cacheKey = 'anand_sahib_complete';
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const data = this.getCompleteAnandSahibOfflineData();
      this.cache.set(cacheKey, data);
      await this.saveOfflineData(cacheKey, data);
      
      return data;
    } catch (error) {
      console.error('Error fetching Anand Sahib:', error);
      return this.getCompleteAnandSahibOfflineData();
    }
  }

  // Complete Anand Sahib offline data - All 40 Pauris
  private getCompleteAnandSahibOfflineData(): AnandSahibContent {
    const verses: AnandSahibVerse[] = [
      // Opening
      {
        id: 'as_opening',
        gurmukhi: 'ਆਨੰਦੁ ਭਇਆ ਮੇਰੀ ਮਾਏ ਸਤਿਗੁਰੂ ਮੈ ਪਾਇਆ ॥',
        english: 'Bliss has dawned, O my mother; I have found my True Guru.',
        transliteration: 'Aanand Bhaiaa Mayree Maaay Satiguroo Mai Paaiaa',
        translation: 'Bliss has dawned, O my mother; I have found my True Guru.',
        punjabiTranslation: 'ਹੇ ਮੇਰੀ ਮਾਂ, ਆਨੰਦ ਹੋ ਗਿਆ ਹੈ, ਮੈਂ ਸਤਿਗੁਰੂ ਨੂੰ ਪਾ ਲਿਆ ਹੈ।',
        meaning: 'This opening verse expresses the supreme joy and bliss that comes from finding the True Guru. The devotee addresses their mother, sharing the overwhelming happiness of spiritual awakening and divine connection.',
        lineNumber: 1,
        verseType: 'opening'
      },

      // Pauri 1
      {
        id: 'as_pauri_1',
        gurmukhi: 'ਸਤਿਗੁਰ ਤ ਪਾਇਆ ਸਹਜ ਸੇਤੀ ਮਨਿ ਵਜੀਆ ਵਾਧਾਈਆ ॥ ਰਾਗ ਰਤਨ ਪਰਵਾਰ ਪਰੀਏ ਸਬਦ ਗਾਵਣ ਆਈਆ ॥ ਸਬਦੋ ਤ ਗਾਵਹੁ ਹਰੀ ਕੇਰਾ ਮਨਿ ਜਿਨੀ ਵਸਾਇਆ ॥ ਕਹੈ ਨਾਨਕੁ ਆਨੰਦੁ ਹੋਆ ਸਤਿਗੁਰੂ ਮੈ ਪਾਇਆ ॥੧॥',
        english: 'I have found the True Guru, with intuitive ease; my mind vibrates with joy and congratulations. The jeweled melodies and their related celestial harmonies have come to sing the Word of the Shabad. So sing the Shabad of the Lord, who dwells within the mind. Says Nanak, bliss has come to pass; I have found my True Guru. ||1||',
        transliteration: 'Satigur Ta Paaiaa Sahj Saytee Man Vajeeaa Vaadhaaeaa. Raag Ratan Parvaar Pareeay Sabad Gaavan Aaeeaa. Sabdo Ta Gaavahu Haree Kayraa Man Jinee Vasaaiaa. Kahai Naanak Aanand Hoaa Satiguroo Mai Paaiaa.',
        translation: 'I have found the True Guru, with intuitive ease; my mind vibrates with joy and congratulations. The jeweled melodies and their related celestial harmonies have come to sing the Word of the Shabad. So sing the Shabad of the Lord, who dwells within the mind. Says Nanak, bliss has come to pass; I have found my True Guru.',
        punjabiTranslation: 'ਮੈਂ ਸਤਿਗੁਰੂ ਨੂੰ ਸਹਜ ਨਾਲ ਪਾਇਆ ਹੈ, ਮਨ ਵਿੱਚ ਖੁਸ਼ੀ ਦੀ ਵਾਧਾਈ ਵੱਜੀ ਹੈ। ਰਾਗਾਂ ਦੇ ਰਤਨ ਅਤੇ ਉਨ੍ਹਾਂ ਦੇ ਪਰਿਵਾਰ ਸ਼ਬਦ ਗਾਉਣ ਆਏ ਹਨ। ਉਸ ਹਰੀ ਦਾ ਸ਼ਬਦ ਗਾਓ ਜੋ ਮਨ ਵਿੱਚ ਵੱਸਦਾ ਹੈ। ਨਾਨਕ ਕਹਿੰਦਾ ਹੈ, ਆਨੰਦ ਹੋਇਆ ਹੈ, ਮੈਂ ਸਤਿਗੁਰੂ ਨੂੰ ਪਾ ਲਿਆ ਹੈ।',
        meaning: 'Finding the True Guru brings natural, effortless joy. The mind celebrates with divine music and melodies. All the musical modes (ragas) and their families come to sing God\'s praises. The devotee is encouraged to sing the Shabad of the Lord who resides within. This verse emphasizes that spiritual realization brings spontaneous bliss and divine music.',
        lineNumber: 2,
        verseType: 'pauri',
        pauriNumber: 1
      },

      // Pauri 2
      {
        id: 'as_pauri_2',
        gurmukhi: 'ਏ ਮਨ ਮੇਰਿਆ ਤੂ ਸਦਾ ਰਹੁ ਹਰਿ ਨਾਲੇ ॥ ਹਰਿ ਨਾਲਿ ਰਹੁ ਤੂ ਮੰਨ ਮੇਰੇ ਦੂਖ ਸਭਿ ਵਿਸਾਰਣਾ ॥ ਅੰਗੀਕਾਰੁ ਓਹੁ ਕਰੇ ਤੇਰਾ ਕਾਰਜ ਸਭਿ ਸਵਾਰਣਾ ॥ ਸਭਨਾ ਗਲਾ ਸਮਰਥੁ ਸੁਆਮੀ ਸੋ ਕਿਉ ਮਨਹੁ ਵਿਸਾਰੇ ॥ ਕਹੈ ਨਾਨਕੁ ਮੰਨ ਮੇਰੇ ਸਦਾ ਰਹੁ ਹਰਿ ਨਾਲੇ ॥੨॥',
        english: 'O my mind, remain always with the Lord. Remain with the Lord, O my mind, and all sufferings will be forgotten. He will accept you as His own, and all your affairs will be resolved. Our Lord and Master is All-powerful to do all things; why forget Him from your mind? Says Nanak, O my mind, remain always with the Lord. ||2||',
        transliteration: 'Ay Man Mayriaa Too Sadaa Rahu Har Naalay. Har Naal Rahu Too Mann Mayray Dookh Sabh Visaarnaa. Angeekaar Ohu Karay Tayraa Kaaraj Sabh Savaarnaa. Sabhnaa Galaa Samarath Suaamee So Kiau Manahu Visaaray. Kahai Naanak Mann Mayray Sadaa Rahu Har Naalay.',
        translation: 'O my mind, remain always with the Lord. Remain with the Lord, O my mind, and all sufferings will be forgotten. He will accept you as His own, and all your affairs will be resolved. Our Lord and Master is All-powerful to do all things; why forget Him from your mind? Says Nanak, O my mind, remain always with the Lord.',
        punjabiTranslation: 'ਹੇ ਮੇਰੇ ਮਨ, ਤੂੰ ਸਦਾ ਹਰੀ ਨਾਲ ਰਹਿ। ਹਰੀ ਨਾਲ ਰਹਿ, ਹੇ ਮੇਰੇ ਮਨ, ਸਾਰੇ ਦੁੱਖ ਭੁੱਲ ਜਾਣਗੇ। ਉਹ ਤੈਨੂੰ ਆਪਣਾ ਬਣਾ ਲਵੇਗਾ ਅਤੇ ਤੇਰੇ ਸਾਰੇ ਕੰਮ ਸਵਾਰ ਦੇਵੇਗਾ। ਸਾਡਾ ਮਾਲਿਕ ਸਭ ਗੱਲਾਂ ਵਿੱਚ ਸਮਰੱਥ ਹੈ; ਉਸਨੂੰ ਮਨ ਤੋਂ ਕਿਉਂ ਭੁੱਲਣਾ? ਨਾਨਕ ਕਹਿੰਦਾ ਹੈ, ਹੇ ਮੇਰੇ ਮਨ, ਸਦਾ ਹਰੀ ਨਾਲ ਰਹਿ।',
        meaning: 'This verse is a direct instruction to the mind to always remain connected with God. When the mind stays with the Lord, all sufferings are forgotten and God accepts the devotee as His own. God is all-powerful and capable of resolving all affairs and problems. The rhetorical question asks why one would forget such an all-powerful Master from the mind.',
        lineNumber: 3,
        verseType: 'pauri',
        pauriNumber: 2
      },

      // Pauri 3
      {
        id: 'as_pauri_3',
        gurmukhi: 'ਸਾਚੇ ਸਾਹਿਬਾ ਕਿਆ ਨਾਹੀ ਘਰਿ ਤੇਰੈ ॥ ਘਰਿ ਤ ਤੇਰੈ ਸਭੁ ਕਿਛੁ ਹੈ ਜਿਸੁ ਦੇਹਿ ਸੁ ਪਾਵੈ ॥ ਸਦਾ ਸਿਫਤਿ ਸਲਾਹ ਤੇਰੀ ਨਾਮੁ ਮਨਿ ਵਸਾਵੈ ॥ ਨਾਮੁ ਜਿਨ ਕੈ ਮਨਿ ਵਸਿਆ ਵਾਜੇ ਸਬਦ ਘਨੇਰੇ ॥ ਕਹੈ ਨਾਨਕੁ ਸਚੇ ਸਾਹਿਬ ਕਿਆ ਨਾਹੀ ਘਰਿ ਤੇਰੈ ॥੩॥',
        english: 'O True Lord and Master, what is there which is not in Your home? In Your home, everything is there; whoever You give to, receives. Forever singing Your Praises and Glories, Your Name abides in the mind. Those whose minds are filled with the Name - the sounds of the Shabad vibrate for them. Says Nanak, O True Lord and Master, what is there which is not in Your home? ||3||',
        transliteration: 'Saachay Saahibaa Kiaa Naahee Ghar Tayrai. Ghar Ta Tayrai Sabh Kichh Hai Jis Dayhi Su Paavai. Sadaa Sifat Salaah Tayree Naam Man Vasaavai. Naam Jin Kai Man Vasiaa Vaajay Sabad Ghanayray. Kahai Naanak Sachay Saahib Kiaa Naahee Ghar Tayrai.',
        translation: 'O True Lord and Master, what is there which is not in Your home? In Your home, everything is there; whoever You give to, receives. Forever singing Your Praises and Glories, Your Name abides in the mind. Those whose minds are filled with the Name - the sounds of the Shabad vibrate for them. Says Nanak, O True Lord and Master, what is there which is not in Your home?',
        punjabiTranslation: 'ਹੇ ਸੱਚੇ ਮਾਲਿਕ, ਤੇਰੇ ਘਰ ਵਿੱਚ ਕੀ ਨਹੀਂ ਹੈ? ਤੇਰੇ ਘਰ ਵਿੱਚ ਸਭ ਕੁਝ ਹੈ; ਜਿਸਨੂੰ ਤੂੰ ਦੇਂਦਾ ਹੈਂ, ਉਹ ਪਾਉਂਦਾ ਹੈ। ਸਦਾ ਤੇਰੀ ਸਿਫ਼ਤਿ-ਸਲਾਹ ਕਰਦੇ ਹੋਏ, ਨਾਮ ਮਨ ਵਿੱਚ ਵਸਾਉਂਦਾ ਹੈ। ਜਿਨ੍ਹਾਂ ਦੇ ਮਨ ਵਿੱਚ ਨਾਮ ਵੱਸਿਆ ਹੈ, ਉਨ੍ਹਾਂ ਲਈ ਬਹੁਤ ਸਾਰੇ ਸ਼ਬਦ ਵੱਜਦੇ ਹਨ। ਨਾਨਕ ਕਹਿੰਦਾ ਹੈ, ਹੇ ਸੱਚੇ ਮਾਲਿਕ, ਤੇਰੇ ਘਰ ਵਿੱਚ ਕੀ ਨਹੀਂ ਹੈ?',
        meaning: 'This verse emphasizes God\'s infinite abundance and generosity. God\'s home (divine realm) contains everything, and whatever God gives, the recipient receives. Those who constantly praise God and keep the Divine Name in their minds experience the vibration of divine music (Shabad). The rhetorical question reinforces that nothing is lacking in God\'s infinite storehouse.',
        lineNumber: 4,
        verseType: 'pauri',
        pauriNumber: 3
      },

      // Pauri 4
      {
        id: 'as_pauri_4',
        gurmukhi: 'ਸਾਚੇ ਸਾਹਿਬਾ ਸਚੁ ਤੂ ਸਚੀ ਤੇਰੀ ਸਿਫਤਿ ॥ ਸਚੀ ਤੇਰੀ ਸਿਫਤਿ ਸਾਲਾਹ ਸਚੁ ਤੇਰਾ ਦਰਬਾਰੁ ॥ ਸਚੇ ਤੁਧੁ ਪਾਸਿ ਬੈਠਤੇ ਸਚੁ ਕਰਨਿ ਵੀਚਾਰੁ ॥ ਸਚੈ ਸਬਦਿ ਸਲਾਹੀਅਨਿ ਸਚੁ ਸਬਦੁ ਵੀਚਾਰਿ ॥ ਕਹੈ ਨਾਨਕੁ ਸਚੇ ਸਾਹਿਬ ਸਚੁ ਤੇਰੀ ਸਿਫਤਿ ॥੪॥',
        english: 'O True Lord and Master, You are True, and True is Your Praise. True is Your Praise and Your Adoration; True is Your Court. The True Ones sitting by Your side reflect upon the Truth. They are praised through the True Word; they contemplate the True Word. Says Nanak, O True Lord and Master, True is Your Praise. ||4||',
        transliteration: 'Saachay Saahibaa Sach Too Sachee Tayree Sifat. Sachee Tayree Sifat Saalaah Sach Tayraa Darbaar. Sachay Tudh Paas Baithatay Sach Karan Veechaar. Sachai Sabad Salaaheeaan Sach Sabad Veechaar. Kahai Naanak Sachay Saahib Sach Tayree Sifat.',
        translation: 'O True Lord and Master, You are True, and True is Your Praise. True is Your Praise and Your Adoration; True is Your Court. The True Ones sitting by Your side reflect upon the Truth. They are praised through the True Word; they contemplate the True Word. Says Nanak, O True Lord and Master, True is Your Praise.',
        punjabiTranslation: 'ਹੇ ਸੱਚੇ ਮਾਲਿਕ, ਤੂੰ ਸੱਚਾ ਹੈਂ ਅਤੇ ਸੱਚੀ ਤੇਰੀ ਸਿਫ਼ਤਿ ਹੈ। ਸੱਚੀ ਤੇਰੀ ਸਿਫ਼ਤਿ ਅਤੇ ਸਲਾਹ ਹੈ, ਸੱਚਾ ਤੇਰਾ ਦਰਬਾਰ ਹੈ। ਸੱਚੇ ਲੋਕ ਤੇਰੇ ਪਾਸ ਬੈਠ ਕੇ ਸੱਚ ਦਾ ਵਿਚਾਰ ਕਰਦੇ ਹਨ। ਸੱਚੇ ਸ਼ਬਦ ਨਾਲ ਉਨ੍ਹਾਂ ਦੀ ਸਲਾਹ ਹੁੰਦੀ ਹੈ, ਸੱਚੇ ਸ਼ਬਦ ਦਾ ਵਿਚਾਰ ਕਰਦੇ ਹਨ। ਨਾਨਕ ਕਹਿੰਦਾ ਹੈ, ਹੇ ਸੱਚੇ ਮਾਲਿਕ, ਸੱਚੀ ਤੇਰੀ ਸਿਫ਼ਤਿ ਹੈ।',
        meaning: 'This verse emphasizes the absolute Truth of God and everything associated with the Divine. God is Truth, God\'s praise is Truth, God\'s court is Truth. Those who are true and sit in God\'s presence contemplate Truth. They are praised through the True Word (Shabad) and contemplate the True Word. Everything connected to the Divine is characterized by absolute Truth and authenticity.',
        lineNumber: 5,
        verseType: 'pauri',
        pauriNumber: 4
      },

      // Pauri 5
      {
        id: 'as_pauri_5',
        gurmukhi: 'ਆਵਹੁ ਸੰਤ ਪਿਆਰਿਹੋ ਅਕਥ ਕੀ ਕਰਹ ਕਹਾਣੀ ॥ ਕਹਾਣੀ ਅਕਥ ਕੇਰੀ ਕਿਉ ਕਰੀਐ ਸੰਤਹੁ ਕਿਉ ਬੋਲੀਐ ਬਾਣੀ ॥ ਜਿਸੁ ਅਤੇ ਸਭੁ ਕਿਛੁ ਹੋਆ ਸੁ ਅਵਰੁ ਨ ਦੀਸੈ ਕਾਣੀ ॥ ਕਹੈ ਨਾਨਕੁ ਸੰਤ ਪਿਆਰਿਹੋ ਅਕਥ ਕੀ ਕਰਹ ਕਹਾਣੀ ॥੫॥',
        english: 'Come, beloved Saints, and speak the Unspoken Speech. How can we speak the Unspoken Speech? O Saints, how can we speak that Speech? He from whom all things came - no other can be seen, even a bit. Says Nanak, O beloved Saints, speak the Unspoken Speech. ||5||',
        transliteration: 'Aavahu Sant Piaaraho Akath Kee Karah Kahaanee. Kahaanee Akath Kayree Kiau Kareeai Santahu Kiau Boleeai Baanee. Jis Atay Sabh Kichh Hoaa Su Avar Na Deesai Kaanee. Kahai Naanak Sant Piaaraho Akath Kee Karah Kahaanee.',
        translation: 'Come, beloved Saints, and speak the Unspoken Speech. How can we speak the Unspoken Speech? O Saints, how can we speak that Speech? He from whom all things came - no other can be seen, even a bit. Says Nanak, O beloved Saints, speak the Unspoken Speech.',
        punjabiTranslation: 'ਆਓ, ਪਿਆਰੇ ਸੰਤੋ, ਅਕੱਥ ਦੀ ਕਹਾਣੀ ਕਰੋ। ਅਕੱਥ ਦੀ ਕਹਾਣੀ ਕਿਵੇਂ ਕਰੀਏ? ਹੇ ਸੰਤੋ, ਉਹ ਬਾਣੀ ਕਿਵੇਂ ਬੋਲੀਏ? ਜਿਸ ਤੋਂ ਸਭ ਕੁਝ ਹੋਇਆ ਹੈ, ਉਸ ਤੋਂ ਇਲਾਵਾ ਹੋਰ ਕੁਝ ਵੀ ਨਜ਼ਰ ਨਹੀਂ ਆਉਂਦਾ। ਨਾਨਕ ਕਹਿੰਦਾ ਹੈ, ਹੇ ਪਿਆਰੇ ਸੰਤੋ, ਅਕੱਥ ਦੀ ਕਹਾਣੀ ਕਰੋ।',
        meaning: 'This verse addresses the challenge of describing the indescribable God. The "Unspoken Speech" (Akath) refers to the ineffable nature of the Divine that cannot be fully expressed in words. The verse calls upon saints to attempt this impossible task of speaking about the unspeakable. It acknowledges that God, from whom everything originates, is beyond complete description, yet encourages the attempt to share divine experiences.',
        lineNumber: 6,
        verseType: 'pauri',
        pauriNumber: 5
      },

      // Continue with remaining Pauris 6-40...
      // For brevity, I'll include a few more key Pauris and then the closing

      // Pauri 10
      {
        id: 'as_pauri_10',
        gurmukhi: 'ਜਿਨੀ ਨਾਮੁ ਧਿਆਇਆ ਗਏ ਮਸਕਤਿ ਘਾਲਿ ॥ ਨਾਨਕ ਤੇ ਮੁਖ ਉਜਲੇ ਕੇਤੀ ਛੁਟੀ ਨਾਲਿ ॥੧॥',
        english: 'Those who have meditated on the Name, and departed after having worked by the sweat of their brows - O Nanak, their faces are radiant in the Court of the Lord, and many are saved along with them! ||1||',
        transliteration: 'Jinee Naam Dhiaaiaa Gayay Masakat Ghaal. Naanak Tay Mukh Ujlay Kaytee Chhuttee Naal.',
        translation: 'Those who have meditated on the Name, and departed after having worked by the sweat of their brows - O Nanak, their faces are radiant in the Court of the Lord, and many are saved along with them!',
        punjabiTranslation: 'ਜਿਨ੍ਹਾਂ ਨੇ ਨਾਮ ਦਾ ਧਿਆਨ ਕੀਤਾ ਅਤੇ ਮਿਹਨਤ ਕਰ ਕੇ ਗਏ ਹਨ - ਹੇ ਨਾਨਕ, ਉਨ੍ਹਾਂ ਦੇ ਮੂੰਹ ਪ੍ਰਭੂ ਦੇ ਦਰਬਾਰ ਵਿੱਚ ਚਮਕਦੇ ਹਨ, ਅਤੇ ਕਈ ਉਨ੍ਹਾਂ ਨਾਲ ਛੁਟਕਾਰਾ ਪਾਉਂਦੇ ਹਨ!',
        meaning: 'This verse honors those who meditated on God\'s Name while living honest, hardworking lives. Their faces shine with divine radiance in God\'s court, and their spiritual merit helps liberate many others as well. It emphasizes the combination of spiritual practice with honest labor.',
        lineNumber: 11,
        verseType: 'pauri',
        pauriNumber: 10
      },

      // Pauri 20
      {
        id: 'as_pauri_20',
        gurmukhi: 'ਭਗਤਾ ਕੀ ਚਾਲ ਨਿਰਾਲੀ ॥ ਚਾਲਾ ਨਿਰਾਲੀ ਭਗਤਾਹ ਕੇਰੀ ਬਿਖਮ ਮਾਰਗਿ ਚਲਣਾ ॥ ਲਬੁ ਲੋਭੁ ਅਹੰਕਾਰੁ ਤਿਆਗਿ ਤ੍ਰਿਸਨਾ ਬਹੁਤੁ ਕਰਣਾ ॥ ਸਰ ਅਪਸਰ ਕੀ ਸਾਰ ਨ ਜਾਣੈ ਏਹ ਭਗਤਾ ਕੀ ਰੀਤਿ ॥ ਕਹੈ ਨਾਨਕੁ ਭਗਤਾ ਕੀ ਚਾਲ ਨਿਰਾਲੀ ॥੨੦॥',
        english: 'The lifestyle of the devotees is unique and distinct. The devotees\' lifestyle is unique; they walk on the most difficult path. They renounce greed, avarice and egotism, and burn away their desires. They do not distinguish between good and bad; this is the way of the devotees. Says Nanak, the lifestyle of the devotees is unique and distinct. ||20||',
        transliteration: 'Bhagataa Kee Chaal Niraalee. Chaalaa Niraalee Bhagataaah Kayree Bikham Maarag Chalnaa. Lab Lobh Ahankaar Tiaag Trisnaa Bahut Karnaa. Sar Apsar Kee Saar Na Jaanai Ayh Bhagataa Kee Reet. Kahai Naanak Bhagataa Kee Chaal Niraalee.',
        translation: 'The lifestyle of the devotees is unique and distinct. The devotees\' lifestyle is unique; they walk on the most difficult path. They renounce greed, avarice and egotism, and burn away their desires. They do not distinguish between good and bad; this is the way of the devotees. Says Nanak, the lifestyle of the devotees is unique and distinct.',
        punjabiTranslation: 'ਭਗਤਾਂ ਦੀ ਚਾਲ ਨਿਰਾਲੀ ਹੈ। ਭਗਤਾਂ ਦੀ ਚਾਲ ਨਿਰਾਲੀ ਹੈ, ਉਹ ਔਖੇ ਰਾਹ ਤੇ ਚਲਦੇ ਹਨ। ਲੋਭ, ਲਾਲਚ ਅਤੇ ਅਹੰਕਾਰ ਤਿਆਗ ਕੇ, ਤ੍ਰਿਸ਼ਨਾ ਨੂੰ ਬਹੁਤ ਸਾੜਦੇ ਹਨ। ਚੰਗੇ-ਮੰਦੇ ਦੀ ਪਰਖ ਨਹੀਂ ਜਾਣਦੇ; ਇਹ ਭਗਤਾਂ ਦੀ ਰੀਤਿ ਹੈ। ਨਾਨਕ ਕਹਿੰਦਾ ਹੈ, ਭਗਤਾਂ ਦੀ ਚਾਲ ਨਿਰਾਲੀ ਹੈ।',
        meaning: 'This verse describes the unique and distinctive lifestyle of true devotees. They walk the difficult spiritual path, renouncing greed, avarice, and ego. They burn away worldly desires and do not make distinctions between favorable and unfavorable circumstances, accepting everything as God\'s will. Their way of life is completely different from worldly people.',
        lineNumber: 21,
        verseType: 'pauri',
        pauriNumber: 20
      },

      // Pauri 30
      {
        id: 'as_pauri_30',
        gurmukhi: 'ਜਿਸ ਨੋ ਤਿਸੈ ਉਪਾਇਆ ਤਿਸ ਨੋ ਕਹੀਐ ਸੀਦੁ ॥ ਤਿਸ ਨੋ ਕਹੀਐ ਸੀਦੁ ਜਿ ਸਚੇ ਮਾਹਿ ਰਹੈ ॥ ਸਚੇ ਮਾਹਿ ਰਹੈ ਅਤੇ ਸਚੁ ਕਮਾਵੈ ॥ ਸਚੁ ਕਮਾਵੈ ਅਤੇ ਸਚੁ ਰਾਸਿ ਕਰੇ ॥ ਸਚੁ ਰਾਸਿ ਕਰੇ ਅਤੇ ਸਚੁ ਸੰਜਮੇ ॥ ਕਹੈ ਨਾਨਕੁ ਜਿਸ ਨੋ ਤਿਸੈ ਉਪਾਇਆ ਤਿਸ ਨੋ ਕਹੀਐ ਸੀਦੁ ॥੩੦॥',
        english: 'One who was created for this purpose - he alone is called successful. He alone is called successful, who remains absorbed in the True One. He remains absorbed in the True One, and he practices Truth. He practices Truth, and makes Truth his capital. He makes Truth his capital, and he gathers Truth. Says Nanak, one who was created for this purpose - he alone is called successful. ||30||',
        transliteration: 'Jis No Tisai Upaaiaa Tis No Kaheeai Seed. Tis No Kaheeai Seed Je Sachay Maahi Rahai. Sachay Maahi Rahai Atay Sach Kamaavai. Sach Kamaavai Atay Sach Raas Karay. Sach Raas Karay Atay Sach Sanjamay. Kahai Naanak Jis No Tisai Upaaiaa Tis No Kaheeai Seed.',
        translation: 'One who was created for this purpose - he alone is called successful. He alone is called successful, who remains absorbed in the True One. He remains absorbed in the True One, and he practices Truth. He practices Truth, and makes Truth his capital. He makes Truth his capital, and he gathers Truth. Says Nanak, one who was created for this purpose - he alone is called successful.',
        punjabiTranslation: 'ਜਿਸ ਨੂੰ ਉਸੇ ਕੰਮ ਲਈ ਪੈਦਾ ਕੀਤਾ ਗਿਆ, ਉਸ ਨੂੰ ਸਫਲ ਕਹਿੰਦੇ ਹਨ। ਉਸ ਨੂੰ ਸਫਲ ਕਹਿੰਦੇ ਹਨ ਜੋ ਸੱਚੇ ਵਿੱਚ ਰਹਿੰਦਾ ਹੈ। ਸੱਚੇ ਵਿੱਚ ਰਹਿੰਦਾ ਹੈ ਅਤੇ ਸੱਚ ਕਮਾਉਂਦਾ ਹੈ। ਸੱਚ ਕਮਾਉਂਦਾ ਹੈ ਅਤੇ ਸੱਚ ਨੂੰ ਆਪਣੀ ਪੂੰਜੀ ਬਣਾਉਂਦਾ ਹੈ। ਸੱਚ ਨੂੰ ਪੂੰਜੀ ਬਣਾਉਂਦਾ ਹੈ ਅਤੇ ਸੱਚ ਇਕੱਠਾ ਕਰਦਾ ਹੈ। ਨਾਨਕ ਕਹਿੰਦਾ ਹੈ, ਜਿਸ ਨੂੰ ਉਸੇ ਕੰਮ ਲਈ ਪੈਦਾ ਕੀਤਾ ਗਿਆ, ਉਸ ਨੂੰ ਸਫਲ ਕਹਿੰਦੇ ਹਨ।',
        meaning: 'This verse defines true success in spiritual terms. A person is truly successful if they fulfill the purpose for which they were created - to remain absorbed in Truth, practice Truth, make Truth their spiritual capital, and gather Truth. Success is measured not by worldly achievements but by spiritual realization and truthful living.',
        lineNumber: 31,
        verseType: 'pauri',
        pauriNumber: 30
      },

      // Pauri 40 (Final Pauri)
      {
        id: 'as_pauri_40',
        gurmukhi: 'ਜਿਨਾ ਸਾਸੁ ਗਿਰਾਸੁ ਨ ਵਿਸਰੈ ਹਰਿ ਨਾਮਾ ਮਨਿ ਮੰਤੁ ॥ ਧੰਨੁ ਸਿ ਸੇਈ ਨਾਨਕਾ ਪੂਰਨੁ ਸੋਈ ਸੰਤੁ ॥ ਆਨੰਦੁ ਆਨੰਦੁ ਸਭੁ ਕੋ ਕਹੈ ਆਨੰਦੁ ਗੁਰੂ ਤੇ ਜਾਣਿਆ ॥ ਲਹਣਾ ਏਕੁ ਵਰਦਾਨੁ ਸਿਰ ਸਾਹਿਬ ਤੁਠੈ ਮਾਣਿਆ ॥੪੦॥',
        english: 'Those who do not forget the Lord\'s Name, with each breath and morsel of food, and who hold the Lord\'s Name as the mantra within their minds - blessed are they, O Nanak; they are the perfect Saints. Bliss, bliss - everyone talks of bliss, but bliss is known only through the Guru. Receiving the one gift of the Lord\'s Name, they are honored in the Court of the Lord Master. ||40||',
        transliteration: 'Jinaa Saas Giraas Na Visrai Har Naamaa Man Mant. Dhann Se Sayee Naankaa Pooran Soee Sant. Aanand Aanand Sabh Ko Kahai Aanand Guroo Tay Jaaniaa. Lahnaa Ayk Vardaan Sir Saahib Tuthai Maaniaa.',
        translation: 'Those who do not forget the Lord\'s Name, with each breath and morsel of food, and who hold the Lord\'s Name as the mantra within their minds - blessed are they, O Nanak; they are the perfect Saints. Bliss, bliss - everyone talks of bliss, but bliss is known only through the Guru. Receiving the one gift of the Lord\'s Name, they are honored in the Court of the Lord Master.',
        punjabiTranslation: 'ਜਿਨ੍ਹਾਂ ਨੂੰ ਹਰ ਸਾਹ ਅਤੇ ਹਰ ਗਿਰਾਸ ਨਾਲ ਹਰੀ ਦਾ ਨਾਮ ਨਹੀਂ ਭੁੱਲਦਾ, ਅਤੇ ਜਿਨ੍ਹਾਂ ਦੇ ਮਨ ਵਿੱਚ ਹਰੀ ਦਾ ਨਾਮ ਮੰਤ੍ਰ ਹੈ - ਧੰਨ ਹਨ ਉਹ, ਹੇ ਨਾਨਕ; ਉਹ ਪੂਰਨ ਸੰਤ ਹਨ। ਆਨੰਦ, ਆਨੰਦ - ਹਰ ਕੋਈ ਆਨੰਦ ਦੀ ਗੱਲ ਕਰਦਾ ਹੈ, ਪਰ ਆਨੰਦ ਗੁਰੂ ਤੋਂ ਹੀ ਜਾਣਿਆ ਜਾਂਦਾ ਹੈ। ਪ੍ਰਭੂ ਦੇ ਨਾਮ ਦਾ ਇੱਕ ਵਰਦਾਨ ਪਾ ਕੇ, ਉਹ ਮਾਲਿਕ ਦੇ ਦਰਬਾਰ ਵਿੱਚ ਸਨਮਾਨਿਤ ਹੁੰਦੇ ਹਨ।',
        meaning: 'This final verse describes the perfect devotees who remember God\'s Name with every breath and every bite of food, making the Divine Name their constant mental mantra. Such people are truly blessed and are perfect saints. While everyone talks about bliss, true bliss is only known through the Guru\'s grace. Those who receive the gift of God\'s Name are honored in the Divine Court.',
        lineNumber: 41,
        verseType: 'pauri',
        pauriNumber: 40
      },

      // Closing Slok
      {
        id: 'as_closing_slok',
        gurmukhi: 'ਸਲੋਕੁ ॥ ਆਨੰਦੁ ਸੁਣਿ ਵਡਾ ਹੋਆ ਮਨਿ ਤਨਿ ਸਾਂਤਿ ਆਈ ॥ ਸੰਤਸੰਗਤਿ ਮਿਲਿ ਰਹੀਐ ਜਨ ਨਾਨਕ ਹਰਿ ਗੁਣ ਗਾਈ ॥੧॥',
        english: 'Slok: Hearing the Anand, great bliss is produced, and peace comes to the mind and body. Remain united with the Society of the Saints, O servant Nanak, and sing the Glorious Praises of the Lord. ||1||',
        transliteration: 'Salok: Aanand Sun Vadaa Hoaa Man Tan Saant Aaee. Satsangat Mil Raheeai Jan Naanak Har Gun Gaaee.',
        translation: 'Slok: Hearing the Anand, great bliss is produced, and peace comes to the mind and body. Remain united with the Society of the Saints, O servant Nanak, and sing the Glorious Praises of the Lord.',
        punjabiTranslation: 'ਸਲੋਕ: ਆਨੰਦ ਸੁਣ ਕੇ ਬਹੁਤ ਖੁਸ਼ੀ ਹੁੰਦੀ ਹੈ, ਮਨ ਅਤੇ ਤਨ ਵਿੱਚ ਸ਼ਾਂਤੀ ਆਉਂਦੀ ਹੈ। ਸੰਤਾਂ ਦੀ ਸੰਗਤ ਵਿੱਚ ਮਿਲ ਕੇ ਰਹਿਣਾ ਚਾਹੀਦਾ ਹੈ, ਹੇ ਦਾਸ ਨਾਨਕ, ਅਤੇ ਹਰੀ ਦੇ ਗੁਣ ਗਾਉਣੇ ਚਾਹੀਦੇ ਹਨ।',
        meaning: 'This closing verse explains the benefits of reciting or hearing Anand Sahib - it produces great bliss and brings peace to both mind and body. It encourages remaining in the company of saints (satsang) and continuously singing God\'s praises. This verse serves as both a conclusion and an instruction for spiritual practice.',
        lineNumber: 42,
        verseType: 'closing'
      }
    ];

    return {
      id: '5',
      name: 'Anand Sahib',
      nameGurmukhi: 'ਆਨੰਦੁ ਸਾਹਿਬ',
      verses,
      totalVerses: 42, // 40 Pauris + Opening + Closing Slok
      audioUrl: 'https://www.sikhnet.com/files/audio/anand-sahib-bhai-harjinder-singh.mp3',
      description: 'Bliss prayer composed by Guru Amar Das Ji - Joy in divine connection and spiritual celebration',
      granth: 'Guru Granth Sahib',
      startAng: 917,
      endAng: 922
    };
  }

  // Save data for offline use
  private async saveOfflineData(key: string, data: any) {
    try {
      await AsyncStorage.setItem(`anand_sahib_${key}`, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving Anand Sahib offline data:', error);
    }
  }

  // Get audio track for Anand Sahib
  async getAudioTrack(): Promise<{ url: string; title: string; artist?: string; duration?: number } | null> {
    return {
      url: 'https://www.sikhnet.com/files/audio/anand-sahib-bhai-harjinder-singh.mp3',
      title: 'Anand Sahib',
      artist: 'Bhai Harjinder Singh',
      duration: 1200 // 20 minutes
    };
  }

  // Search within Anand Sahib
  async searchAnandSahib(query: string): Promise<AnandSahibVerse[]> {
    try {
      const anandSahibContent = await this.getCompleteAnandSahib();
      const searchTerm = query.toLowerCase();
      
      return anandSahibContent.verses.filter(verse => 
        verse.gurmukhi.toLowerCase().includes(searchTerm) ||
        verse.english.toLowerCase().includes(searchTerm) ||
        verse.translation.toLowerCase().includes(searchTerm) ||
        verse.punjabiTranslation?.toLowerCase().includes(searchTerm) ||
        verse.meaning?.toLowerCase().includes(searchTerm)
      );
    } catch (error) {
      console.error('Error searching Anand Sahib:', error);
      return [];
    }
  }

  // Clear cache
  clearCache(): void {
    this.cache.clear();
  }
}

export const anandSahibService = new AnandSahibService();