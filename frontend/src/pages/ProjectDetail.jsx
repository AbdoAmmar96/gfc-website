import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Calendar, Briefcase } from 'lucide-react';
import SEO from '../components/SEO';
import Loader from '../components/Loader';
import { fetchProject, asset } from '../lib/api';
import { t as tt, tList } from '../lib/translatable';

export default function ProjectDetail() {
  const { slug } = useParams();
  const { t, i18n } = useTranslation();
  const [project, setProject] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => { fetchProject(slug).then(setProject).catch(() => setError(true)); }, [slug]);

  if (error) return <div className="container-x py-32 text-center"><p>{t('common.notFound')}</p></div>;
  if (!project) return <Loader />;

  const results = tList(project.results);
  const dateOpts = { year: 'numeric', month: 'long' };

  return (
    <>
      <SEO title={tt(project.title)} description={tt(project.summary)} />

      {project.cover_image && (
        <section className="relative h-[60vh] overflow-hidden">
          <img src={asset(project.cover_image)} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
          <div className="container-x relative h-full flex flex-col justify-end pb-12 text-white">
            <Link to="/projects" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-4">
              <ArrowLeft size={16} className="rtl:rotate-180" />
              {t('nav.projects')}
            </Link>
            <h1 className="font-display text-3xl md:text-5xl font-bold max-w-4xl">{tt(project.title)}</h1>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-10">
            <p className="text-xl text-ink-700 leading-relaxed">{tt(project.summary)}</p>

            {project.challenge && (
              <div>
                <h2 className="text-2xl font-bold text-ink-900 mb-3">{t('projects.challenge')}</h2>
                <article className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: tt(project.challenge) }} />
              </div>
            )}

            {project.solution_text && (
              <div>
                <h2 className="text-2xl font-bold text-ink-900 mb-3">{t('projects.solution')}</h2>
                <article className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: tt(project.solution_text) }} />
              </div>
            )}

            {results.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-ink-900 mb-3">{t('projects.results')}</h2>
                <ul className="space-y-3">
                  {results.map((r, i) => (
                    <li key={i} className="flex gap-3 text-ink-700">
                      <span className="font-bold text-primary-500">{String(i + 1).padStart(2, '0')}.</span>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <aside>
            <div className="card sticky top-24 space-y-4 text-sm">
              {project.client_name && (
                <div>
                  <div className="text-ink-500">{t('projects.client')}</div>
                  <div className="font-semibold text-ink-900 mt-1">{tt(project.client_name)}</div>
                </div>
              )}
              {project.industry && (
                <div>
                  <div className="text-ink-500">{t('projects.industry')}</div>
                  <div className="font-semibold text-ink-900 mt-1 inline-flex items-center gap-2">
                    <Briefcase size={14} />{tt(project.industry)}
                  </div>
                </div>
              )}
              {project.completed_at && (
                <div>
                  <div className="text-ink-500">{t('projects.completedAt')}</div>
                  <div className="font-semibold text-ink-900 mt-1 inline-flex items-center gap-2">
                    <Calendar size={14} />
                    {new Date(project.completed_at).toLocaleDateString(i18n.language === 'ar' ? 'ar-EG' : 'en-US', dateOpts)}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
