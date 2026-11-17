import servicePictures from '../../content/data/servicePictures.json';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { services } from '@/mocks/home';
import Layout from '@/components/feature/Layout';
import copy from '../../content/pages/services.json';
// Text, images and links: src/content/pages/services.json (editable in the website editors).

type FilterTab = 'all' | 'residential' | 'commercial' | 'specialty';

const serviceImages: Record<string, string> = servicePictures.servicesPageCardPictures;

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
              <p className="text-foreground-500 text-base">{copy.emptyState.text}</p>
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