import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { t as tt } from '../../lib/translatable';

export default function AboutPreview({ settings }) {
  const { t, i18n } = useTranslation();
  const Arrow = i18n.language === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <section className="section bg-white">
      <div className="container-x grid gap-12 lg:gap-16 lg:grid-cols-2 items-center">
        {/* Heading side (right in RTL = first in flow) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="brand-badge">{t('nav.about')}</span>
          <h2 className="mt-6 font-display text-4xl md:text-5xl lg:text-6xl font-bold text-ink-900 leading-tight">
            {t('home.aboutPreviewTitle')}
          </h2>
          <div className="mt-4 h-1 w-24 bg-primary-500 rounded-full" />
        </motion.div>

        {/* Body side */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <p className="text-lg text-ink-600 leading-loose">
            {settings ? tt(settings.about_short) : t('home.aboutPreviewBody')}
          </p>
          <Link
            to="/about"
            className="mt-6 inline-flex items-center gap-2 font-semibold text-primary-500 hover:text-primary-600 transition group"
          >
            {t('home.aboutPreviewLink')}
            <Arrow size={18} className="transition group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
