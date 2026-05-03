import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Check, ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';
import Loader from '../components/Loader';
import { fetchService, asset } from '../lib/api';
import { t as tt, tList } from '../lib/translatable';

export default function ServiceDetail() {
  const { slug } = useParams();
  const { t } = useTranslation();
  const [service, setService] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchService(slug).then(setService).catch(() => setError(true));
  }, [slug]);

  if (error) return <div className="container-x py-32 text-center"><p>{t('common.notFound')}</p></div>;
  if (!service) return <Loader />;

  const features = tList(service.features);

  return (
    <>
      <SEO title={tt(service.title)} description={tt(service.short_description)} />

      <section className="bg-gradient-to-br from-ink-900 to-ink-800 text-white py-20">
        <div className="container-x">
          <Link to="/services" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-6">
            <ArrowLeft size={16} className="rtl:rotate-180" />
            {t('nav.services')}
          </Link>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold">{tt(service.title)}</h1>
          <p className="mt-6 text-lg text-white/80 max-w-3xl">{tt(service.short_description)}</p>
        </div>
      </section>

      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <article
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: tt(service.description) }}
            />
          </div>

          {features.length > 0 && (
            <aside>
              <div className="card sticky top-24">
                <h3 className="text-lg font-bold text-ink-900">{t('services.keyFeatures')}</h3>
                <ul className="mt-4 space-y-3">
                  {features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-ink-700">
                      <Check size={18} className="mt-0.5 shrink-0 text-primary-500" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className="btn-primary w-full mt-6">
                  {t('common.talkToEngineer')}
                </Link>
              </div>
            </aside>
          )}
        </div>
      </section>
    </>
  );
}
