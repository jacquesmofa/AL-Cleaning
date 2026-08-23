import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { services, reviews, serviceAreas, contactInfo } from '@/mocks/home';
import TopBar from './components/TopBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhyUs from './components/WhyUs';
import OurWork from './components/OurWork';
import Footer from './components/Footer';
import WhatsAppFloat from '@/components/feature/WhatsAppFloat';

export default function Home() {
  const { t, i18n } = useTranslation();
  const isFr = i18n.language === 'fr';

  const getReviewText = (review: typeof reviews[0]) =>
    isFr ? review.textFr : review.textEn;

  return (
    <div className="min-h-screen bg-background-50">
      <TopBar />
      <Navbar />
      <main>
        <Hero />

        {/* Why Us Preview */}
        <WhyUs />

        {/* Services Preview Grid */}
        <section className="py-14 md:py-20 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center mb-10">
              <span className="inline-block text-primary-600 text-sm font-semibold tracking-wider uppercase mb-3">
                {t('servicesLabel')}
              </span>
              <h2 className="text-2xl md:text-4xl font-heading font-bold text-foreground-950 mb-4">
                {t('homeServicesPreviewTitle')}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {services.map((service) => (
                <Link
                  key={service.id}
                  to={`/services/${service.id}`}
                  className="group bg-background-100 rounded-xl p-6 border border-background-200 hover:border-primary-200 transition-all"
                >
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-primary-100 text-primary-600 mb-4 group-hover:bg-primary-500 group-hover:text-background-50 transition-all">
                    <i className={`${service.icon} text-xl`}></i>
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-foreground-950 mb-2">
                    {t(service.titleKey)}
                  </h3>
                  <p className="text-foreground-600 text-sm leading-relaxed mb-3">
                    {t(service.descKey)}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary-500 group-hover:gap-2 transition-all whitespace-nowrap">
                    {t('serviceDetailLearnMore')}
                    <i className="ri-arrow-right-line"></i>
                  </span>
                </Link>
              ))}
            </div>

            <div className="text-center">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-6 py-3 text-primary-600 text-sm font-semibold rounded-full border border-primary-200 hover:bg-primary-50 transition-all whitespace-nowrap"
              >
                {t('homeServicesPreviewLink')}
                <i className="ri-arrow-right-line"></i>
              </Link>
            </div>
          </div>
        </section>

        {/* Our Work Gallery */}
        <OurWork />

        {/* Reviews Preview */}
        <section className="py-14 md:py-20 bg-background-50">
          <div className="max-w-5xl mx-auto px-4 md:px-6">
            <div className="text-center mb-10">
              <span className="inline-block text-accent-600 text-sm font-semibold tracking-wider uppercase mb-3">
                {t('reviewsLabel')}
              </span>
              <h2 className="text-2xl md:text-4xl font-heading font-bold text-foreground-950 mb-4">
                {t('homeReviewsPreviewTitle')}
              </h2>
              <div className="flex items-center justify-center gap-1 text-accent-500 mb-2">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className="ri-star-fill"></i>
                ))}
                <span className="text-foreground-600 text-sm ml-2">5.0 — 500+ {t('reviewsLabel')}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
              {reviews.slice(0, 3).map((review) => (
                <div key={review.id} className="bg-background-100 rounded-xl p-5 border border-background-200">
                  <div className="flex items-center gap-0.5 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="ri-star-fill text-accent-500 text-xs"></i>
                    ))}
                  </div>
                  <p className="text-foreground-600 text-sm leading-relaxed line-clamp-4 mb-4">
                    &quot;{getReviewText(review)}&quot;
                  </p>
                  <div className="flex items-center gap-2 pt-3 border-t border-background-200">
                    <div className="w-7 h-7 flex items-center justify-center rounded-full bg-primary-100 text-primary-700 font-semibold text-xs">
                      {review.initials}
                    </div>
                    <span className="text-xs font-semibold text-foreground-900">{review.name}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link
                to="/reviews"
                className="inline-flex items-center gap-2 px-6 py-3 text-primary-600 text-sm font-semibold rounded-full border border-primary-200 hover:bg-primary-50 transition-all whitespace-nowrap"
              >
                {t('homeReviewsPreviewLink')}
                <i className="ri-arrow-right-line"></i>
              </Link>
            </div>
          </div>
        </section>

        {/* Areas Preview */}
        <section className="py-14 md:py-20 bg-background-100">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center mb-10">
              <span className="inline-block text-primary-600 text-sm font-semibold tracking-wider uppercase mb-3">
                {t('areasLabel')}
              </span>
              <h2 className="text-2xl md:text-4xl font-heading font-bold text-foreground-950 mb-4">
                {t('homeAreasPreviewTitle')}
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 mb-10">
              {serviceAreas.map((area) => (
                <Link
                  key={area.cityId}
                  to={`/areas/${area.cityId}`}
                  className="group bg-background-50 rounded-xl p-4 text-center border border-background-200 hover:border-primary-200 hover:bg-primary-50/50 transition-all"
                >
                  <div className="w-9 h-9 mx-auto flex items-center justify-center rounded-full bg-primary-100 text-primary-600 mb-2 group-hover:bg-primary-500 group-hover:text-background-50 transition-all">
                    <i className={`${area.icon} text-sm`}></i>
                  </div>
                  <h4 className="font-heading text-sm font-semibold text-foreground-950">{t(area.cityKey)}</h4>
                </Link>
              ))}
            </div>

            <div className="text-center">
              <Link
                to="/areas"
                className="inline-flex items-center gap-2 px-6 py-3 text-primary-600 text-sm font-semibold rounded-full border border-primary-200 hover:bg-primary-50 transition-all whitespace-nowrap"
              >
                {t('homeAreasPreviewLink')}
                <i className="ri-arrow-right-line"></i>
              </Link>
            </div>
          </div>
        </section>

        {/* Flyer Promotional Section */}
        <section className="py-14 md:py-20 bg-background-50">
          <div className="max-w-5xl mx-auto px-4 md:px-6">
            <div className="bg-background-100 rounded-2xl overflow-hidden border border-background-200">
              <div className="flex flex-col lg:flex-row items-center">
                <div className="lg:w-5/12 p-8 md:p-10 flex flex-col justify-center">
                  <span className="inline-block text-accent-600 text-sm font-bold tracking-wider uppercase mb-3">
                    {isFr ? 'Offre Spéciale' : 'Special Offer'}
                  </span>
                  <h3 className="font-heading text-xl md:text-3xl font-bold text-foreground-950 mb-4 leading-tight">
                    {isFr
                      ? 'Nettoyage Professionnel — Votre Maison Brille Comme Jamais'
                      : 'Professional Cleaning — Your Home Has Never Looked This Good'}
                  </h3>
                  <p className="text-foreground-600 text-sm leading-relaxed mb-6">
                    {isFr
                      ? 'Des services de nettoyage abordables et fiables pour votre maison ou votre entreprise à Brampton et dans tout le GTA. Satisfaction garantie à chaque visite.'
                      : 'Affordable, reliable cleaning services for your home or business across Brampton and the GTA. Satisfaction guaranteed on every visit.'}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      to="/quote"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent-500 text-foreground-950 text-sm font-semibold rounded-full hover:bg-accent-400 transition-all whitespace-nowrap"
                    >
                      {t('btnGetQuote')}
                      <i className="ri-arrow-right-line"></i>
                    </Link>
                    <a
                      href={`tel:${contactInfo.phoneRaw}`}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-500 text-background-50 text-sm font-semibold rounded-full hover:bg-primary-600 transition-all whitespace-nowrap"
                    >
                      <i className="ri-phone-fill"></i>
                      {t('btnCallNow')}
                    </a>
                  </div>
                </div>
                <div className="lg:w-7/12">
                  <img
                    src="https://res.cloudinary.com/jhqbtz7k/image/upload/v1785113819/AL_Cleaning_Flyer_we1lor.jpg"
                    alt="AL Cleaning Pro Flyer"
                    className="w-full h-64 lg:h-[420px] object-cover object-top"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-16 md:py-20 bg-foreground-950">
          <div className="max-w-3xl mx-auto px-4 md:px-6 text-center">
            <h2 className="text-2xl md:text-4xl font-heading font-bold text-background-50 mb-4">
              {t('homeCtaTitle')}
            </h2>
            <p className="text-foreground-400 text-base mb-8">
              {t('homeCtaSubtext')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/quote"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent-500 text-foreground-950 text-base font-semibold rounded-full hover:bg-accent-400 transition-all whitespace-nowrap"
              >
                {t('btnGetQuote')}
                <i className="ri-arrow-right-line"></i>
              </Link>
              <a
                href={`tel:${contactInfo.phoneRaw}`}
                className="inline-flex items-center gap-2 px-8 py-3.5 border border-background-200 text-background-50 text-base font-semibold rounded-full hover:bg-foreground-800 transition-all whitespace-nowrap"
              >
                <i className="ri-phone-fill"></i>
                {t('btnCallNow')}
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}