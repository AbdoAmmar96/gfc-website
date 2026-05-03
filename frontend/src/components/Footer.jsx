import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { fetchSettings, asset, publicAsset } from '../lib/api';
import { t as tt } from '../lib/translatable';

// Inline brand icons
const WhatsAppIcon = ({ size = 16 }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
    <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
  </svg>
);

const XIcon = ({ size = 16 }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

export default function Footer() {
  const { t } = useTranslation();
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    fetchSettings().then(setSettings).catch(() => {});
  }, []);

  const logoSrc = settings?.logo_dark ? asset(settings.logo_dark)
                 : settings?.logo ? asset(settings.logo)
                 : publicAsset('/images/logo.png');

  const socials = [
    { Icon: WhatsAppIcon, href: settings?.whatsapp ? `https://wa.me/${settings.whatsapp.replace(/\D/g, '')}` : null },
    { Icon: XIcon,        href: settings?.twitter },
    { Icon: Linkedin,     href: settings?.linkedin },
  ].filter(s => s.href);

  const quickLinks = [
    { to: '/',         label: t('nav.home') },
    { to: '/about',    label: t('nav.about') },
    { to: '/services', label: t('nav.products') },
    { to: '/contact',  label: t('nav.contact') },
  ];

  const productCategories = [
    { slug: 'copper-cat6',  label: 'Copper Cat6' },
    { slug: 'copper-cat6a', label: 'Copper Cat6A' },
    { slug: 'fiber-optic',  label: 'Fiber Optic' },
    { slug: 'accessories',  label: 'Accessories' },
  ];

  return (
    <footer className="bg-ink-900 text-ink-100">
      <div className="container-x py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Contact info */}
          <div>
            <h4 className="font-bold text-white mb-5">{t('footer.contactInfo')}</h4>
            <ul className="space-y-3 text-sm text-ink-100/80">
              {settings?.phone_primary && (
                <li className="flex items-start gap-3">
                  <Phone size={16} className="mt-0.5 shrink-0 text-primary-500" />
                  <a href={`tel:${settings.phone_primary}`} dir="ltr" className="hover:text-primary-400 transition">
                    {settings.phone_primary}
                  </a>
                </li>
              )}
              {settings?.email_primary && (
                <li className="flex items-start gap-3">
                  <Mail size={16} className="mt-0.5 shrink-0 text-primary-500" />
                  <a href={`mailto:${settings.email_primary}`} className="hover:text-primary-400 transition break-all">
                    {settings.email_primary}
                  </a>
                </li>
              )}
              {settings?.address_line && (
                <li className="flex items-start gap-3">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-primary-500" />
                  <span>{tt(settings.address_line)}</span>
                </li>
              )}
            </ul>
          </div>

          {/* Product categories */}
          <div>
            <h4 className="font-bold text-white mb-5">{t('footer.productCategories')}</h4>
            <ul className="space-y-2.5 text-sm text-ink-100/80">
              {productCategories.map((c) => (
                <li key={c.slug}>
                  <Link to={`/services/${c.slug}`} className="hover:text-primary-400 transition">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-bold text-white mb-5">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2.5 text-sm text-ink-100/80">
              {quickLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="hover:text-primary-400 transition">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Brand + tagline + socials */}
          <div>
            <img src={logoSrc} alt="" className="h-16 w-auto mb-5" />
            <p className="text-sm text-ink-100/70 leading-relaxed">
              {settings ? tt(settings.site_tagline) : t('footer.tagline')}
            </p>
            {socials.length > 0 && (
              <div className="mt-5 flex gap-2">
                {socials.map(({ Icon, href }, i) => (
                  <a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 hover:bg-primary-500 transition"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x py-6 text-center text-xs text-ink-100/60">
          {t('footer.rights')}
        </div>
      </div>
    </footer>
  );
}
