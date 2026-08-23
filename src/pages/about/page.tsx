import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Layout from '@/components/feature/Layout';

export default function About() {
  const { t } = useTranslation();

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[380px] md:h-[460px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=Warm%20family-owned%20cleaning%20business%20team%20standing%20together%20in%20a%20bright%20modern%20home%20interior%2C%20smiling%20friendly%20professional%20cleaners%20in%20uniform%2C%20natural%20light%2C%20genuine%20authentic%20atmosphere%2C%20editorial%20portrait%20photography%2C%20soft%20warm%20tones%2C%20clean%20aesthetic%2C%20community%20trust%20feeling&width=1600&height=800&seq=about-hero-v2&orientation=landscape"
            alt="AL Cleaning Pro family team"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground-950/55 via-foreground-950/30 to-foreground-950/65"></div>
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-6">
          <span className="inline-block text-accent-400 text-sm font-semibold tracking-wider uppercase mb-3">
            {t('aboutLabel')}
          </span>
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-background-50 mb-4 max-w-2xl">
            {t('aboutTitle')}
          </h1>
          <p className="text-base md:text-lg text-background-50/80 max-w-xl">
            {t('aboutSubtext')}
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-14 md:py-20 bg-background-50">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-8 text-center">
            {t('aboutStoryTitle')}
          </h2>
          <div className="space-y-5 text-foreground-600 leading-relaxed">
            <p>{t('aboutStoryP1')}</p>
            <p>{t('aboutStoryP2')}</p>
            <p>{t('aboutStoryP3')}</p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-14 md:py-20 bg-background-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-10 text-center">
            {t('aboutValuesTitle')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-background-50 rounded-xl p-6 border border-background-200 hover:border-accent-200 transition-all">
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-accent-100 text-accent-600 mb-4">
                <i className="ri-shield-check-line text-xl"></i>
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground-950 mb-2">
                {t('aboutValueSafetyTitle')}
              </h3>
              <p className="text-foreground-600 text-sm leading-relaxed">{t('aboutValueSafetyDesc')}</p>
            </div>
            <div className="bg-background-50 rounded-xl p-6 border border-background-200 hover:border-accent-200 transition-all">
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-accent-100 text-accent-600 mb-4">
                <i className="ri-leaf-line text-xl"></i>
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground-950 mb-2">
                {t('aboutValueEcoTitle')}
              </h3>
              <p className="text-foreground-600 text-sm leading-relaxed">{t('aboutValueEcoDesc')}</p>
            </div>
            <div className="bg-background-50 rounded-xl p-6 border border-background-200 hover:border-accent-200 transition-all">
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-accent-100 text-accent-600 mb-4">
                <i className="ri-team-line text-xl"></i>
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground-950 mb-2">
                {t('aboutValueTeamTitle')}
              </h3>
              <p className="text-foreground-600 text-sm leading-relaxed">{t('aboutValueTeamDesc')}</p>
            </div>
            <div className="bg-background-50 rounded-xl p-6 border border-background-200 hover:border-accent-200 transition-all">
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-accent-100 text-accent-600 mb-4">
                <i className="ri-thumb-up-line text-xl"></i>
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground-950 mb-2">
                {t('aboutValueGuaranteeTitle')}
              </h3>
              <p className="text-foreground-600 text-sm leading-relaxed">{t('aboutValueGuaranteeDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Owner Commitment */}
      <section className="py-14 md:py-20 bg-background-50">
        <div className="max-w-3xl mx-auto px-4 md:px-6 text-center">
          <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-primary-100 text-primary-600 mb-6">
            <i className="ri-heart-line text-2xl"></i>
          </div>
          <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-4">
            {t('aboutOwnerTitle')}
          </h2>
          <p className="text-foreground-600 leading-relaxed mb-6">
            {t('aboutOwnerText')}
          </p>
          <p className="text-foreground-700 font-medium">{t('aboutCtaText')}</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 md:py-16 bg-foreground-950">
        <div className="max-w-3xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-background-50 mb-4">
            {t('homeCtaTitle')}
          </h2>
          <p className="text-foreground-400 mb-8">{t('homeCtaSubtext')}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/quote"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent-500 text-foreground-950 text-base font-semibold rounded-full hover:bg-accent-400 transition-all whitespace-nowrap"
            >
              {t('btnGetQuote')}
              <i className="ri-arrow-right-line"></i>
            </Link>
            <a
              href="tel:+14168174825"
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-background-200 text-background-50 text-base font-semibold rounded-full hover:bg-foreground-800 transition-all whitespace-nowrap"
            >
              <i className="ri-phone-fill"></i>
              {t('btnCallNow')}
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}