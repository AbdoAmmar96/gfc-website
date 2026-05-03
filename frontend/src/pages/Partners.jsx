import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import Loader from '../components/Loader';
import { fetchPartners, asset } from '../lib/api';

export default function Partners() {
  const { t } = useTranslation();
  const [partners, setPartners] = useState(null);
  useEffect(() => { fetchPartners().then(setPartners).catch(() => setPartners([])); }, []);
  if (!partners) return <Loader />;

  return (
    <>
      <SEO title={t('partners.title')} description={t('partners.subtitle')} />
      <section className="bg-gradient-to-br from-ink-900 to-ink-800 text-white py-20 md:py-28">
        <div className="container-x text-center">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold">{t('partners.title')}</h1>
          <p className="mt-6 text-lg text-white/80 max-w-3xl mx-auto">{t('partners.subtitle')}</p>
        </div>
      </section>
      <section className="section">
        <div className="container-x grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {partners.map((p) => (
            <a key={p.id} href={p.website || '#'} target="_blank" rel="noreferrer" className="card flex aspect-square items-center justify-center hover:border-primary-500 transition">
              {p.logo ? (
                <img src={asset(p.logo)} alt={p.name} className="max-h-20 max-w-[160px] object-contain grayscale hover:grayscale-0 transition" />
              ) : (
                <span className="font-bold text-ink-700">{p.name}</span>
              )}
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
