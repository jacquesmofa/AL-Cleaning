import { useState, useMemo, useRef, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import {
  serviceOptions,
  bedroomAdders,
  bathroomAdders,
  frequencyOptions,
  pricingConfig,
  contactInfo,
} from '@/mocks/home';
import CheckoutModal from './CheckoutModal';

const QUOTE_FORM_URL = 'https://readdy.ai/api/form/d9j6tmmc26n1c7c5q2h0';

function generateRefId(): string {
  return 'ALC-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substring(2, 6).toUpperCase();
}

export default function QuoteEngine() {
  const { t, i18n } = useTranslation();

  // Form state
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [service, setService] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [sqft, setSqft] = useState('');
  const [frequency, setFrequency] = useState('one-time');
  const [preferredDate, setPreferredDate] = useState('');
  const [notes, setNotes] = useState('');

  // UI state
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [loading, setLoading] = useState(false);
  const [referenceId, setReferenceId] = useState('');
  const [showCheckout, setShowCheckout] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const formRef = useRef<HTMLFormElement>(null);

  // ---- Pricing Calculation ----
  const pricing = useMemo(() => {
    const serviceConfig = pricingConfig.find((p) => p.serviceId === service);
    const basePrice = serviceConfig ? serviceConfig.base : 0;

    const bedConfig = bedroomAdders.find((b) => b.value === bedrooms);
    const bedAdder = bedConfig ? bedConfig.adder : 0;

    const bathConfig = bathroomAdders.find((b) => b.value === bathrooms);
    const bathAdder = bathConfig ? bathConfig.adder : 0;

    const freqConfig = frequencyOptions.find((f) => f.value === frequency);
    const discountPct = freqConfig ? freqConfig.discount : 0;

    const subtotal = basePrice + bedAdder + bathAdder;
    const discountAmount = Math.round(subtotal * (discountPct / 100));
    const afterDiscount = subtotal - discountAmount;
    const tax = Math.round(afterDiscount * 0.13);
    const total = afterDiscount + tax;

    return { subtotal, discountAmount, afterDiscount, tax, total, basePrice };
  }, [service, bedrooms, bathrooms, frequency]);

  const handleServiceSelect = (value: string) => {
    setService(service === value ? '' : value);
    setValidationErrors((prev) => ({ ...prev, service: '' }));
  };

  const handleBedroomsSelect = (value: string) => {
    setBedrooms(bedrooms === value ? '' : value);
  };

  const handleBathroomsSelect = (value: string) => {
    setBathrooms(bathrooms === value ? '' : value);
  };

  const handleFrequencySelect = (value: string) => {
    setFrequency(value);
  };

  const validate = (): boolean => {
    const errors: Record<string, string> = {};
    if (!fullName.trim()) errors.fullName = t('quoteNameRequired');
    if (!phone.trim()) errors.phone = t('quotePhoneRequired');
    if (!email.trim()) errors.email = t('quoteEmailRequired');
    if (!service) errors.service = t('quoteServiceRequired');
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitQuote = async () => {
    if (!validate()) return;

    setLoading(true);
    setSubmitError('');

    try {
      const form = formRef.current;
      if (!form) throw new Error('Form not found');

      const formData = new FormData(form);
      formData.set('name', fullName);
      formData.set('phone', phone);
      formData.set('email', email);
      formData.set('address', address);
      formData.set('service', service);
      formData.set('bedrooms', bedrooms);
      formData.set('bathrooms', bathrooms);
      formData.set('sqft', sqft);
      formData.set('frequency', frequency);
      formData.set('preferred_date', preferredDate);
      formData.set('notes', notes);
      formData.set('estimated_total', String(pricing.total));

      const honeypot = formData.get('phone_alt');
      if (honeypot && String(honeypot).trim() !== '') {
        setReferenceId(generateRefId());
        setSubmitted(true);
        setLoading(false);
        return;
      }
      formData.delete('phone_alt');

      const response = await fetch(QUOTE_FORM_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as unknown as Record<string, string>).toString(),
      });

      const responseText = await response.text();
      let parsed: Record<string, unknown> | null = null;
      try { parsed = JSON.parse(responseText); } catch { /* not JSON */ }

      if (response.ok && parsed && parsed.code === 'OK') {
        setReferenceId(generateRefId());
        setSubmitted(true);
      } else {
        const serverMsg =
          (parsed && typeof parsed === 'object' && (parsed as Record<string, unknown>).meta
            ? ((parsed as Record<string, unknown>).meta as Record<string, unknown>).message
            : undefined) ||
          (parsed && typeof parsed === 'object' && parsed.message) ||
          responseText ||
          'Something went wrong. Please try again.';
        setSubmitError(String(serverMsg));
      }
    } catch {
      setSubmitError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBookAndPay = () => {
    if (!validate()) return;
    setShowCheckout(true);
  };

  const resetForm = () => {
    setFullName('');
    setPhone('');
    setEmail('');
    setAddress('');
    setService('');
    setBedrooms('');
    setBathrooms('');
    setSqft('');
    setFrequency('one-time');
    setPreferredDate('');
    setNotes('');
    setSubmitted(false);
    setSubmitError('');
    setReferenceId('');
  };

  return (
    <>
      <section id="quote" className="py-16 md:py-20 bg-background-100">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          {/* Section Header */}
          <div className="text-center mb-10 md:mb-14">
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

          {/* Success State */}
          {submitted ? (
            <div className="bg-background-50 rounded-2xl border border-background-200 p-8 md:p-12 text-center max-w-lg mx-auto">
              <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-accent-100 text-accent-600 mb-5">
                <i className="ri-check-line text-2xl"></i>
              </div>
              <h3 className="font-heading text-xl font-semibold text-foreground-950 mb-3">
                {t('quoteSuccess')}
              </h3>
              <p className="text-foreground-500 text-sm mb-2">
                {t('quoteReferenceId')}: <strong className="text-foreground-900">{referenceId}</strong>
              </p>
              <button
                onClick={resetForm}
                className="mt-6 px-6 py-2.5 bg-primary-500 text-background-50 text-sm font-semibold rounded-full hover:bg-primary-600 transition-all whitespace-nowrap"
              >
                {t('quoteClose')}
              </button>
            </div>
          ) : (
            <form ref={formRef} onSubmit={(e: FormEvent) => { e.preventDefault(); handleSubmitQuote(); }} data-readdy-form="" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* Form Fields - 3 cols */}
                <div className="lg:col-span-3 space-y-8">
                  {/* Step 1: Contact Info */}
                  <div className="bg-background-50 rounded-2xl border border-background-200 p-6 md:p-8">
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
                            {t('quoteEmail')} *
                          </label>
                          <input
                            id="quote-email"
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value); setValidationErrors((prev) => ({ ...prev, email: '' })); }}
                            placeholder="john@example.com"
                            className="w-full px-4 py-2.5 rounded-lg border border-background-200 bg-background-50 text-sm text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:border-primary-300 focus:ring-2 focus:ring-primary-100 transition-all"
                          />
                          {validationErrors.email && <p className="text-red-500 text-xs mt-1">{validationErrors.email}</p>}
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

                  {/* Step 2: Property Details */}
                  <div className="bg-background-50 rounded-2xl border border-background-200 p-6 md:p-8">
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
                              onClick={() => handleBedroomsSelect(b.value)}
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
                              onClick={() => handleBathroomsSelect(b.value)}
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
                              onClick={() => handleFrequencySelect(f.value)}
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

                      {/* Date */}
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

                  {/* Honeypot */}
                  <div className="website-alt-field">
                    <input type="text" name="phone_alt" tabIndex={-1} autoComplete="off" aria-hidden="true" readOnly />
                  </div>

                  {/* Error */}
                  {submitError && (
                    <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                      {submitError}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 py-3.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap bg-accent-500 text-foreground-950 hover:bg-accent-400 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-2">
                          <i className="ri-loader-4-line animate-spin"></i>
                          {t('loading')}
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <i className="ri-mail-send-line"></i>
                          {t('quoteOptionA')}
                        </span>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={handleBookAndPay}
                      disabled={loading}
                      className="flex-1 py-3.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap bg-primary-500 text-background-50 hover:bg-primary-600 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <span className="flex items-center justify-center gap-2">
                        <i className="ri-bank-card-line"></i>
                        {t('quoteOptionB')}
                      </span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-start gap-2 text-xs text-foreground-500">
                      <i className="ri-information-line mt-0.5 flex-shrink-0"></i>
                      <span>{t('quoteOptionADesc')}</span>
                    </div>
                    <div className="flex items-start gap-2 text-xs text-foreground-500">
                      <i className="ri-information-line mt-0.5 flex-shrink-0"></i>
                      <span>{t('quoteOptionBDesc')}</span>
                    </div>
                  </div>
                </div>

                {/* Pricing Summary - 2 cols */}
                <div className="lg:col-span-2">
                  <div className="sticky top-24 bg-background-50 rounded-2xl border border-background-200 p-6 md:p-8">
                    <h3 className="font-heading text-lg font-semibold text-foreground-950 mb-6">
                      {i18n.language === 'fr' ? 'Résumé des Prix' : 'Price Summary'}
                    </h3>

                    {!service ? (
                      <p className="text-foreground-500 text-sm text-center py-8">
                        {i18n.language === 'fr'
                          ? 'Sélectionnez un service pour voir l\'estimation'
                          : 'Select a service to see your estimate'}
                      </p>
                    ) : (
                      <div className="space-y-4">
                        {/* Line Items */}
                        <div className="flex justify-between text-sm text-foreground-600">
                          <span>{t('quoteSubtotal')}</span>
                          <span className="font-medium">${pricing.subtotal.toLocaleString()}</span>
                        </div>

                        {pricing.discountAmount > 0 && (
                          <div className="flex justify-between text-sm text-accent-600">
                            <span>{t('quoteDiscount')}</span>
                            <span className="font-medium">-${pricing.discountAmount.toLocaleString()}</span>
                          </div>
                        )}

                        <div className="flex justify-between text-sm text-foreground-600">
                          <span>{t('quoteTax')}</span>
                          <span className="font-medium">${pricing.tax.toLocaleString()}</span>
                        </div>

                        <div className="border-t border-background-200 pt-4">
                          <div className="flex justify-between text-base font-semibold">
                            <span className="text-foreground-950">{t('quoteTotal')}</span>
                            <span className="text-primary-600">${pricing.total.toLocaleString()} CAD</span>
                          </div>
                        </div>

                        {/* Breakdown details */}
                        <div className="pt-4 border-t border-background-200 space-y-2">
                          <div className="flex justify-between text-xs text-foreground-500">
                            <span>{i18n.language === 'fr' ? 'Prix de base' : 'Base price'}</span>
                            <span>${pricing.basePrice}</span>
                          </div>
                          {bedrooms && (
                            <div className="flex justify-between text-xs text-foreground-500">
                              <span>{t('quoteBedrooms')}: {bedrooms}</span>
                              <span>+${bedroomAdders.find((b) => b.value === bedrooms)?.adder || 0}</span>
                            </div>
                          )}
                          {bathrooms && (
                            <div className="flex justify-between text-xs text-foreground-500">
                              <span>{t('quoteBathrooms')}: {bathrooms}</span>
                              <span>+${bathroomAdders.find((b) => b.value === bathrooms)?.adder || 0}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Quick Contact */}
                    <div className="mt-8 pt-6 border-t border-background-200">
                      <p className="text-xs text-foreground-500 mb-3">
                        {i18n.language === 'fr' ? 'Des questions ? Appelez-nous' : 'Questions? Call us'}
                      </p>
                      <a
                        href={`tel:${contactInfo.phoneRaw}`}
                        className="flex items-center gap-2 text-primary-600 font-semibold text-sm hover:text-primary-700 transition-colors"
                      >
                        <i className="ri-phone-fill"></i>
                        {contactInfo.phone}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* Checkout Modal */}
      {showCheckout && (
        <CheckoutModal
          onClose={() => setShowCheckout(false)}
          total={pricing.total}
          referenceId={referenceId || generateRefId()}
        />
      )}
    </>
  );
}