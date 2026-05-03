import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Loader from '../components/Loader';
import { fetchProjects, asset } from '../lib/api';
import { t as tt } from '../lib/translatable';

export default function Projects() {
  const { t } = useTranslation();
  const [projects, setProjects] = useState(null);
  useEffect(() => { fetchProjects().then(setProjects).catch(() => setProjects([])); }, []);
  if (!projects) return <Loader />;

  return (
    <>
      <SEO title={t('projects.title')} description={t('projects.subtitle')} />
      <section className="bg-gradient-to-br from-ink-900 to-ink-800 text-white py-20 md:py-28">
        <div className="container-x text-center">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold">{t('projects.title')}</h1>
          <p className="mt-6 text-lg text-white/80 max-w-3xl mx-auto">{t('projects.subtitle')}</p>
        </div>
      </section>
      <section className="section">
        <div className="container-x grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <Link key={p.id} to={`/projects/${p.slug}`} className="group block overflow-hidden rounded-2xl bg-white border border-ink-200 hover:shadow-xl transition">
              <div className="aspect-[4/3] overflow-hidden bg-ink-100">
                {p.cover_image ? (
                  <img src={asset(p.cover_image)} alt="" className="h-full w-full object-cover transition group-hover:scale-105" />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-primary-100 to-primary-50" />
                )}
              </div>
              <div className="p-6">
                {p.industry && <span className="text-xs font-semibold uppercase tracking-wider text-primary-500">{tt(p.industry)}</span>}
                <h3 className="mt-2 text-lg font-bold text-ink-900 group-hover:text-primary-500">{tt(p.title)}</h3>
                <p className="mt-2 text-sm text-ink-500 line-clamp-2">{tt(p.summary)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
