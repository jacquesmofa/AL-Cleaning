import { useTranslation } from 'react-i18next';
import { serviceAreas } from '@/mocks/home';

export default function Areas() {
  const { t } = useTranslation();

  return (
    <section id="areas" className="py-16 md:py-20 bg-background-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block text-primary-600 text-sm font-semibold tracking-wider uppercase mb-3">
            {t('areasLabel')}
          </span>
          <h2 className="text-2xl md:text-4xl font-heading font-bold text-foreground-950 mb-4">
            {t('areasTitle')}
          </h2>
          <p className="text-foreground-600 max-w-2xl mx-auto text-base">
            {t('areasSubtext')}
          </p>
        </div>

        {/* Areas Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 md:gap-4 mb-10">
          {serviceAreas.map((area) => (
            <div
              key={area.cityKey}
              className="group bg-background-100 rounded-xl p-4 text-center border border-background-200 hover:border-primary-200 hover:bg-primary-50/50 transition-all duration-300"
            >
              <div className="w-9 h-9 mx-auto flex items-center justify-center rounded-full bg-primary-100 text-primary-600 mb-2 group-hover:bg-primary-500 group-hover:text-background-50 transition-all">
                <i className={`${area.icon} text-sm`}></i>
              </div>
              <h4 className="font-heading text-sm font-semibold text-foreground-950">
                {t(area.cityKey)}
              </h4>
              <p className="text-xs text-foreground-500 mt-0.5">
                {t(area.descKey)}
              </p>
            </div>
          ))}
        </div>

        {/* Google Map Embed */}
        <div className="w-full rounded-xl overflow-hidden border border-background-200 h-64 md:h-80">
          <iframe
            title="AL Cleaning Pro Service Areas in the GTA"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11548.752105773754!2d-79.7624177!3d43.7315479!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b1592e22fbb5b%3A0x7cbcb9f9bc4b27b5!2sBrampton%2C%20ON!5e0!3m2!1sen!2sca!4v1690000000000!5m2!1sen!2sca"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
}