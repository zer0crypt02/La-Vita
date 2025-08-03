// LibreTranslate API service
const LIBRE_TRANSLATE_URL = 'https://libretranslate.com/translate';
const BACKUP_TRANSLATE_URL = 'https://api.mymemory.translated.net/get';

export interface TranslationResponse {
  translatedText: string;
  detectedLanguage?: {
    confidence: number;
    language: string;
  };
}

export const translateText = async (
  text: string,
  targetLang: string,
  sourceLang: string = 'auto'
): Promise<string> => {
  try {
    console.log(`Translating: "${text}" from ${sourceLang} to ${targetLang}`);

    // Önce LibreTranslate deneyelim
    try {
      const response = await fetch(LIBRE_TRANSLATE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          q: text,
          source: sourceLang,
          target: targetLang,
          format: 'text',
        }),
      });

      console.log('LibreTranslate response status:', response.status);

      if (response.ok) {
        const data: TranslationResponse = await response.json();
        console.log('LibreTranslate result:', data);
        return data.translatedText;
      }
    } catch (libreError) {
      console.log('LibreTranslate failed, trying backup API');
    }

    // Backup API: MyMemory
    const langPair = `${
      sourceLang === 'auto' ? 'tr' : sourceLang
    }|${targetLang}`;
    const backupUrl = `${BACKUP_TRANSLATE_URL}?q=${encodeURIComponent(
      text
    )}&langpair=${langPair}`;

    console.log('Trying backup API:', backupUrl);

    const backupResponse = await fetch(backupUrl);
    const backupData = await backupResponse.json();

    console.log('Backup API result:', backupData);

    if (backupData.responseStatus === 200) {
      return backupData.responseData.translatedText;
    }

    throw new Error('Both translation APIs failed');
  } catch (error) {
    console.error('Translation error:', error);
    return text; // Return original text if translation fails
  }
};

// Cache for translations to avoid repeated API calls
const translationCache = new Map<string, string>();

export const translateWithCache = async (
  text: string,
  targetLang: string,
  sourceLang: string = 'auto'
): Promise<string> => {
  const cacheKey = `${text}_${sourceLang}_${targetLang}`;

  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey)!;
  }

  const translatedText = await translateText(text, targetLang, sourceLang);
  translationCache.set(cacheKey, translatedText);

  return translatedText;
};

// Batch translation for multiple texts
export const translateBatch = async (
  texts: string[],
  targetLang: string,
  sourceLang: string = 'auto'
): Promise<string[]> => {
  console.log(`Batch translating ${texts.length} texts to ${targetLang}`);

  // Tek seferde tüm metinleri birleştirip çevirelim
  const combinedText = texts.join('\n---SPLIT---\n');

  try {
    const translatedCombined = await translateText(
      combinedText,
      targetLang,
      sourceLang
    );
    const translatedTexts = translatedCombined.split('\n---SPLIT---\n');

    console.log('Batch translation completed');
    return translatedTexts;
  } catch (error) {
    console.error(
      'Batch translation failed, falling back to individual translations'
    );
    // Hata durumunda tek tek çevir
    const promises = texts.map((text) =>
      translateWithCache(text, targetLang, sourceLang)
    );
    return Promise.all(promises);
  }
};
