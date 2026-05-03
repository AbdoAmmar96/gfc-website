import { useTranslation } from 'react-i18next';
import { asset } from '../../lib/api';

export default function PartnersStrip({ partners }) {
  const { t } = useTranslation();
  if (!partners?.length) return null;

  return (
    <section className="border-y border-ink-200 bg-white py-12">
      <div className="container-x">
        <p className="text-center text-sm font-semibold uppercase tracking-wider text-ink-500">
          {t('home.partnersTitle')}
        </p>
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 items-center gap-8">
          {partners.map((p) => (
            <div key={p.id} className="flex items-center justify-center grayscale hover:grayscale-0 transition opacity-70 hover:opacity-100">
              {p.logo ? (
                <img src={asset(p.logo)} alt={p.name} className="max-h-12 max-w-[140px] object-contain" />
              ) : (
                <span className="font-bold text-ink-700">{p.name}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
