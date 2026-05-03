import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { asset } from '../../lib/api';
import { t as tt } from '../../lib/translatable';

export default function FeaturedProjects({ projects }) {
  const { t } = useTranslation();
  if (!projects?.length) return null;

  return (
    <section className="section bg-ink-50">
      <div className="container-x">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h2 className="section-title">{t('home.projectsTitle')}</h2>
            <p className="section-subtitle">{t('home.projectsSubtitle')}</p>
          </div>
          <Link to="/projects" className="btn-outline text-sm py-2.5 px-4">
            {t('common.viewAll')}
            <ArrowRight size={16} className="rtl:rotate-180" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 6).map((p) => (
            <Link
              key={p.id}
              to={`/projects/${p.slug}`}
              className="group block overflow-hidden rounded-2xl bg-white border border-ink-200 hover:border-primary-500 hover:shadow-xl transition"
            >
              <div className="aspect-[4/3] overflow-hidden bg-ink-100">
                {p.cover_image ? (
                  <img src={asset(p.cover_image)} alt="" className="h-full w-full object-cover transition group-hover:scale-105" />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-primary-100 to-primary-50" />
                )}
              </div>
              <div className="p-6">
                {p.industry && (
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary-500">
                    {tt(p.industry)}
                  </span>
                )}
                <h3 className="mt-2 text-lg font-bold text-ink-900 group-hover:text-primary-500 transition">
                  {tt(p.title)}
                </h3>
                <p className="mt-2 text-sm text-ink-500 line-clamp-2">
                  {tt(p.summary)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
