import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

export default function SEO({ title, description }) {
  const { i18n } = useTranslation();
  const fullTitle = title ? `${title} — GFC IT` : 'GFC IT — IT Infrastructure Solutions';
  return (
    <Helmet>
      <html lang={i18n.language} dir={i18n.language === 'ar' ? 'rtl' : 'ltr'} />
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
    </Helmet>
  );
}
