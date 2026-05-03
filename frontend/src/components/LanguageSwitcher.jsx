import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher({ dark = false }) {
  const { i18n } = useTranslation();
  const next = i18n.language === 'ar' ? 'en' : 'ar';
  const label = i18n.language === 'ar' ? 'English' : 'عربي';

  const baseClasses = dark
    ? 'border border-white/30 text-white hover:bg-white/10'
    : 'border border-ink-200 text-ink-700 hover:bg-ink-100';

  return (
    <button
      onClick={() => i18n.changeLanguage(next)}
      className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition ${baseClasses}`}
      aria-label="Change language"
    >
      <Globe size={16} />
      {label}
    </button>
  );
}
