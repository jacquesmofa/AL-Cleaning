import { useTranslation } from 'react-i18next';
import KoalendarBooking from '@/components/feature/KoalendarBooking';
import { contactInfo } from '@/mocks/home';

export default function BookingSection() {
  const { t } = useTranslation();

  const steps = [
    { titleKey: 'bookingStep1Title', descKey: 'bookingStep1Desc' },
    { titleKey: 'bookingStep2Title', descKey: 'bookingStep2Desc' },
    { titleKey: 'bookingStep3Title', descKey: 'bookingStep3Desc' },
  ];

  return (
    <section id="book" className="py-16 md:py-20 bg-background-50">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-14">
          <span className="inline-block text-accent-600 text-sm font-semibold tracking-wider uppercase mb-3">
            {t('bookingLabel')}
          </span>
          <h2 className="text-2xl md:text-4xl font-heading font-bold text-foreground-950 mb-4">
            {t('bookingTitle')}
          </h2>
          <p className="text-foreground-600 max-w-2xl mx-auto text-base">
            {t('bookingSubtext')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <KoalendarBooking />
          </div>

          <aside className="space-y-6">
            <div className="bg-background-100 rounded-2xl border border-background-200 p-6">
              <h3 className="font-heading text-lg font-semibold text-foreground-950 mb-5">
                {t('bookingHowTitle')}
              </h3>
              <ol className="space-y-5">
                {steps.map((step, i) => (
                  <li key={step.titleKey} className="flex items-start gap-3">
                    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-accent-100 text-accent-600 text-sm font-bold flex-shrink-0">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-foreground-950">{t(step.titleKey)}</p>
                      <p className="text-sm text-foreground-500 mt-0.5">{t(step.descKey)}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="bg-accent-50 rounded-2xl border border-accent-200 p-6">
              <h3 className="font-heading text-base font-semibold text-foreground-950 mb-3 flex items-center gap-2">
                <i className="ri-shield-check-line text-accent-600"></i>
                {t('bookingNoteTitle')}
              </h3>
              <p className="text-sm text-foreground-600">{t('bookingNoteDesc')}</p>
            </div>

            <div className="bg-background-100 rounded-2xl border border-background-200 p-6">
              <p className="text-xs text-foreground-500 mb-1">{t('bookingEmailLabel')}</p>
              <p className="text-sm text-foreground-900 break-all">{contactInfo.email}</p>
              <p className="text-xs text-foreground-500 mt-1.5">{t('bookingEmailValue')}</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}