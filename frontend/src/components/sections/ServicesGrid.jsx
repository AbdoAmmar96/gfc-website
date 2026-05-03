import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { t as tt } from '../../lib/translatable';

export default function ServicesGrid({ services }) {
  const { t } = useTranslation();

  return (
    <section className="section bg-ink-50">
      <div className="container-x">
        <div className="text-center max-w-3xl mx-auto">
          <span className="brand-badge">GF CARE</span>
          <h2 className="mt-6 section-title">{t('home.servicesTitle')}</h2>
          <p className="section-subtitle mx-auto">{t('home.servicesSubtitle')}</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const iconKey = service.icon
              ? service.icon.split('-').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('')
              : 'Cube';
            const Icon = Icons[iconKey] || Icons.Cube;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Link to={`/services/${service.slug}`} className="group block h-full">
                  <div className="card-hover h-full">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary-100 text-primary-500 group-hover:bg-primary-500 group-hover:text-white transition">
                      <Icon size={26} />
                    </div>
                    <h3 className="mt-5 text-xl font-bold text-ink-900 group-hover:text-primary-500 transition">
                      {tt(service.title)}
                    </h3>
                    <p className="mt-3 text-ink-500 leading-relaxed">
                      {tt(service.short_description)}
                    </p>
                    <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary-500">
                      {t('common.learnMore')}
                      <Icons.ArrowRight size={16} className="rtl:rotate-180 transition group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
