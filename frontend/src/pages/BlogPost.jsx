import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Calendar } from 'lucide-react';
import SEO from '../components/SEO';
import Loader from '../components/Loader';
import { fetchPost, asset } from '../lib/api';
import { t as tt } from '../lib/translatable';

export default function BlogPost() {
  const { slug } = useParams();
  const { t, i18n } = useTranslation();
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => { fetchPost(slug).then((r) => setData(r)).catch(() => setError(true)); }, [slug]);

  if (error) return <div className="container-x py-32 text-center"><p>{t('common.notFound')}</p></div>;
  if (!data) return <Loader />;

  const post = data.data;
  const related = data.related || [];

  return (
    <>
      <SEO title={tt(post.title)} description={tt(post.excerpt)} />

      {post.cover_image && (
        <div className="relative h-[50vh] overflow-hidden bg-ink-900">
          <img src={asset(post.cover_image)} alt="" className="absolute inset-0 h-full w-full object-cover opacity-70" />
        </div>
      )}

      <section className="section">
        <div className="container-x max-w-3xl">
          <Link to="/blog" className="inline-flex items-center gap-2 text-ink-500 hover:text-primary-500 text-sm mb-6">
            <ArrowLeft size={16} className="rtl:rotate-180" />
            {t('nav.blog')}
          </Link>

          {post.category && <span className="text-sm font-semibold uppercase tracking-wider text-primary-500">{tt(post.category)}</span>}
          <h1 className="mt-3 font-display text-3xl md:text-5xl font-bold text-ink-900 leading-tight">{tt(post.title)}</h1>
          {post.published_at && (
            <div className="mt-4 inline-flex items-center gap-2 text-sm text-ink-500">
              <Calendar size={16} />
              {new Date(post.published_at).toLocaleDateString(i18n.language === 'ar' ? 'ar-EG' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          )}

          <article className="prose prose-lg max-w-none mt-10" dangerouslySetInnerHTML={{ __html: tt(post.content) }} />
        </div>

        {related.length > 0 && (
          <div className="container-x mt-20">
            <h2 className="text-2xl font-bold text-ink-900 mb-6">{t('common.viewAll')}</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {related.map((r) => (
                <Link key={r.id} to={`/blog/${r.slug}`} className="card-hover group">
                  <h3 className="font-bold text-ink-900 group-hover:text-primary-500">{tt(r.title)}</h3>
                  <p className="mt-2 text-sm text-ink-500 line-clamp-2">{tt(r.excerpt)}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
