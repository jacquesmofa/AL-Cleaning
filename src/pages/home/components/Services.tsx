import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { services } from '@/mocks/home';

export default function Services() {
  const { t } = useTranslation();
  const [activeService, setActiveService] = useState<string | null>(null);

  const serviceImages: Record<string, string> = {
    residential:
      'https://readdy.ai/api/search-image?query=Professional%20cleaner%20vacuuming%20and%20dusting%20in%20a%20bright%20sunlit%20modern%20living%20room%20with%20beige%20sofa%20and%20wooden%20floors%2C%20warm%20natural%20daylight%2C%20clean%20minimal%20aesthetic%2C%20soft%20neutral%20color%20palette%2C%20editorial%20interior%20photography&width=800&height=600&seq=service-residential&orientation=landscape',
    'deep-clean':
      'https://readdy.ai/api/search-image?query=Professional%20cleaner%20scrubbing%20bathroom%20tiles%20and%20grout%20in%20a%20luxurious%20spa-like%20white%20marble%20bathroom%2C%20sparkling%20clean%20surfaces%2C%20soft%20ambient%20lighting%2C%20professional%20cleaning%20tools%2C%20bright%20fresh%20aesthetic%2C%20clean%20minimal%20style&width=800&height=600&seq=service-deep&orientation=landscape',
    move:
      'https://readdy.ai/api/search-image?query=Professional%20cleaners%20polishing%20an%20empty%20bright%20modern%20apartment%20with%20large%20windows%20and%20hardwood%20floors%2C%20moving%20boxes%20in%20background%2C%20sparkling%20clean%20surfaces%2C%20warm%20sunlight%2C%20fresh%20start%20vibe%2C%20editorial%20real%20estate%20photography&width=800&height=600&seq=service-move&orientation=landscape',
    office:
      'https://readdy.ai/api/search-image?query=Professional%20cleaner%20sanitizing%20modern%20office%20desk%20and%20workstation%20with%20laptop%20and%20monitors%2C%20bright%20open%20workspace%20with%20large%20windows%2C%20clean%20minimal%20corporate%20aesthetic%2C%20warm%20natural%20light%2C%20professional%20commercial%20photography&width=800&height=600&seq=service-office&orientation=landscape',
    airbnb:
      'https://readdy.ai/api/search-image?query=Professional%20cleaner%20making%20a%20bed%20with%20fresh%20white%20linens%20and%20folded%20towels%20in%20a%20bright%20cozy%20bedroom%2C%20welcoming%20guest-ready%20space%2C%20warm%20decor%20with%20potted%20plants%2C%20soft%20natural%20lighting%2C%20clean%20hospitality%20aesthetic&width=800&height=600&seq=service-airbnb&orientation=landscape',
    'post-construction':
      'https://readdy.ai/api/search-image?query=Professional%20cleaners%20removing%20dust%20and%20debris%20from%20a%20freshly%20renovated%20modern%20kitchen%20with%20new%20white%20cabinets%2C%20industrial%20vacuum%20and%20cleaning%20equipment%2C%20bright%20work%20lighting%2C%20transformation%20from%20construction%20to%20clean&width=800&height=600&seq=service-post-construction&orientation=landscape',
  };

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