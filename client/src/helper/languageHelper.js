//ISO639-1 langauge code standard

// const ARABIC = { code: "ar", language: "Arabic" };
const CHINESE_SIMPLIFIED = { code: "zh-cn", language: "Chinese Simplified" };
const CHINESE_TRADITIONAL = { code: "zh-tw", language: "Chinese Traditional" };
const CZECH = { code: "cs", language: "Czech" };
const DANISH = { code: "da", language: "Danish" };
const DUTCH = { code: "nl", language: "Dutch" };
// const ENGLISH = { code: "en", language: "English" };
const FINNISH = { code: "fi", language: "Finnish" };
const FRENCH = { code: "fr", language: "French" };
const GERMAN = { code: "de", language: "German" };
const ITALIAN = { code: "it", language: "Italian" };
const JAPANESE = { code: "ja", language: "Japanese" };
const KOREAN = { code: "ko", language: "Korean" };
const NORWEGIAN = { code: "no", language: "Norwegian" };
const POLISH = { code: "pl", language: "Polish" };
const PORTUGUESE = { code: "pt", language: "Portuguese" };
const RUSSIAN = { code: "ru", language: "Russian" };
const SPANISH = { code: "es", language: "Spanish" };
const SWEDISH = { code: "sv", language: "Swedish" };
const THAI = { code: "th", language: "Thai" };
const VIETNAMESE = { code: "vi", language: "Vietnamese" };


export function codeTolanguage(code) {
  const found = Object.values(LANGUAGES).find(lan => lan.code === code);
  if (found) return found.language;
  return null;
}

export function languageTocode(language) {
  const found = Object.values(LANGUAGES).find(lan => lan.language = language);
  if (found) return found.code;
  return null;
}

export const LANGUAGES = Object.freeze({
  // ARABIC,
  CHINESE_SIMPLIFIED,
  CHINESE_TRADITIONAL,
  CZECH,
  DANISH,
  DUTCH,
  // ENGLISH,
  FINNISH,
  FRENCH,
  GERMAN,
  ITALIAN,
  JAPANESE,
  KOREAN,
  NORWEGIAN,
  POLISH,
  PORTUGUESE,
  RUSSIAN,
  SPANISH,
  SWEDISH,
  THAI,
  VIETNAMESE,
});


export default {
  LANGUAGES,
  codeTolanguage,
  languageTocode
}
