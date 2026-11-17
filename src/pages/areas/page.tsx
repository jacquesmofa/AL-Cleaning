import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { serviceAreas } from '@/mocks/home';
import Layout from '@/components/feature/Layout';
import copy from '../../content/pages/areas.json';
// Text, images and links: src/content/pages/areas.json (editable in the website editors).

export default function AreasHub() {
  const { t } = useTranslation();

  return (
    <Layout>
      {/* Header */}
      <section className="py-14 md:py-20 bg-background-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <span className="inline-block text-primary-600 text-sm font-semibold tracking-wider uppercase mb-3">
            {t('areasLabel')}
          </span>
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-foreground-950 mb-4">
            {t('areasTitle')}
          </h1>
          <p className="text-foreground-600 max-w-2xl mx-auto text-base md:text-lg">
            {t('areasSubtext')}
          </p>
        </div>
      </section>

      {/* Areas Grid */}
      <section className="py-12 md:py-16 bg-background-50">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {serviceAreas.slice(0, 4).map((area) => (
              <Link
                key={area.cityId}
                to={`/areas/${area.cityId}`}
                className="group bg-background-100 rounded-xl p-5 border border-background-200 hover:border-primary-200 hover:bg-primary-50/50 transition-all duration-300 text-center"
              >
                <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-primary-100 text-primary-600 mb-3 group-hover:bg-primary-500 group-hover:text-background-50 transition-all">
                  <i className={`${area.icon} text-lg`}></i>
                </div>
                <h3 className="font-heading text-base font-semibold text-foreground-950 mb-1">
                  {t(area.cityKey)}
                </h3>
                <p className="text-xs text-foreground-500">{t(area.descKey)}</p>
              </Link>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
            {serviceAreas.slice(4).map((area) => (
              <Link
                key={area.cityId}
                to={`/areas/${area.cityId}`}
                className="group bg-background-100 rounded-xl p-5 border border-background-200 hover:border-primary-200 hover:bg-primary-50/50 transition-all duration-300 text-center"
              >
                <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-primary-100 text-primary-600 mb-3 group-hover:bg-primary-500 group-hover:text-background-50 transition-all">
                  <i className={`${area.icon} text-lg`}></i>
                </div>
                <h3 className="font-heading text-base font-semibold text-foreground-950 mb-1">
                  {t(area.cityKey)}
                </h3>
                <p className="text-xs text-foreground-500">{t(area.descKey)}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-12 md:py-16 bg-background-100">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <h2 className="font-heading text-xl font-semibold text-foreground-950 text-center mb-6">
            {t('areaCityCoverageMap')}
          </h2>
          <div className="w-full rounded-xl overflow-hidden border border-background-200 h-72 md:h-96">
            <iframe
              title={copy.map.title}
              src={copy.map.embedUrl}
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
    </Layout>
  );
}