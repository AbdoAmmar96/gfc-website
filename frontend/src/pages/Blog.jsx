import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import Loader from '../components/Loader';
import { fetchBlog, asset } from '../lib/api';
import { t as tt } from '../lib/translatable';

export default function Blog() {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState(null);

  useEffect(() => { fetchBlog().then(setData).catch(() => setData({ data: [] })); }, []);
  if (!data) return <Loader />;
  const posts = data.data || [];

  return (
    <>
      <SEO title={t('blog.title')} description={t('blog.subtitle')} />
      <section className="bg-gradient-to-br from-ink-900 to-ink-800 text-white py-20 md:py-28">
        <div className="container-x text-center">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold">{t('blog.title')}</h1>
          <p className="mt-6 text-lg text-white/80 max-w-3xl mx-auto">{t('blog.subtitle')}</p>
        </div>
      </section>
      <section className="section">
        <div className="container-x">
          {posts.length === 0 ? (
            <p className="text-center text-ink-500">{t('blog.noResults')}</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => (
                <Link key={p.id} to={`/blog/${p.slug}`} className="group block overflow-hidden rounded-2xl bg-white border border-ink-200 hover:shadow-xl transition">
                  <div className="aspect-[16/10] overflow-hidden bg-ink-100">
                    {p.cover_image ? (
                      <img src={asset(p.cover_image)} alt="" className="h-full w-full object-cover transition group-hover:scale-105" />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-primary-100 to-primary-50" />
                    )}
                  </div>
                  <div className="p-6">
                    {p.category && <span className="text-xs font-semibold uppercase tracking-wider text-primary-500">{tt(p.category)}</span>}
                    <h3 className="mt-2 text-lg font-bold text-ink-900 group-hover:text-primary-500">{tt(p.title)}</h3>
                    <p className="mt-2 text-sm text-ink-500 line-clamp-3">{tt(p.excerpt)}</p>
                    {p.published_at && (
                      <div className="mt-3 text-xs text-ink-500">
                        {new Date(p.published_at).toLocaleDateString(i18n.language === 'ar' ? 'ar-EG' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
