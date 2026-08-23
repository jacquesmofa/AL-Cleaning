import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { contactInfo, services } from '@/mocks/home';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer id="contact" className="bg-foreground-950 text-background-50">
      {/* CTA Banner */}
      <div className="border-b border-foreground-800">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
            {t('footerCtaTitle')}
          </h2>
          <p className="text-foreground-400 max-w-xl mx-auto text-base mb-8">
            {t('footerCtaSubtext')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={contactInfo.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-accent-500 text-foreground-950 text-base font-semibold rounded-full hover:bg-accent-400 transition-all whitespace-nowrap"
            >
              <i className="ri-whatsapp-line"></i>
              {t('whatsappChat')}
            </a>
            <a
              href={`tel:${contactInfo.phoneRaw}`}
              className="inline-flex items-center gap-2 px-6 py-3.5 border border-foreground-700 text-background-50 text-base font-semibold rounded-full hover:bg-foreground-800 transition-all whitespace-nowrap"
            >
              <i className="ri-phone-fill"></i>
              {t('footerCall')} {contactInfo.phone}
            </a>
            <a
              href={`mailto:${contactInfo.email}`}
              className="inline-flex items-center gap-2 px-6 py-3.5 border border-foreground-700 text-background-50 text-base font-semibold rounded-full hover:bg-foreground-800 transition-all whitespace-nowrap"
            >
              <i className="ri-mail-line"></i>
              {t('footerEmail')}
            </a>
            <Link
              to="/quote"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary-500 text-background-50 text-base font-semibold rounded-full hover:bg-primary-600 transition-all whitespace-nowrap"
            >
              {t('btnGetQuote')}
              <i className="ri-arrow-right-line"></i>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="font-heading text-xl font-bold">
              AL<span className="text-primary-400">Cleaning</span>Pro
            </Link>
            <p className="text-foreground-400 text-sm mt-3 leading-relaxed">
              {t('footerBrandDesc')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-sm font-semibold mb-4 text-background-50">{t('footerQuickLinks')}</h4>
            <ul className="space-y-2.5">
              <li><Link to="/services" className="text-foreground-400 text-sm hover:text-accent-400 transition-colors">{t('navServices')}</Link></li>
              <li><Link to="/about" className="text-foreground-400 text-sm hover:text-accent-400 transition-colors">{t('navAbout')}</Link></li>
              <li><Link to="/reviews" className="text-foreground-400 text-sm hover:text-accent-400 transition-colors">{t('navReviews')}</Link></li>
              <li><Link to="/areas" className="text-foreground-400 text-sm hover:text-accent-400 transition-colors">{t('navAreas')}</Link></li>
              <li><Link to="/quote" className="text-foreground-400 text-sm hover:text-accent-400 transition-colors">{t('navQuote')}</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading text-sm font-semibold mb-4 text-background-50">{t('footerOurServices')}</h4>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s.id}>
                  <Link to={`/services/${s.id}`} className="text-foreground-400 text-sm hover:text-accent-400 transition-colors">
                    {t(s.titleKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-sm font-semibold mb-4 text-background-50">{t('footerContactUs')}</h4>
            <ul className="space-y-3">
              <li>
                <a href={`tel:${contactInfo.phoneRaw}`} className="flex items-center gap-2 text-foreground-400 text-sm hover:text-accent-400 transition-colors">
                  <i className="ri-phone-fill text-primary-400"></i>
                  {contactInfo.phone}
                </a>
              </li>
              <li>
                <a href={contactInfo.whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-foreground-400 text-sm hover:text-accent-400 transition-colors">
                  <i className="ri-whatsapp-line text-accent-400"></i>
                  {t('whatsappChat')}
                </a>
              </li>
              <li>
                <a href={`sms:${contactInfo.phoneRaw}?body=${encodeURIComponent(t('smsBody'))}`} className="flex items-center gap-2 text-foreground-400 text-sm hover:text-accent-400 transition-colors">
                  <i className="ri-message-3-line text-accent-400"></i>
                  {t('smsBtn')}
                </a>
              </li>
              <li>
                <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-2 text-foreground-400 text-sm hover:text-accent-400 transition-colors">
                  <i className="ri-mail-line text-primary-400"></i>
                  {contactInfo.email}
                </a>
              </li>
              <li>
                <a href={contactInfo.website} className="flex items-center gap-2 text-foreground-400 text-sm hover:text-accent-400 transition-colors" target="_blank" rel="noopener noreferrer">
                  <i className="ri-global-line text-primary-400"></i>
                  Alcleaningpro.ca
                </a>
              </li>
              <li className="flex items-start gap-2 text-foreground-400 text-sm">
                <i className="ri-map-pin-line text-primary-400 mt-0.5"></i>
                <span>{contactInfo.address}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-foreground-800">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-foreground-500 text-xs">
            {t('footerLegal')}
          </p>
          <p className="text-foreground-500 text-xs">
            {t('footerInsured')}
          </p>
        </div>
      </div>
    </footer>
  );
}