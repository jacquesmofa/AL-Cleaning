import { useTranslation } from 'react-i18next';
import { contactInfo } from '@/mocks/home';

export default function WhatsAppFloat() {
  const { t } = useTranslation();

  return (
    <a
      href={contactInfo.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t('whatsappChat')}
      className="group fixed bottom-6 right-6 z-50 flex items-center gap-3"
    >
      <span className="pointer-events-none whitespace-nowrap rounded-full bg-foreground-950/90 text-background-50 text-sm font-medium py-2 px-0 max-w-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:max-w-xs group-hover:px-4 group-hover:opacity-100">
        {t('whatsappChat')}
      </span>
      <span className="relative flex items-center justify-center w-14 h-14 rounded-full bg-accent-500 text-background-50 hover:bg-accent-600 transition-colors cursor-pointer">
        <i className="ri-whatsapp-line text-2xl"></i>
        <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-background-50 border-2 border-accent-500"></span>
        </span>
      </span>
    </a>
  );
}