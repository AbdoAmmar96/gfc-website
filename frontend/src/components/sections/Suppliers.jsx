import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { asset } from '../../lib/api';

export default function Suppliers({ partners }) {
  const { t } = useTranslation();
  if (!partners?.length) return null;

  return (
    <section className="section bg-white">
      <div className="container-x">
        <div className="text-center max-w-3xl mx-auto">
          <span className="brand-badge">{t('home.suppliersBadge')}</span>
          <h2 className="mt-6 section-title">{t('home.suppliersTitle')}</h2>
          <p className="section-subtitle mx-auto">{t('home.suppliersSubtitle')}</p>
        </div>

        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {partners.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              className="aspect-[2/1] flex items-center justify-center rounded-2xl border border-ink-200 bg-white p-6 transition hover:border-primary-500 hover:shadow-lg"
            >
              {p.logo ? (
                <img
                  src={asset(p.logo)}
                  alt={p.name}
                  className="max-h-14 max-w-[160px] object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition"
                />
              ) : (
                <span className="font-bold text-ink-700 tracking-wide">{p.name}</span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
