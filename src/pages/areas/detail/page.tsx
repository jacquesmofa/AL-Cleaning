import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { serviceAreas, cityDetails } from '@/mocks/home';
import Layout from '@/components/feature/Layout';

export default function CityDetail() {
  const { cityId } = useParams<{ cityId: string }>();
  const { t, i18n } = useTranslation();
  const isFr = i18n.language === 'fr';

  const area = serviceAreas.find((a) => a.cityId === cityId);
  const detail = cityId ? cityDetails[cityId] : undefined;

  if (!area || !detail) {
    return (
      <Layout>
        <div className="py-32 text-center">
          <p className="text-foreground-500 text-lg">{t('pageNotFound')}</p>
          <Link to="/areas" className="text-primary-500 hover:text-primary-600 mt-4 inline-block font-semibold">
            {t('areaCityBack')}
          </Link>
        </div>
      </Layout>
    );
  }

  const cityTitle = isFr ? detail.titleFr : detail.titleEn;
  const neighborhoods = isFr ? detail.neighborhoodsFr : detail.neighborhoodsEn;

  return (
    <Layout>
      {/* Hero */}
      <section className="py-14 md:py-20 bg-background-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <Link
            to="/areas"
            className="inline-flex items-center gap-2 text-foreground-500 text-sm hover:text-primary-500 mb-6 transition-colors"
          >
            <i className="ri-arrow-left-line"></i>
            {t('areaCityBack')}
          </Link>
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-foreground-950 mb-4">
              {cityTitle}
            </h1>
            <p className="text-foreground-600 text-base md:text-lg leading-relaxed mb-8">
              {t(detail.descKey)}
            </p>
            <div className="flex items-center gap-2 text-sm text-foreground-500 mb-6">
              <i className="ri-check-double-fill text-accent-500"></i>
              <span>{t('areaCityTrustedBy')} {t(area.cityKey)}</span>
            </div>
            <Link
              to="/quote"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary-500 text-background-50 text-base font-semibold rounded-full hover:bg-primary-600 transition-all whitespace-nowrap"
            >
              {t('areaCityBookNow')} {t(area.cityKey)}
              <i className="ri-arrow-right-line"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Neighborhoods */}
      <section className="py-12 md:py-16 bg-background-50">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <h2 className="font-heading text-xl font-semibold text-foreground-950 mb-6 text-center">
            {t('areaCityNeighborhoods')}
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {neighborhoods.map((n) => (
              <span
                key={n}
                className="px-4 py-2 rounded-full bg-background-100 border border-background-200 text-sm text-foreground-600"
              >
                {n}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-12 md:py-16 bg-background-100">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <h2 className="font-heading text-xl font-semibold text-foreground-950 text-center mb-6">
            {t('areaCityCoverageMap')}
          </h2>
          <div className="w-full rounded-xl overflow-hidden border border-background-200 h-72 md:h-96">
            <iframe
              title={`AL Cleaning Pro in ${t(area.cityKey)}`}
              src={detail.mapEmbedUrl}
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

      {/* CTA */}
      <section className="py-14 md:py-16 bg-foreground-950">
        <div className="max-w-3xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-background-50 mb-4">
            {t('areaCityBookingCta')} {t(area.cityKey)}
          </h2>
          <p className="text-foreground-400 mb-8">{t('homeCtaSubtext')}</p>
          <Link
            to="/quote"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent-500 text-foreground-950 text-base font-semibold rounded-full hover:bg-accent-400 transition-all whitespace-nowrap"
          >
            {t('btnGetQuote')}
            <i className="ri-arrow-right-line"></i>
          </Link>
        </div>
      </section>
    </Layout>
  );
}