import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { services } from '@/mocks/home';
import Layout from '@/components/feature/Layout';

const serviceImages: Record<string, string> = {
  residential:
    'https://readdy.ai/api/search-image?query=Professional%20cleaning%20team%20in%20a%20bright%20sunlit%20modern%20living%20room%20with%20beige%20sofa%2C%20wooden%20floors%2C%20warm%20natural%20daylight%2C%20cleaners%20in%20uniform%20dusting%20and%20vacuuming%2C%20clean%20minimal%20aesthetic%2C%20soft%20neutral%20palette%2C%20editorial%20interior%20photography&width=1600&height=800&seq=svc-detail-residential-v2&orientation=landscape',
  'deep-clean':
    'https://readdy.ai/api/search-image?query=Professional%20cleaner%20deep%20cleaning%20a%20luxurious%20white%20marble%20bathroom%2C%20scrubbing%20grout%20and%20tiles%2C%20professional%20cleaning%20tools%2C%20sparkling%20clean%20surfaces%2C%20soft%20ambient%20lighting%2C%20bright%20fresh%20clean%20aesthetic&width=1600&height=800&seq=svc-detail-deep-v2&orientation=landscape',
  move:
    'https://readdy.ai/api/search-image?query=Empty%20bright%20modern%20apartment%20with%20large%20windows%2C%20hardwood%20floors%2C%20professional%20cleaners%20polishing%20surfaces%2C%20moving%20boxes%20in%20corner%2C%20warm%20sunlight%20streaming%20in%2C%20fresh%20start%20clean%20spacious%20interior%2C%20editorial%20real%20estate%20photography&width=1600&height=800&seq=svc-detail-move-v2&orientation=landscape',
  office:
    'https://readdy.ai/api/search-image?query=Professional%20cleaner%20in%20uniform%20sanitizing%20modern%20open%20plan%20office%20with%20desks%2C%20computers%2C%20large%20windows%2C%20bright%20natural%20light%2C%20clean%20corporate%20aesthetic%2C%20plants%2C%20organized%20workspace%2C%20professional%20commercial%20photography&width=1600&height=800&seq=svc-detail-office-v2&orientation=landscape',
  airbnb:
    'https://readdy.ai/api/search-image?query=Professional%20cleaner%20making%20bed%20with%20fresh%20white%20linens%2C%20folded%20towels%20on%20side%2C%20bright%20cozy%20bedroom%20with%20warm%20decor%2C%20potted%20plants%2C%20soft%20natural%20lighting%20from%20window%2C%20welcoming%20guest-ready%20space%2C%20clean%20hospitality%20aesthetic&width=1600&height=800&seq=svc-detail-airbnb-v2&orientation=landscape',
  'post-construction':
    'https://readdy.ai/api/search-image?query=Professional%20cleaners%20with%20industrial%20HEPA%20vacuum%20and%20equipment%20deep%20cleaning%20freshly%20renovated%20modern%20kitchen%20with%20white%20cabinets%2C%20removing%20fine%20dust%2C%20bright%20work%20lighting%2C%20transformation%20scene%2C%20clean%20organized%20workspace&width=1600&height=800&seq=svc-detail-postcon-v2&orientation=landscape',
};

export default function ServiceDetail() {
  const { serviceId } = useParams<{ serviceId: string }>();
  const { t, i18n } = useTranslation();
  const isFr = i18n.language === 'fr';

  const service = services.find((s) => s.id === serviceId);

  if (!service) {
    return (
      <Layout>
        <div className="py-32 text-center">
          <p className="text-foreground-500 text-lg">{t('pageNotFound')}</p>
          <Link to="/services" className="text-primary-500 hover:text-primary-600 mt-4 inline-block font-semibold">
            {t('serviceDetailBack')}
          </Link>
        </div>
      </Layout>
    );
  }

  const heroTitle = isFr ? service.heroTitleFr : service.heroTitleEn;
  const heroSub = isFr ? service.heroSubFr : service.heroSubEn;
  const overview = isFr ? service.overviewFr : service.overviewEn;
  const includes = isFr ? service.includesFr : service.includesEn;
  const pricingNote = isFr ? service.pricingNoteFr : service.pricingNoteEn;
  const process = isFr ? service.processFr : service.processEn;
  const faq = isFr ? service.faqFr : service.faqEn;

  const imageUrl = serviceImages[service.id] || serviceImages.residential;

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[400px] md:h-[500px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={imageUrl} alt={t(service.titleKey)} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground-950/50 via-foreground-950/25 to-foreground-950/60"></div>
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-6">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-background-50/70 text-sm hover:text-background-50 mb-6 transition-colors"
          >
            <i className="ri-arrow-left-line"></i>
            {t('serviceDetailBack')}
          </Link>
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-heading font-bold text-background-50 leading-tight mb-4 max-w-2xl">
            {heroTitle}
          </h1>
          <p className="text-base md:text-lg text-background-50/80 max-w-xl mb-6">
            {heroSub}
          </p>
          <div className="flex items-center gap-3">
            <span className="text-accent-400 font-semibold text-lg">
              {t('serviceDetailStartingFrom')} ${service.startingPrice} {t('serviceDetailCAD')}
            </span>
            <Link
              to={`/quote?service=${service.id}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent-500 text-foreground-950 text-sm font-semibold rounded-full hover:bg-accent-400 transition-all whitespace-nowrap"
            >
              {t('serviceDetailBookNow')}
              <i className="ri-arrow-right-line"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-14 md:py-20 bg-background-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <h2 className="font-heading text-xl font-semibold text-foreground-950 mb-4">{t('serviceDetailOverview')}</h2>
              <p className="text-foreground-600 leading-relaxed">{overview}</p>
            </div>

            {/* Quick Info Card */}
            <div className="bg-background-100 rounded-xl p-6 border border-background-200 h-fit">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-primary-100 text-primary-600">
                  <i className={`${service.icon} text-xl`}></i>
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-foreground-950">{t(service.titleKey)}</h4>
                  <p className="text-sm text-foreground-500">
                    {t('serviceDetailStartingFrom')} ${service.startingPrice}
                  </p>
                </div>
              </div>
              <Link
                to={`/quote?service=${service.id}`}
                className="block w-full py-3 text-center text-sm font-semibold bg-primary-500 text-background-50 rounded-full hover:bg-primary-600 transition-all whitespace-nowrap"
              >
                {t('serviceDetailBookNow')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-14 md:py-20 bg-background-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-8 text-center">
            {t('serviceDetailIncludes')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {includes.map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-background-50 rounded-lg p-4 border border-background-200">
                <div className="w-6 h-6 flex items-center justify-center rounded-full bg-accent-100 text-accent-600 flex-shrink-0 mt-0.5">
                  <i className="ri-check-line text-sm"></i>
                </div>
                <span className="text-foreground-700 text-sm leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-14 md:py-20 bg-background-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-4">
              {t('serviceDetailPricing')}
            </h2>
            <p className="text-foreground-600 mb-8">{pricingNote}</p>
            <Link
              to={`/quote?service=${service.id}`}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary-500 text-background-50 text-base font-semibold rounded-full hover:bg-primary-600 transition-all whitespace-nowrap"
            >
              {t('btnGetQuote')}
              <i className="ri-arrow-right-line"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-14 md:py-20 bg-background-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-10 text-center">
            {t('serviceDetailProcess')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {process.map((p, i) => (
              <div key={i} className="text-center group">
                <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-primary-100 text-primary-700 font-bold text-lg mb-4 group-hover:bg-primary-500 group-hover:text-background-50 transition-all">
                  {p.step}
                </div>
                <h4 className="font-heading font-semibold text-foreground-950 mb-2">{p.title}</h4>
                <p className="text-foreground-500 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 md:py-20 bg-background-50">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-10 text-center">
            {t('serviceDetailFaq')}
          </h2>
          <div className="space-y-4">
            {faq.map((item, i) => (
              <div key={i} className="bg-background-100 rounded-xl p-5 border border-background-200">
                <h4 className="font-heading font-semibold text-foreground-950 mb-2">{item.q}</h4>
                <p className="text-foreground-600 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-14 md:py-16 bg-foreground-950">
        <div className="max-w-3xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-background-50 mb-4">
            {isFr ? 'Prêt à commencer ?' : 'Ready to Get Started?'}
          </h2>
          <p className="text-foreground-400 mb-8">
            {isFr
              ? `Réservez votre ${t(service.titleKey).toLowerCase()} dès aujourd'hui et découvrez la différence AL Cleaning Pro.`
              : `Book your ${t(service.titleKey).toLowerCase()} today and experience the AL Cleaning Pro difference.`}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to={`/quote?service=${service.id}`}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent-500 text-foreground-950 text-base font-semibold rounded-full hover:bg-accent-400 transition-all whitespace-nowrap"
            >
              {t('btnGetQuote')}
              <i className="ri-arrow-right-line"></i>
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-background-200 text-background-50 text-base font-semibold rounded-full hover:bg-foreground-800 transition-all whitespace-nowrap"
            >
              {t('serviceDetailBack')}
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}