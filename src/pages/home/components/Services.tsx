import servicePictures from '../../../content/data/servicePictures.json';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { services } from '@/mocks/home';

export default function Services() {
  const { t } = useTranslation();
  const [activeService, setActiveService] = useState<string | null>(null);

  const serviceImages: Record<string, string> = servicePictures.homeCardPictures;

  return (
    <section id="services" className="py-16 md:py-20 bg-background-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block text-primary-600 text-sm font-semibold tracking-wider uppercase mb-3">
            {t('servicesLabel')}
          </span>
          <h2 className="text-2xl md:text-4xl font-heading font-bold text-foreground-950 mb-4">
            {t('servicesTitle')}
          </h2>
          <p className="text-foreground-600 max-w-2xl mx-auto text-base">
            {t('servicesSubtext')}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="group bg-background-50 rounded-xl border border-background-200 overflow-hidden hover:border-primary-200 transition-all duration-300"
              onMouseEnter={() => setActiveService(service.id)}
              onMouseLeave={() => setActiveService(null)}
            >
              {/* Service Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={serviceImages[service.id]}
                  alt={t(service.titleKey)}
                  className={`w-full h-full object-cover transition-transform duration-500 ${
                    activeService === service.id ? 'scale-105' : 'scale-100'
                  }`}
                />
                {/* Icon Badge */}
                <div className="absolute top-4 left-4 w-10 h-10 flex items-center justify-center rounded-lg bg-background-50/90 text-primary-500 shadow-sm">
                  <i className={`${service.icon} text-lg`}></i>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-heading text-lg font-semibold text-foreground-950 mb-2">
                  {t(service.titleKey)}
                </h3>
                <p className="text-foreground-600 text-sm leading-relaxed mb-4">
                  {t(service.descKey)}
                </p>

                {/* Features List */}
                <ul className="space-y-2 mb-5">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground-700">
                      <i className="ri-check-line text-accent-500 mt-0.5 flex-shrink-0"></i>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="#quote"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary-500 hover:text-primary-600 transition-colors whitespace-nowrap"
                >
                  {t('serviceBtn')}
                  <i className="ri-arrow-right-line"></i>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}