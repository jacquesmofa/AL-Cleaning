import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { navLinks, contactInfo } from '@/mocks/home';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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
  }, [location.pathname]);

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

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
            {navLinks.map((link) => (
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
          mobileOpen ? 'max-h-[32rem] border-t border-background-200' : 'max-h-0'
        }`}
      >
        <div className="px-4 py-3 flex flex-col gap-1 bg-background-50">
          {navLinks.map((link) => (
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