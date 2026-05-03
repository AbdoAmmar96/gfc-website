import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import { fetchSettings, asset, publicAsset } from '../lib/api';
import { t as tt } from '../lib/translatable';

export default function Header() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  // Home page: transparent header. All other pages: white header.
  const isHome = pathname === '/';

  useEffect(() => {
    fetchSettings().then(setSettings).catch(() => {});
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  const transparent = isHome && !scrolled;

  // The four nav items matching the actual GFC site structure
  const links = [
    { to: '/',         label: t('nav.home') },
    { to: '/about',    label: t('nav.about') },
    { to: '/services', label: t('nav.products') },
    { to: '/contact',  label: t('nav.contact') },
  ];

  // Logo source — uses backend setting if uploaded, falls back to bundled GFC logo
  const logoSrc = settings?.logo ? asset(settings.logo) : publicAsset('/images/logo.png');

  // Color classes that flip based on transparent vs solid state
  const headerBg = transparent
    ? 'bg-transparent'
    : 'bg-white/95 backdrop-blur shadow-sm';
  const linkColor = transparent
    ? 'text-white hover:text-primary-400'
    : 'text-ink-700 hover:text-primary-500';
  const activeLinkColor = transparent
    ? 'text-primary-400'
    : 'text-primary-500';
  const iconColor = transparent ? 'text-white' : 'text-ink-900';

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${headerBg} h-[var(--header-h)]`}>
      <div className="container-x flex h-full items-center justify-between gap-4">
        {/* Far-start: language switcher (left in RTL = visually first) */}
        <div className="flex items-center gap-2 order-1">
          <LanguageSwitcher dark={transparent} />
          <button
            onClick={() => setOpen(!open)}
            className={`lg:hidden p-2 rounded-lg ${transparent ? 'hover:bg-white/10' : 'hover:bg-ink-100'} ${iconColor}`}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Center: nav links (desktop only) */}
        <nav className="hidden lg:flex items-center gap-1 order-2">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `px-4 py-2 text-sm font-semibold transition ${
                  isActive ? activeLinkColor : linkColor
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        {/* Far-end: logo (right in RTL) */}
        <Link to="/" className="flex items-center gap-2 order-3">
          <img src={logoSrc} alt="Golden Future Care" className="h-12 w-auto" />
        </Link>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-ink-200 bg-white shadow-lg">
          <nav className="container-x py-4 flex flex-col">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `px-3 py-3 text-base font-semibold rounded-lg ${
                    isActive ? 'text-primary-500 bg-primary-50' : 'text-ink-700'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
