import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <>
      <SEO title="404" />
      <div className="container-x flex flex-col items-center justify-center text-center py-32">
        <div className="font-display text-9xl font-bold text-primary-500">404</div>
        <h1 className="mt-6 text-2xl font-bold text-ink-900">{t('common.notFound')}</h1>
        <Link to="/" className="btn-primary mt-8">{t('common.backHome')}</Link>
      </div>
    </>
  );
}
