import { useTranslation } from 'react-i18next';
import { Award, Handshake, Headset, MapPin } from 'lucide-react';

export default function WhyUs() {
  const { t } = useTranslation();

  const items = [
    { icon: Award,     key: 'experience' },
    { icon: Handshake, key: 'vendors' },
    { icon: Headset,   key: 'support' },
    { icon: MapPin,    key: 'regional' },
  ];

  return (
    <section className="section">
      <div className="container-x">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="section-title">{t('home.whyUsTitle')}</h2>
          <p className="section-subtitle mx-auto">{t('home.whyUsSubtitle')}</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, key }) => (
            <div key={key} className="text-center group">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-500 text-white shadow-lg shadow-primary-500/30 transition group-hover:scale-110">
                <Icon size={28} />
              </div>
              <h3 className="mt-5 text-lg font-bold text-ink-900">
                {t(`home.whyUs.${key}.title`)}
              </h3>
              <p className="mt-2 text-sm text-ink-500 leading-relaxed">
                {t(`home.whyUs.${key}.body`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
