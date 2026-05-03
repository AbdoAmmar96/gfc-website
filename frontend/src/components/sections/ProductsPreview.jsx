import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Zap } from 'lucide-react';
import { asset, publicAsset } from '../../lib/api';
import { t as tt } from '../../lib/translatable';

const fallbackImage = (slug) => publicAsset(`/images/product-${slug}.jpg`);

export default function ProductsPreview({ services }) {
  const { t, i18n } = useTranslation();
  const Arrow = i18n.language === 'ar' ? ArrowLeft : ArrowRight;
  const items = (services || []).slice(0, 4);

  return (
    <section className="section bg-white">
      <div className="container-x">
        <div className="text-center max-w-3xl mx-auto">
          <span className="brand-badge">{t('nav.products')}</span>
          <h2 className="mt-6 section-title">{t('home.productsTitle')}</h2>
          <p className="section-subtitle mx-auto">{t('home.productsSubtitle')}</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {items.map((p, i) => {
            const img = p.image ? asset(p.image) : fallbackImage(p.slug);
            const isFiber = p.slug === 'fiber-optic' && !p.image;
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Link to={`/services/${p.slug}`} className="group block relative overflow-hidden rounded-2xl aspect-[16/10]">
                  {isFiber ? (
                    <div className="absolute inset-0 flex items-center justify-center text-white"
                         style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #FB9F20 200%)' }}>
                      <Zap size={64} className="opacity-50" />
                    </div>
                  ) : (
                    <img src={img} alt="" className="absolute inset-0 w-full h-full object-cover transition group-hover:scale-105" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute inset-0 p-6 flex flex-col justify-between">
                    <span className="self-start flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur text-white transition group-hover:bg-primary-500 group-hover:scale-110">
                      <Arrow size={18} />
                    </span>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{tt(p.title)}</h3>
                      <p className="mt-2 text-sm text-white/85 line-clamp-2">{tt(p.short_description)}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link to="/services" className="btn bg-ink-900 text-white hover:bg-ink-800">
            {t('home.viewAllProducts')}
            <Arrow size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
