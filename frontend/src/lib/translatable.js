import i18n from './i18n';

/**
 * Pick the active-language value from a translatable JSON object
 * coming from the Laravel backend. Falls back to English, then any value.
 *
 *   t({ ar: 'مرحبا', en: 'Hello' })  →  'مرحبا'  (when lng=ar)
 *   t('plain string')                →  'plain string'
 */
export function t(value, lang) {
  if (value == null) return '';
  if (typeof value === 'string') return value;
  const lng = lang || i18n.language || 'en';
  if (typeof value === 'object') {
    return value[lng] || value.en || value.ar || Object.values(value)[0] || '';
  }
  return String(value);
}

/** Translatable list (e.g. service.features = [{ ar, en }, ...]) */
export function tList(arr, lang) {
  if (!Array.isArray(arr)) return [];
  return arr.map((item) => t(item, lang)).filter(Boolean);
}
