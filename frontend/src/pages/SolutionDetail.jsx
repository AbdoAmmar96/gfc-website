import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Check, ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';
import Loader from '../components/Loader';
import { fetchSolution } from '../lib/api';
import { t as tt, tList } from '../lib/translatable';

export default function SolutionDetail() {
  const { slug } = useParams();
  const { t } = useTranslation();
  const [item, setItem] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => { fetchSolution(slug).then(setItem).catch(() => setError(true)); }, [slug]);

  if (error) return <div className="container-x py-32 text-center"><p>{t('common.notFound')}</p></div>;
  if (!item) return <Loader />;

  const benefits = tList(item.benefits);

  return (
    <>
      <SEO title={tt(item.title)} />
      <section className="bg-gradient-to-br from-ink-900 to-ink-800 text-white py-20">
        <div className="container-x">
          <Link to="/solutions" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-6">
            <ArrowLeft size={16} className="rtl:rotate-180" />
            {t('nav.solutions')}
          </Link>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold">{tt(item.title)}</h1>
          <p className="mt-6 text-lg text-white/80 max-w-3xl">{tt(item.short_description)}</p>
        </div>
      </section>
      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-3">
          <article className="lg:col-span-2 prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: tt(item.description) }} />
          {benefits.length > 0 && (
            <aside>
              <div className="card sticky top-24">
                <h3 className="text-lg font-bold text-ink-900">{t('solutions.keyBenefits')}</h3>
                <ul className="mt-4 space-y-3">
                  {benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-ink-700">
                      <Check size={18} className="mt-0.5 shrink-0 text-primary-500" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          )}
        </div>
      </section>
    </>
  );
}
