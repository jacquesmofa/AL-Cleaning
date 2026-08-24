import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { navLinks, contactInfo, services } from '@/mocks/home';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const servicesDropdownRef = useRef<HTMLDivElement>(null);

  const toggleLang = () => {
    const next = i18n.language === 'en' ? 'fr' : 'en';
    i18n.changeLanguage(next);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
    setMobileServicesOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  const serviceLinks = services.map((s) => ({
    label: s.titleKey,
    href: `/services/${s.id}`,
    icon: s.icon,
  }));

  const secondaryLinks = navLinks.filter(
    (link) => link.href !== '/' && link.href !== '/services' && link.href !== '/quote'
  );

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background-50/95 backdrop-blur-md border-b border-background-200'
          : 'bg-background-50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 whitespace-nowrap">
            <span className="font-heading text-xl md:text-2xl font-bold text-foreground-950">
              AL<span className="text-primary-500">Cleaning</span>Pro
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            <Link
              to="/"
              className={`px-3 py-2 text-sm rounded-md whitespace-nowrap transition-colors ${
                isActive('/')
                  ? 'text-primary-600 bg-primary-50 font-medium'
                  : 'text-foreground-600 hover:text-primary-500 hover:bg-primary-50'
              }`}
            >
              {t('navHome')}
            </Link>

            {/* Services Dropdown */}
            <div
              ref={servicesDropdownRef}
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className={`flex items-center gap-1 px-3 py-2 text-sm rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                  isActive('/services')
                    ? 'text-primary-600 bg-primary-50 font-medium'
                    : 'text-foreground-600 hover:text-primary-500 hover:bg-primary-50'
                }`}
              >
                {t('navServices')}
                <i className={`ri-arrow-down-s-line text-sm transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`}></i>
              </button>

              <div
                className={`absolute left-0 top-full pt-2 w-72 transition-all duration-200 ${
                  servicesOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-1'
                }`}
              >
                <div className="bg-background-50 border border-background-200 rounded-xl py-2">
                  {serviceLinks.map((s) => (
                    <Link
                      key={s.href}
                      to={s.href}
                      onClick={() => setServicesOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                    >
                      <i className={`${s.icon} text-primary-500 w-4 h-4 flex items-center justify-center flex-shrink-0`}></i>
                      <span className="whitespace-nowrap">{t(s.label)}</span>
                    </Link>
                  ))}
                  <div className="my-1.5 border-t border-background-200"></div>
                  <Link
                    to="/services"
                    onClick={() => setServicesOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-foreground-900 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                  >
                    <i className="ri-apps-line text-primary-500 w-4 h-4 flex items-center justify-center flex-shrink-0"></i>
                    <span className="whitespace-nowrap">{t('navAllServices')}</span>
                  </Link>
                </div>
              </div>
            </div>

            {secondaryLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-3 py-2 text-sm rounded-md whitespace-nowrap transition-colors ${
                  isActive(link.href)
                    ? 'text-primary-600 bg-primary-50 font-medium'
                    : 'text-foreground-600 hover:text-primary-500 hover:bg-primary-50'
                }`}
              >
                {t(link.label)}
              </Link>
            ))}
          </div>

          {/* Desktop CTAs + Lang Switch */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-foreground-600 hover:text-primary-500 border border-background-200 hover:border-primary-300 rounded-full transition-all whitespace-nowrap cursor-pointer"
              aria-label={t('switchLang')}
            >
              <i className="ri-translate-2 text-sm"></i>
              {i18n.language === 'en' ? 'FR' : 'EN'}
            </button>

            <a
              href={`tel:${contactInfo.phoneRaw}`}
              className="flex items-center gap-2 text-sm font-medium text-foreground-700 hover:text-primary-500 transition-colors whitespace-nowrap"
            >
              <i className="ri-phone-fill text-primary-500"></i>
              {contactInfo.phone}
            </a>
            <a
              href={contactInfo.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('whatsappChat')}
              title={t('whatsappChat')}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-accent-500 text-background-50 hover:bg-accent-600 transition-colors whitespace-nowrap"
            >
              <i className="ri-whatsapp-line text-lg"></i>
            </a>
            <Link
              to="/quote"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-500 text-background-50 text-sm font-semibold rounded-full hover:bg-primary-600 transition-all whitespace-nowrap"
            >
              {t('btnGetQuote')}
              <i className="ri-arrow-right-line"></i>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-background-100 transition-colors"
            aria-label="Toggle menu"
          >
            <i className={`text-xl ${mobileOpen ? 'ri-close-line' : 'ri-menu-line'}`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? 'max-h-[40rem] border-t border-background-200' : 'max-h-0'
        }`}
      >
        <div className="px-4 py-3 flex flex-col gap-1 bg-background-50 max-h-[60vh] overflow-y-auto">
          <Link
            to="/"
            onClick={() => setMobileOpen(false)}
            className={`px-3 py-2.5 text-sm rounded-md transition-colors ${
              isActive('/')
                ? 'text-primary-600 bg-primary-50 font-medium'
                : 'text-foreground-700 hover:text-primary-500 hover:bg-primary-50'
            }`}
          >
            {t('navHome')}
          </Link>

          {/* Services (expandable) */}
          <button
            onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
            className="flex items-center justify-between px-3 py-2.5 text-sm rounded-md text-foreground-700 hover:text-primary-500 hover:bg-primary-50 transition-colors cursor-pointer"
          >
            {t('navServices')}
            <i className={`ri-arrow-down-s-line transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`}></i>
          </button>
          {mobileServicesOpen && (
            <div className="pl-3 flex flex-col gap-1">
              {serviceLinks.map((s) => (
                <Link
                  key={s.href}
                  to={s.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-foreground-600 rounded-md hover:text-primary-500 hover:bg-primary-50 transition-colors"
                >
                  <i className={`${s.icon} text-primary-500 w-4 h-4 flex items-center justify-center flex-shrink-0`}></i>
                  {t(s.label)}
                </Link>
              ))}
              <Link
                to="/services"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-foreground-900 rounded-md hover:text-primary-500 hover:bg-primary-50 transition-colors"
              >
                <i className="ri-apps-line text-primary-500 w-4 h-4 flex items-center justify-center flex-shrink-0"></i>
                {t('navAllServices')}
              </Link>
            </div>
          )}

          {secondaryLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setMobileOpen(false)}
              className={`px-3 py-2.5 text-sm rounded-md transition-colors ${
                isActive(link.href)
                  ? 'text-primary-600 bg-primary-50 font-medium'
                  : 'text-foreground-700 hover:text-primary-500 hover:bg-primary-50'
              }`}
            >
              {t(link.label)}
            </Link>
          ))}

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => { toggleLang(); setMobileOpen(false); }}
              className="flex items-center justify-center gap-2 px-4 py-2.5 border border-background-200 text-foreground-600 text-sm font-semibold rounded-full hover:bg-background-100 transition-colors whitespace-nowrap"
            >
              <i className="ri-translate-2"></i>
              {i18n.language === 'en' ? t('langFrench') : t('langEnglish')}
            </button>
            <a
              href={`tel:${contactInfo.phoneRaw}`}
              className="flex items-center justify-center gap-2 px-4 py-2.5 border border-primary-200 text-primary-600 text-sm font-semibold rounded-full hover:bg-primary-50 transition-colors whitespace-nowrap"
            >
              <i className="ri-phone-fill"></i>
              {t('btnCallNow')}
            </a>
            <a
              href={contactInfo.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-accent-500 text-foreground-950 text-sm font-semibold rounded-full hover:bg-accent-400 transition-colors whitespace-nowrap"
            >
              <i className="ri-whatsapp-line"></i>
              {t('whatsappChat')}
            </a>
            <Link
              to="/quote"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-primary-500 text-background-50 text-sm font-semibold rounded-full hover:bg-primary-600 transition-colors whitespace-nowrap"
            >
              {t('btnGetQuote')}
              <i className="ri-arrow-right-line"></i>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}