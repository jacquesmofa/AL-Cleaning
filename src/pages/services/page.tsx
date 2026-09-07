import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { services } from '@/mocks/home';
import Layout from '@/components/feature/Layout';

type FilterTab = 'all' | 'residential' | 'commercial' | 'specialty';

const serviceImages: Record<string, string> = {
  residential:
    'https://readdy.ai/api/search-image?query=Professional%20cleaner%20vacuuming%20and%20dusting%20in%20a%20bright%20sunlit%20modern%20living%20room%20with%20beige%20sofa%20and%20wooden%20floors%2C%20warm%20natural%20daylight%2C%20clean%20minimal%20aesthetic%2C%20soft%20neutral%20color%20palette%2C%20editorial%20interior%20photography&width=800&height=600&seq=services-hub-residential-v2&orientation=landscape',
  'deep-clean':
    'https://readdy.ai/api/search-image?query=Professional%20cleaner%20scrubbing%20bathroom%20tiles%20and%20grout%20in%20a%20luxurious%20spa-like%20white%20marble%20bathroom%2C%20sparkling%20clean%20surfaces%2C%20soft%20ambient%20lighting%2C%20professional%20cleaning%20tools%2C%20bright%20fresh%20aesthetic%2C%20clean%20minimal%20style&width=800&height=600&seq=services-hub-deep-v2&orientation=landscape',
  move:
    'https://readdy.ai/api/search-image?query=Professional%20cleaners%20polishing%20an%20empty%20bright%20modern%20apartment%20with%20large%20windows%20and%20hardwood%20floors%2C%20moving%20boxes%20in%20background%2C%20sparkling%20clean%20surfaces%2C%20warm%20sunlight%2C%20fresh%20start%20vibe%2C%20editorial%20real%20estate%20photography&width=800&height=600&seq=services-hub-move-v2&orientation=landscape',
  office:
    'https://readdy.ai/api/search-image?query=Professional%20cleaner%20sanitizing%20modern%20office%20desk%20and%20workstation%20with%20laptop%20and%20monitors%2C%20bright%20open%20workspace%20with%20large%20windows%2C%20clean%20minimal%20corporate%20aesthetic%2C%20warm%20natural%20light%2C%20professional%20commercial%20photography&width=800&height=600&seq=services-hub-office-v2&orientation=landscape',
  airbnb:
    'https://readdy.ai/api/search-image?query=Professional%20cleaner%20making%20a%20bed%20with%20fresh%20white%20linens%20and%20folded%20towels%20in%20a%20bright%20cozy%20bedroom%2C%20welcoming%20guest-ready%20space%2C%20warm%20decor%20with%20potted%20plants%2C%20soft%20natural%20lighting%2C%20clean%20hospitality%20aesthetic&width=800&height=600&seq=services-hub-airbnb-v2&orientation=landscape',
  'post-construction':
    'https://readdy.ai/api/search-image?query=Professional%20cleaners%20removing%20dust%20and%20debris%20from%20a%20freshly%20renovated%20modern%20kitchen%20with%20new%20white%20cabinets%2C%20industrial%20vacuum%20and%20cleaning%20equipment%2C%20bright%20work%20lighting%2C%20transformation%20from%20construction%20to%20clean&width=800&height=600&seq=services-hub-postcon-v2&orientation=landscape',
};

export default function ServicesHub() {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all');

  const filterTabs: { key: FilterTab; label: string }[] = [
    { key: 'all', label: t('servicesHubFilterAll') },
    { key: 'residential', label: t('servicesHubFilterResidential') },
    { key: 'commercial', label: t('servicesHubFilterCommercial') },
    { key: 'specialty', label: t('servicesHubFilterSpecialty') },
  ];

  const filtered = activeFilter === 'all'
    ? services
    : services.filter((s) => s.category === activeFilter);

  return (
    <Layout>
      {/* Page Header */}
      <section className="py-14 md:py-20 bg-background-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <span className="inline-block text-primary-600 text-sm font-semibold tracking-wider uppercase mb-3">
            {t('servicesLabel')}
          </span>
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-foreground-950 mb-4">
            {t('servicesHubTitle')}
          </h1>
          <p className="text-foreground-600 max-w-2xl mx-auto text-base md:text-lg">
            {t('servicesHubSubtext')}
          </p>
        </div>
      </section>

      {/* Filter Tabs + Grid */}
      <section className="py-12 md:py-16 bg-background-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveFilter(tab.key)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  activeFilter === tab.key
                    ? 'bg-primary-500 text-background-50'
                    : 'bg-background-100 text-foreground-600 hover:bg-background-200 border border-background-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((service) => (
              <div
                key={service.id}
                className="group bg-background-50 rounded-xl border border-background-200 overflow-hidden hover:border-primary-200 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={serviceImages[service.id]}
                    alt={t(service.titleKey)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 w-10 h-10 flex items-center justify-center rounded-lg bg-background-50/90 text-primary-500">
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

                  {/* Features */}
                  <ul className="space-y-1.5 mb-5">
                    {service.features.slice(0, 3).map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-foreground-600">
                        <i className="ri-check-line text-accent-500 mt-0.5 flex-shrink-0"></i>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={`/services/${service.id}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary-500 hover:text-primary-600 transition-colors whitespace-nowrap"
                  >
                    {t('servicesHubViewDetails')}
                    <i className="ri-arrow-right-line"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-foreground-500 text-base">No services match this filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-12 md:py-16 bg-background-100">
        <div className="max-w-3xl mx-auto px-4 md:px-6 text-center">
          <p className="text-foreground-700 text-lg mb-6">{t('servicesHubCtaBanner')}</p>
          <Link
            to="/quote"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary-500 text-background-50 text-base font-semibold rounded-full hover:bg-primary-600 transition-all whitespace-nowrap"
          >
            {t('servicesHubCtaBtn')}
            <i className="ri-arrow-right-line"></i>
          </Link>
        </div>
      </section>
    </Layout>
  );
}