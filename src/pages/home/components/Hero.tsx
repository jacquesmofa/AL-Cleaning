import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { contactInfo } from '@/mocks/home';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section id="hero" className="relative min-h-[600px] md:min-h-[700px] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://readdy.ai/api/search-image?query=Professional%20cleaning%20team%20in%20uniform%20working%20in%20a%20bright%20modern%20kitchen%20with%20white%20cabinets%20and%20marble%20countertops%2C%20warm%20natural%20light%20streaming%20through%20large%20windows%2C%20sparkling%20clean%20surfaces%2C%20professional%20cleaning%20equipment%2C%20friendly%20smile%2C%20editorial%20photography%20style%20with%20soft%20warm%20tones%20and%20crisp%20details&width=1800&height=1000&seq=hero-cleaning-bg&orientation=landscape"
          alt="AL Cleaning Pro professional cleaning team in action"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground-950/50 via-foreground-950/30 to-foreground-950/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-6 py-20 md:py-28">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-500/20 border border-accent-400/30 text-accent-300 text-sm mb-6">
            <i className="ri-star-fill text-accent-400"></i>
            <span>{t('heroBadge')}</span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-background-50 leading-tight mb-4">
            {t('heroTitle')}
          </h1>

          <p className="text-base md:text-lg text-background-50/80 max-w-xl mb-8 leading-relaxed">
            {t('heroSubhead')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-start gap-4 mb-10">
            <a
              href={contactInfo.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-accent-500 text-foreground-950 text-base font-semibold rounded-full hover:bg-accent-400 transition-all whitespace-nowrap"
            >
              <i className="ri-whatsapp-line"></i>
              {t('whatsappChat')}
            </a>
            <Link
              to="/quote"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary-500 text-background-50 text-base font-semibold rounded-full hover:bg-primary-600 transition-all whitespace-nowrap"
            >
              {t('btnGetQuote')}
              <i className="ri-arrow-right-line"></i>
            </Link>
            <a
              href={`tel:${contactInfo.phoneRaw}`}
              className="inline-flex items-center gap-2 px-6 py-3.5 border-2 border-background-50/30 text-background-50 text-base font-semibold rounded-full hover:bg-background-50/10 transition-all whitespace-nowrap"
            >
              <i className="ri-phone-fill"></i>
              {t('btnCallNow')}
            </a>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2 text-background-50/90 text-sm">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent-500/30">
                <i className="ri-star-fill text-accent-400 text-sm"></i>
              </div>
              <span>{t('heroStatRating')}</span>
            </div>
            <div className="flex items-center gap-2 text-background-50/90 text-sm">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent-500/30">
                <i className="ri-shield-check-fill text-accent-400 text-sm"></i>
              </div>
              <span>{t('heroStatInsured')}</span>
            </div>
            <div className="flex items-center gap-2 text-background-50/90 text-sm">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent-500/30">
                <i className="ri-thumb-up-fill text-accent-400 text-sm"></i>
              </div>
              <span>{t('heroStatGuarantee')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}