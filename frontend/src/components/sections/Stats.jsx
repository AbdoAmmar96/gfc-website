import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function Stats() {
  const { t } = useTranslation();

  const items = [
    { value: '24/7', key: 'support' },
    { value: '99%',  key: 'satisfaction' },
    { value: '+50',  key: 'clients' },
    { value: '+500', key: 'projects' },
  ];

  return (
    <section className="bg-ink-900 py-16">
      <div className="container-x">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 divide-y md:divide-y-0 md:divide-x divide-white/10 rtl:md:divide-x-reverse">
          {items.map((s, i) => (
            <motion.div
              key={s.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="text-center px-4 pt-6 md:pt-0"
            >
              <div className="font-display text-5xl md:text-6xl font-bold text-primary-500">
                {s.value}
              </div>
              <div className="mt-3 text-sm md:text-base text-white/60">
                {t(`home.stats.${s.key}`)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
