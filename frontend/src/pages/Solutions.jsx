import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import SEO from '../components/SEO';
import Loader from '../components/Loader';
import { fetchSolutions } from '../lib/api';
import { t as tt } from '../lib/translatable';

export default function Solutions() {
  const { t } = useTranslation();
  const [items, setItems] = useState(null);
  useEffect(() => { fetchSolutions().then(setItems).catch(() => setItems([])); }, []);
  if (!items) return <Loader />;

  return (
    <>
      <SEO title={t('solutions.title')} description={t('solutions.subtitle')} />
      <section className="bg-gradient-to-br from-ink-900 to-ink-800 text-white py-20 md:py-28">
        <div className="container-x text-center">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold">{t('solutions.title')}</h1>
          <p className="mt-6 text-lg text-white/80 max-w-3xl mx-auto">{t('solutions.subtitle')}</p>
        </div>
      </section>
      <section className="section">
        <div className="container-x grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((s) => {
            const iconKey = s.icon ? s.icon.split('-').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('') : 'Lightbulb';
            const Icon = Icons[iconKey] || Icons.Lightbulb;
            return (
              <Link key={s.id} to={`/solutions/${s.slug}`} className="group">
                <div className="card-hover h-full">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-500/10 text-accent-600 group-hover:bg-accent-600 group-hover:text-white transition">
                    <Icon size={24} />
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-ink-900 group-hover:text-primary-500">{tt(s.title)}</h3>
                  <p className="mt-3 text-ink-500 leading-relaxed">{tt(s.short_description)}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
