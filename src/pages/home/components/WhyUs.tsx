import { useTranslation } from 'react-i18next';
import { whyUsPillars } from '@/mocks/home';

export default function WhyUs() {
  const { t } = useTranslation();

  return (
    <section id="why-us" className="py-16 md:py-20 bg-background-100">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block text-accent-600 text-sm font-semibold tracking-wider uppercase mb-3">
            {t('whyUsLabel')}
          </span>
          <h2 className="text-2xl md:text-4xl font-heading font-bold text-foreground-950 mb-4">
            {t('whyUsTitle')}
          </h2>
          <p className="text-foreground-600 max-w-2xl mx-auto text-base">
            {t('whyUsSubtext')}
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {whyUsPillars.map((pillar, index) => (
            <div
              key={index}
              className="group bg-background-50 rounded-xl p-6 md:p-8 border border-background-200 hover:border-accent-200 transition-all duration-300 hover:bg-accent-50/50"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-accent-100 text-accent-600 mb-5 group-hover:bg-accent-500 group-hover:text-background-50 transition-all duration-300">
                <i className={`${pillar.icon} text-xl`}></i>
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground-950 mb-2">
                {t(pillar.titleKey)}
              </h3>
              <p className="text-foreground-600 text-sm leading-relaxed">
                {t(pillar.descKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}