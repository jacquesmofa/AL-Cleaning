import { useTranslation } from 'react-i18next';
import { contactInfo } from '@/mocks/home';

export default function TopBar() {
  const { t, i18n } = useTranslation();

  const toggleLang = () => {
    const next = i18n.language === 'en' ? 'fr' : 'en';
    i18n.changeLanguage(next);
  };

  return (
    <div className="hidden md:block bg-foreground-950 text-background-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between h-10 text-xs">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <i className="ri-map-pin-line text-accent-400"></i>
            {t('topbarNotice')}
          </span>
          <span className="text-foreground-500">|</span>
          <a
            href={`tel:${contactInfo.phoneRaw}`}
            className="flex items-center gap-1.5 hover:text-accent-400 transition-colors whitespace-nowrap"
          >
            <i className="ri-phone-line text-accent-400"></i>
            {t('topbarCall')}
          </a>
          <span className="text-foreground-500">|</span>
          <a
            href={contactInfo.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-accent-400 transition-colors whitespace-nowrap"
          >
            <i className="ri-whatsapp-line text-accent-400"></i>
            {t('topbarWhatsApp')}
          </a>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <i className="ri-shield-check-line text-accent-400"></i>
            {t('topbarGuaranteed')}
          </span>
          <span className="text-foreground-500">|</span>
          <button
            onClick={toggleLang}
            className="flex items-center gap-1 hover:text-accent-400 transition-colors whitespace-nowrap cursor-pointer"
            aria-label={t('switchLang')}
          >
            <i className="ri-translate-2 text-accent-400"></i>
            {i18n.language === 'en' ? t('langFrench') : t('langEnglish')}
          </button>
        </div>
      </div>
    </div>
  );
}