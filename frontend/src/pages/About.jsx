import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, Truck, Settings, Tag, ChevronLeft, ChevronRight } from 'lucide-react';
import SEO from '../components/SEO';
import Loader from '../components/Loader';
import Stats from '../components/sections/Stats';
import { fetchSettings, publicAsset } from '../lib/api';

export default function About() {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState({ loading: true });
  const Chev = i18n.language === 'ar' ? ChevronLeft : ChevronRight;

  useEffect(() => {
    fetchSettings()
      .then((settings) => setData({ settings, loading: false }))
      .catch(() => setData({ loading: false }));
  }, []);

  if (data.loading) return <Loader />;

  const VALUES = [
    { num: '01', icon: Award,    key: 'globalStandards' },
    { num: '02', icon: Truck,    key: 'fastDelivery' },
    { num: '03', icon: Settings, key: 'allProjectSizes' },
    { num: '04', icon: Tag,      key: 'competitivePricing' },
  ];

  return (
    <>
      <SEO title={t('about.title')} />

      {/* === Hero with breadcrumb === */}
      <section className="relative min-h-[55vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${publicAsset('/images/hero-about.jpg')}')` }}
        />
        <div className="hero-overlay" />
        <div className="container-x relative z-10 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              {t('about.heroTitle')}
            </h1>
            <nav className="mt-5 flex items-center justify-center gap-2 text-sm text-white/80">
              <Link to="/" className="hover:text-primary-400 transition">{t('nav.home')}</Link>
              <Chev size={16} />
              <span className="text-primary-400">{t('nav.about')}</span>
            </nav>
          </motion.div>
        </div>
      </section>

      {/* === Story === */}
      <section className="py-20 bg-white">
        <div className="container-x grid gap-12 lg:gap-16 lg:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div
              className="aspect-[4/5] w-full rounded-2xl bg-cover bg-center shadow-xl"
              style={{ backgroundImage: `url('${publicAsset('/images/story.jpg')}')` }}
            />
            <div className="absolute bottom-6 right-6 md:right-auto md:left-6 bg-primary-500 rounded-2xl px-6 py-5 shadow-2xl shadow-primary-500/40">
              <div className="font-display text-4xl md:text-5xl font-bold text-white">+500</div>
              <div className="mt-1 text-sm text-white/90 font-semibold">{t('about.story.projectsLabel')}</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="brand-badge">{t('about.story.badge')}</span>
            <p className="mt-6 text-lg text-ink-600 leading-loose">
              {t('about.story.body')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* === Vision === */}
      <section className="py-20 bg-ink-50">
        <div className="container-x max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl border border-ink-200 p-10 md:p-14 relative overflow-hidden"
          >
            <div className="absolute inset-y-0 left-0 w-1.5 bg-primary-500" />
            <span className="brand-badge">{t('about.vision.badge')}</span>
            <h2 className="mt-6 font-display text-2xl md:text-3xl lg:text-4xl font-bold text-ink-900 leading-loose">
              "{t('about.vision.body')}"
            </h2>
          </motion.div>
        </div>
      </section>

      {/* === Core Values === */}
      <section className="py-20 bg-white">
        <div className="container-x">
          <div className="text-center max-w-3xl mx-auto">
            <span className="brand-badge">{t('about.values.badge')}</span>
            <h2 className="mt-6 section-title">{t('about.values.title')}</h2>
            <p className="section-subtitle mx-auto">{t('about.values.subtitle')}</p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {VALUES.map(({ num, icon: Icon, key }, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="card-hover relative"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-primary-500">
                    <Icon size={22} />
                  </div>
                  <span className="font-display text-5xl md:text-6xl font-bold text-ink-200 leading-none">
                    {num}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-bold text-ink-900">
                  {t(`about.values.items.${key}.title`)}
                </h3>
                <p className="mt-2 text-ink-500 leading-relaxed">
                  {t(`about.values.items.${key}.body`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Stats />
    </>
  );
}
