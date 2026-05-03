import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Phone, ArrowRight, ArrowLeft, ChevronDown } from 'lucide-react';
import { asset, publicAsset } from '../../lib/api';
import { t as tt } from '../../lib/translatable';

export default function Hero({ settings }) {
  const { t, i18n } = useTranslation();
  const Arrow = i18n.language === 'ar' ? ArrowLeft : ArrowRight;

  // Use admin-uploaded hero image if present, else the bundled default
  const heroImg = settings?.hero_image ? asset(settings.hero_image) : publicAsset('/images/hero-home.jpg');

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image with dark overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImg})` }}
        role="img"
        aria-label=""
      />
      <div className="hero-overlay" />

      {/* Content */}
      <div className="container-x relative z-10 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <span className="brand-badge">GF CARE</span>

          <h1 className="mt-8 font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            {settings ? tt(settings.hero_title) : t('home.heroTitle')}
          </h1>

          <p className="mt-6 text-lg md:text-xl text-white/85 max-w-2xl mx-auto leading-relaxed">
            {settings ? tt(settings.hero_subtitle) : t('home.heroSubtitle')}
          </p>

          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="btn border-2 border-white/40 bg-white/10 backdrop-blur text-white hover:bg-white/20">
              <Phone size={16} />
              {t('common.contactUs')}
            </Link>
            <Link to="/services" className="btn-primary">
              {t('home.exploreProducts')}
              <Arrow size={18} />
            </Link>
          </div>
        </motion.div>

        {/* Scroll-down indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="animate-bounce text-white/60">
            <ChevronDown size={28} />
          </div>
        </motion.div>
      </div>

      {/* WhatsApp floating button */}
      {settings?.whatsapp && (
        <a
          href={`https://wa.me/${settings.whatsapp.replace(/\D/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 end-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl hover:scale-110 transition"
          aria-label="WhatsApp"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
            <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
          </svg>
        </a>
      )}
    </section>
  );
}
