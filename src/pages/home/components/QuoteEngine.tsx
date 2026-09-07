import { useState, type MouseEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  serviceOptions,
  bedroomAdders,
  bathroomAdders,
  frequencyOptions,
  contactInfo,
} from '@/mocks/home';

export default function QuoteEngine() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();

  // Form state
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [service, setService] = useState(searchParams.get('service') || '');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [sqft, setSqft] = useState('');
  const [frequency, setFrequency] = useState('one-time');
  const [preferredDate, setPreferredDate] = useState('');
  const [notes, setNotes] = useState('');

  // Validation state
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const phoneDigits = contactInfo.phoneRaw.replace(/\D/g, '');

  const serviceLabel = service
    ? t(serviceOptions.find((o) => o.value === service)?.labelKey || '')
    : '';
  const frequencyLabel = t(frequencyOptions.find((f) => f.value === frequency)?.labelKey || '');
  const bedroomLabel = bedroomAdders.find((b) => b.value === bedrooms)?.labelKey || '';
  const bathroomLabel = bathroomAdders.find((b) => b.value === bathrooms)?.labelKey || '';

  const buildMessage = (): string => {
    const lines = [
      t('quoteMsgGreeting'),
      '',
      `${t('quoteFullName')}: ${fullName.trim()}`,
      `${t('quotePhone')}: ${phone.trim()}`,
      email.trim() ? `${t('quoteEmail')}: ${email.trim()}` : '',
      address.trim() ? `${t('quoteAddress')}: ${address.trim()}` : '',
      service ? `${t('quoteServiceLabel')}: ${serviceLabel}` : '',
      bedrooms ? `${t('quoteBedrooms')}: ${bedroomLabel}` : '',
      bathrooms ? `${t('quoteBathrooms')}: ${bathroomLabel}` : '',
      sqft.trim() ? `${t('quoteSqft')}: ${sqft.trim()}` : '',
      `${t('quoteFrequency')}: ${frequencyLabel}`,
      preferredDate ? `${t('quoteDate')}: ${preferredDate}` : '',
      notes.trim() ? `${t('quoteNotes')}: ${notes.trim()}` : '',
    ];
    return lines.filter(Boolean).join('\n');
  };

  const encodedMessage = encodeURIComponent(buildMessage());
  const emailSubject = fullName.trim()
    ? `${t('quoteEmailSubject')} - ${fullName.trim()}`
    : t('quoteEmailSubject');

  const whatsappHref = `https://wa.me/${phoneDigits}?text=${encodedMessage}`;
  const smsHref = `sms:${contactInfo.phoneRaw}?body=${encodedMessage}`;
  const emailHref = `mailto:${contactInfo.email}?subject=${encodeURIComponent(emailSubject)}&body=${encodedMessage}`;

  const validate = (): boolean => {
    const errors: Record<string, string> = {};
    if (!fullName.trim()) errors.fullName = t('quoteNameRequired');
    if (!phone.trim()) errors.phone = t('quotePhoneRequired');
    if (!service) errors.service = t('quoteServiceRequired');
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChannelClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!validate()) e.preventDefault();
  };

  const handleServiceSelect = (value: string) => {
    setService(service === value ? '' : value);
    setValidationErrors((prev) => ({ ...prev, service: '' }));
  };

  return (
    <section id="quote" className="py-16 md:py-20 bg-background-100">
      <div className="max-w-3xl mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-12">
          <span className="inline-block text-primary-600 text-sm font-semibold tracking-wider uppercase mb-3">
            {t('quoteLabel')}
          </span>
          <h2 className="text-2xl md:text-4xl font-heading font-bold text-foreground-950 mb-4">
            {t('quoteTitle')}
          </h2>
          <p className="text-foreground-600 max-w-2xl mx-auto text-base">
            {t('quoteSubtext')}
          </p>
        </div>

        {/* Guarantee Banner */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-10">
          {['quoteGuarantee1', 'quoteGuarantee2', 'quoteGuarantee3', 'quoteGuarantee4'].map((key) => (
            <div key={key} className="flex items-center gap-2 text-sm text-foreground-700">
              <i className="ri-checkbox-circle-fill text-accent-500"></i>
              <span>{t(key)}</span>
            </div>
          ))}
        </div>

        {/* Step 1: Contact Info */}
        <div className="bg-background-50 rounded-2xl border border-background-200 p-6 md:p-8 mb-6">
          <h3 className="font-heading text-lg font-semibold text-foreground-950 mb-5 flex items-center gap-2">
            <span className="w-7 h-7 flex items-center justify-center rounded-full bg-primary-100 text-primary-700 text-xs font-bold">1</span>
            {t('quoteStep1')}
          </h3>

          <div className="space-y-4">
            <div>
              <label htmlFor="quote-name" className="block text-sm font-medium text-foreground-700 mb-1.5">
                {t('quoteFullName')} *
              </label>
              <input
                id="quote-name"
                type="text"
                name="name"
                value={fullName}
                onChange={(e) => { setFullName(e.target.value); setValidationErrors((prev) => ({ ...prev, fullName: '' })); }}
                placeholder="John Smith"
                className="w-full px-4 py-2.5 rounded-lg border border-background-200 bg-background-50 text-sm text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:border-primary-300 focus:ring-2 focus:ring-primary-100 transition-all"
              />
              {validationErrors.fullName && <p className="text-red-500 text-xs mt-1">{validationErrors.fullName}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="quote-phone" className="block text-sm font-medium text-foreground-700 mb-1.5">
                  {t('quotePhone')} *
                </label>
                <input
                  id="quote-phone"
                  type="tel"
                  name="phone"
                  value={phone}
                  onChange={(e) => { setPhone(e.target.value); setValidationErrors((prev) => ({ ...prev, phone: '' })); }}
                  placeholder="(416) 555-0123"
                  className="w-full px-4 py-2.5 rounded-lg border border-background-200 bg-background-50 text-sm text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:border-primary-300 focus:ring-2 focus:ring-primary-100 transition-all"
                />
                {validationErrors.phone && <p className="text-red-500 text-xs mt-1">{validationErrors.phone}</p>}
              </div>
              <div>
                <label htmlFor="quote-email" className="block text-sm font-medium text-foreground-700 mb-1.5">
                  {t('quoteEmail')}
                </label>
                <input
                  id="quote-email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="w-full px-4 py-2.5 rounded-lg border border-background-200 bg-background-50 text-sm text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:border-primary-300 focus:ring-2 focus:ring-primary-100 transition-all"
                />
              </div>
            </div>

            <div>
              <label htmlFor="quote-address" className="block text-sm font-medium text-foreground-700 mb-1.5">
                {t('quoteAddress')}
              </label>
              <input
                id="quote-address"
                type="text"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="123 Main St, Brampton, ON"
                className="w-full px-4 py-2.5 rounded-lg border border-background-200 bg-background-50 text-sm text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:border-primary-300 focus:ring-2 focus:ring-primary-100 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Step 2: Job Details */}
        <div className="bg-background-50 rounded-2xl border border-background-200 p-6 md:p-8 mb-6">
          <h3 className="font-heading text-lg font-semibold text-foreground-950 mb-5 flex items-center gap-2">
            <span className="w-7 h-7 flex items-center justify-center rounded-full bg-primary-100 text-primary-700 text-xs font-bold">2</span>
            {t('quoteStep2')}
          </h3>

          <div className="space-y-5">
            {/* Service Selection */}
            <div>
              <label className="block text-sm font-medium text-foreground-700 mb-2">
                {t('quoteServiceLabel')} *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {serviceOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => handleServiceSelect(opt.value)}
                    className={`px-4 py-2.5 rounded-lg border text-sm font-medium transition-all text-left whitespace-nowrap ${
                      service === opt.value
                        ? 'border-primary-400 bg-primary-50 text-primary-700'
                        : 'border-background-200 bg-background-50 text-foreground-600 hover:border-background-300'
                    }`}
                  >
                    {t(opt.labelKey)}
                  </button>
                ))}
              </div>
              {validationErrors.service && <p className="text-red-500 text-xs mt-1">{validationErrors.service}</p>}
            </div>

            {/* Bedrooms */}
            <div>
              <label className="block text-sm font-medium text-foreground-700 mb-2">
                {t('quoteBedrooms')}
              </label>
              <div className="flex flex-wrap gap-2">
                {bedroomAdders.map((b) => (
                  <button
                    key={b.value}
                    type="button"
                    onClick={() => setBedrooms(bedrooms === b.value ? '' : b.value)}
                    className={`px-4 py-2 rounded-full border text-sm font-medium transition-all whitespace-nowrap ${
                      bedrooms === b.value
                        ? 'border-primary-400 bg-primary-50 text-primary-700'
                        : 'border-background-200 bg-background-50 text-foreground-600 hover:border-background-300'
                    }`}
                  >
                    {b.labelKey}
                  </button>
                ))}
              </div>
            </div>

            {/* Bathrooms */}
            <div>
              <label className="block text-sm font-medium text-foreground-700 mb-2">
                {t('quoteBathrooms')}
              </label>
              <div className="flex flex-wrap gap-2">
                {bathroomAdders.map((b) => (
                  <button
                    key={b.value}
                    type="button"
                    onClick={() => setBathrooms(bathrooms === b.value ? '' : b.value)}
                    className={`px-4 py-2 rounded-full border text-sm font-medium transition-all whitespace-nowrap ${
                      bathrooms === b.value
                        ? 'border-primary-400 bg-primary-50 text-primary-700'
                        : 'border-background-200 bg-background-50 text-foreground-600 hover:border-background-300'
                    }`}
                  >
                    {b.labelKey}
                  </button>
                ))}
              </div>
            </div>

            {/* Square Feet */}
            <div>
              <label htmlFor="quote-sqft" className="block text-sm font-medium text-foreground-700 mb-1.5">
                {t('quoteSqft')}
              </label>
              <input
                id="quote-sqft"
                type="number"
                name="sqft"
                value={sqft}
                onChange={(e) => setSqft(e.target.value)}
                placeholder="e.g. 1500"
                className="w-full sm:w-48 px-4 py-2.5 rounded-lg border border-background-200 bg-background-50 text-sm text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:border-primary-300 focus:ring-2 focus:ring-primary-100 transition-all"
              />
            </div>

            {/* Frequency */}
            <div>
              <label className="block text-sm font-medium text-foreground-700 mb-2">
                {t('quoteFrequency')}
              </label>
              <div className="flex flex-wrap gap-2">
                {frequencyOptions.map((f) => (
                  <button
                    key={f.value}
                    type="button"
                    onClick={() => setFrequency(f.value)}
                    className={`px-4 py-2 rounded-full border text-sm font-medium transition-all whitespace-nowrap ${
                      frequency === f.value
                        ? 'border-accent-400 bg-accent-50 text-accent-700'
                        : 'border-background-200 bg-background-50 text-foreground-600 hover:border-background-300'
                    }`}
                  >
                    {t(f.labelKey)}
                  </button>
                ))}
              </div>
            </div>

            {/* Preferred Date */}
            <div>
              <label htmlFor="quote-date" className="block text-sm font-medium text-foreground-700 mb-1.5">
                {t('quoteDate')}
              </label>
              <input
                id="quote-date"
                type="date"
                name="preferred_date"
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full sm:w-56 px-4 py-2.5 rounded-lg border border-background-200 bg-background-50 text-sm text-foreground-900 focus:outline-none focus:border-primary-300 focus:ring-2 focus:ring-primary-100 transition-all"
              />
            </div>

            {/* Notes */}
            <div>
              <label htmlFor="quote-notes" className="block text-sm font-medium text-foreground-700 mb-1.5">
                {t('quoteNotes')}
              </label>
              <textarea
                id="quote-notes"
                name="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                maxLength={500}
                placeholder={t('quoteNotesPlaceholder')}
                className="w-full px-4 py-2.5 rounded-lg border border-background-200 bg-background-50 text-sm text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:border-primary-300 focus:ring-2 focus:ring-primary-100 transition-all resize-none"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Step 3: Choose Your Channel */}
        <div className="bg-background-50 rounded-2xl border border-background-200 p-6 md:p-8">
          <h3 className="font-heading text-lg font-semibold text-foreground-950 mb-2 flex items-center gap-2">
            <span className="w-7 h-7 flex items-center justify-center rounded-full bg-primary-100 text-primary-700 text-xs font-bold">3</span>
            {t('quoteChannelTitle')}
          </h3>
          <p className="text-foreground-600 text-sm mb-6">{t('quoteChannelHint')}</p>

          <div className="space-y-3">
            {/* WhatsApp */}
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleChannelClick}
              className="flex items-center gap-4 w-full px-5 py-4 rounded-xl bg-primary-500 text-background-50 hover:bg-primary-600 transition-all group"
            >
              <span className="w-11 h-11 flex items-center justify-center rounded-full bg-background-50/20 flex-shrink-0">
                <i className="ri-whatsapp-line text-xl"></i>
              </span>
              <span className="flex-1 text-left">
                <span className="block font-semibold text-sm whitespace-nowrap">{t('quoteChannelWhatsApp')}</span>
                <span className="block text-xs opacity-80">{t('quoteChannelWhatsAppSub')}</span>
              </span>
              <i className="ri-arrow-right-line text-lg group-hover:translate-x-1 transition-transform"></i>
            </a>

            {/* SMS */}
            <a
              href={smsHref}
              onClick={handleChannelClick}
              className="flex items-center gap-4 w-full px-5 py-4 rounded-xl bg-secondary-500 text-background-50 hover:bg-secondary-600 transition-all group"
            >
              <span className="w-11 h-11 flex items-center justify-center rounded-full bg-background-50/20 flex-shrink-0">
                <i className="ri-smartphone-line text-xl"></i>
              </span>
              <span className="flex-1 text-left">
                <span className="block font-semibold text-sm whitespace-nowrap">{t('quoteChannelSMS')}</span>
                <span className="block text-xs opacity-80">{t('quoteChannelSMSSub')}</span>
              </span>
              <i className="ri-arrow-right-line text-lg group-hover:translate-x-1 transition-transform"></i>
            </a>

            {/* Email */}
            <a
              href={emailHref}
              onClick={handleChannelClick}
              className="flex items-center gap-4 w-full px-5 py-4 rounded-xl bg-accent-500 text-foreground-950 hover:bg-accent-400 transition-all group"
            >
              <span className="w-11 h-11 flex items-center justify-center rounded-full bg-background-50/25 flex-shrink-0">
                <i className="ri-mail-send-line text-xl"></i>
              </span>
              <span className="flex-1 text-left">
                <span className="block font-semibold text-sm whitespace-nowrap">{t('quoteChannelEmail')}</span>
                <span className="block text-xs opacity-80">{t('quoteChannelEmailSub')}</span>
              </span>
              <i className="ri-arrow-right-line text-lg group-hover:translate-x-1 transition-transform"></i>
            </a>
          </div>

          {/* Quick contact fallback */}
          <div className="mt-6 pt-5 border-t border-background-200 text-center">
            <p className="text-xs text-foreground-500 mb-2">{t('contactQuickTitle')}</p>
            <a
              href={`tel:${contactInfo.phoneRaw}`}
              className="inline-flex items-center gap-2 text-primary-600 font-semibold text-sm hover:text-primary-700 transition-colors whitespace-nowrap"
            >
              <i className="ri-phone-fill"></i>
              {contactInfo.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}