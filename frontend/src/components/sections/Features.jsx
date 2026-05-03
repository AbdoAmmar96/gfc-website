import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Headphones, Zap, ShieldCheck } from 'lucide-react';

export default function Features() {
  const { t } = useTranslation();

  const items = [
    { icon: Headphones,  key: 'specializedService' },
    { icon: Zap,         key: 'fastDelivery' },
    { icon: ShieldCheck, key: 'globalStandards' },
  ];

  return (
    <section className="bg-ink-50 py-20">
      <div className="container-x grid gap-6 md:grid-cols-3">
        {items.map(({ icon: Icon, key }, i) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="card text-center bg-white"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-100 text-primary-500">
              <Icon size={28} />
            </div>
            <h3 className="mt-6 text-xl font-bold text-ink-900">
              {t(`home.features.${key}.title`)}
            </h3>
            <p className="mt-3 text-ink-500 leading-relaxed">
              {t(`home.features.${key}.body`)}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
