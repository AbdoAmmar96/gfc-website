import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowLeft, ArrowRight, LayoutGrid, Cable, Zap, Package } from 'lucide-react';
import SEO from '../components/SEO';
import Loader from '../components/Loader';
import { fetchServices, asset, publicAsset } from '../lib/api';
import { t as tt } from '../lib/translatable';

const FILTERS = [
  { slug: 'all',          icon: LayoutGrid },
  { slug: 'copper-cat6',  icon: Cable },
  { slug: 'copper-cat6a', icon: Cable },
  { slug: 'fiber-optic',  icon: Zap },
  { slug: 'accessories',  icon: Package },
];

// Fallback image for each product slug — uses bundled images in public/images
const fallbackImage = (slug) => publicAsset(`/images/product-${slug}.jpg`);

export default function Services() {
  const { t, i18n } = useTranslation();
  const [services, setServices] = useState(null);
  const [active, setActive] = useState('all');
  const Chev = i18n.language === 'ar' ? ChevronLeft : ChevronRight;
  const Arrow = i18n.language === 'ar' ? ArrowLeft : ArrowRight;

  useEffect(() => { fetchServices().then(setServices).catch(() => setServices([])); }, []);
  if (!services) return <Loader />;

  const filtered = active === 'all' ? services : services.filter(s => s.slug === active);

  return (
    <>
      <SEO title={t('services.title')} description={t('services.subtitle')} />

      {/* Hero */}
      <section className="relative min-h-[55vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${publicAsset('/images/hero-products.jpg')}')` }} />
        <div className="hero-overlay" />
        <div className="container-x relative z-10 py-16 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              {t('services.title')}
            </h1>
            <nav className="mt-5 flex items-center justify-center gap-2 text-sm text-white/80">
              <Link to="/" className="hover:text-primary-400 transition">{t('nav.home')}</Link>
              <Chev size={16} />
              <span className="text-primary-400">{t('services.breadcrumb')}</span>
            </nav>
          </motion.div>
        </div>
      </section>

      {/* Filter pills */}
      <section className="py-8 bg-white border-b border-ink-200">
        <div className="container-x">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {FILTERS.map(({ slug, icon: Icon }) => {
              const isActive = active === slug;
              const count = slug === 'all' ? services.length : services.filter(s => s.slug === slug).length;
              return (
                <button
                  key={slug}
                  onClick={() => setActive(slug)}
                  className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition border ${
                    isActive
                      ? 'bg-primary-500 text-white border-primary-500 shadow-lg shadow-primary-500/30'
                      : 'bg-white text-ink-700 border-ink-200 hover:border-primary-500 hover:text-primary-500'
                  }`}
                >
                  <Icon size={16} />
                  {t(`services.filters.${slug.replace(/-/g, '')}`)}
                  <span className={`text-xs rounded-full px-2 py-0.5 ${isActive ? 'bg-white/20' : 'bg-ink-100'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="mt-5 text-center text-sm text-ink-500">
            {t('services.showing', { count: filtered.length })}
          </div>
        </div>
      </section>

      {/* Products grid */}
      <section className="py-16 bg-ink-50">
        <div className="container-x grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => {
            const img = p.image ? asset(p.image) : fallbackImage(p.slug);
            const isFiber = p.slug === 'fiber-optic';
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Link
                  to={`/services/${p.slug}`}
                  className="group block h-full overflow-hidden rounded-2xl bg-white border border-ink-200 hover:border-primary-500 hover:shadow-xl transition"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-ink-100">
                    {/* For fiber optic, use a gradient placeholder if no image */}
                    {isFiber && !p.image ? (
                      <div className="w-full h-full flex items-center justify-center text-white"
                           style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #FB9F20 200%)' }}>
                        <div className="text-center p-8">
                          <Zap size={48} className="mx-auto opacity-80" />
                          <div className="mt-3 text-2xl font-bold">Fiber Optic</div>
                        </div>
                      </div>
                    ) : (
                      <img src={img} alt="" className="w-full h-full object-cover transition group-hover:scale-105"
                           onError={(e) => { e.target.style.display = 'none'; }} />
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-ink-900 group-hover:text-primary-500 transition">
                      {tt(p.title)}
                    </h3>
                    <p className="mt-2 text-sm text-ink-500 line-clamp-2">{tt(p.short_description)}</p>
                    <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary-500">
                      {t('common.learnMore')}
                      <Arrow size={16} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA: Need custom solutions? */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${publicAsset('/images/hero-cta.jpg')}')` }} />
        <div className="absolute inset-0 bg-ink-950/85" />
        <div className="container-x relative z-10 py-20 text-center text-white">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            {t('services.cta.title')}
          </h2>
          <p className="mt-5 text-lg text-white/85 max-w-2xl mx-auto">
            {t('services.cta.body')}
          </p>
          <div className="mt-8">
            <Link to="/contact" className="btn-primary">
              {t('services.cta.button')}
              <Arrow size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
