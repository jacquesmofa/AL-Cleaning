import { useState, useRef, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '@/components/feature/Layout';
import { contactInfo } from '@/mocks/home';

const CONTACT_FORM_URL = 'https://readdy.ai/api/form/d9j6tmmc26n1c7c5q2h0';

export default function Contact() {
  const { t } = useTranslation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSubmitError('');

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);
      formData.set('name', name);
      formData.set('email', email);
      formData.set('phone', phone);
      formData.set('subject', subject);
      formData.set('message', message);

      const honeypot = formData.get('website_alt');
      if (honeypot && String(honeypot).trim() !== '') {
        setSubmitted(true);
        setLoading(false);
        return;
      }
      formData.delete('website_alt');

      const response = await fetch(CONTACT_FORM_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as unknown as Record<string, string>).toString(),
      });

      const responseText = await response.text();
      let parsed: Record<string, unknown> | null = null;
      try { parsed = JSON.parse(responseText); } catch { /* noop */ }

      if (response.ok && parsed && parsed.code === 'OK') {
        setSubmitted(true);
      } else {
        const serverMsg =
          (parsed && typeof parsed === 'object' && (parsed as Record<string, unknown>).meta
            ? ((parsed as Record<string, unknown>).meta as Record<string, unknown>).message
            : undefined) ||
          (parsed && typeof parsed === 'object' && parsed.message) ||
          responseText ||
          t('contactFormError');
        setSubmitError(String(serverMsg));
      }
    } catch {
      setSubmitError(t('contactFormError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      {/* Header */}
      <section className="py-14 md:py-20 bg-background-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <span className="inline-block text-primary-600 text-sm font-semibold tracking-wider uppercase mb-3">
            {t('navContact')}
          </span>
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-foreground-950 mb-4">
            {t('contactPageTitle')}
          </h1>
          <p className="text-foreground-600 max-w-2xl mx-auto text-base md:text-lg">
            {t('contactPageSubtext')}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16 bg-background-50">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="bg-background-100 rounded-2xl border border-background-200 p-8 md:p-12 text-center">
                  <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-accent-100 text-accent-600 mb-5">
                    <i className="ri-check-line text-2xl"></i>
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-foreground-950 mb-2">
                    {t('contactFormSuccessTitle')}
                  </h3>
                  <p className="text-foreground-500 text-sm">{t('contactFormSuccessText')}</p>
                </div>
              ) : (
                <>
                  <h2 className="font-heading text-xl font-semibold text-foreground-950 mb-6">
                    {t('contactFormTitle')}
                  </h2>
                  <form ref={formRef} onSubmit={handleSubmit} data-readdy-form="" className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contact-name" className="block text-sm font-medium text-foreground-700 mb-1.5">
                          {t('contactFormName')} *
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          name="name"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="John Smith"
                          className="w-full px-4 py-2.5 rounded-lg border border-background-200 bg-background-50 text-sm text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:border-primary-300 focus:ring-2 focus:ring-primary-100 transition-all"
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-email" className="block text-sm font-medium text-foreground-700 mb-1.5">
                          {t('contactFormEmail')} *
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          name="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="john@example.com"
                          className="w-full px-4 py-2.5 rounded-lg border border-background-200 bg-background-50 text-sm text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:border-primary-300 focus:ring-2 focus:ring-primary-100 transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="contact-phone" className="block text-sm font-medium text-foreground-700 mb-1.5">
                        {t('contactFormPhone')}
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        name="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(416) 555-0123"
                        className="w-full px-4 py-2.5 rounded-lg border border-background-200 bg-background-50 text-sm text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:border-primary-300 focus:ring-2 focus:ring-primary-100 transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-subject" className="block text-sm font-medium text-foreground-700 mb-1.5">
                        {t('contactFormSubject')}
                      </label>
                      <input
                        id="contact-subject"
                        type="text"
                        name="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="e.g. Quote request"
                        className="w-full px-4 py-2.5 rounded-lg border border-background-200 bg-background-50 text-sm text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:border-primary-300 focus:ring-2 focus:ring-primary-100 transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-message" className="block text-sm font-medium text-foreground-700 mb-1.5">
                        {t('contactFormMessage')} *
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={5}
                        maxLength={500}
                        placeholder="Tell us how we can help..."
                        className="w-full px-4 py-2.5 rounded-lg border border-background-200 bg-background-50 text-sm text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:border-primary-300 focus:ring-2 focus:ring-primary-100 transition-all resize-none"
                      ></textarea>
                    </div>

                    {/* Honeypot */}
                    <div className="website-alt-field">
                      <input type="text" name="website_alt" tabIndex={-1} autoComplete="off" aria-hidden="true" readOnly />
                    </div>

                    {submitError && (
                      <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                        {submitError}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 bg-primary-500 text-background-50 text-sm font-semibold rounded-full hover:bg-primary-600 disabled:opacity-60 disabled:cursor-not-allowed transition-all whitespace-nowrap"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-2">
                          <i className="ri-loader-4-line animate-spin"></i>
                          {t('loading')}
                        </span>
                      ) : (
                        t('contactFormSubmit')
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>

            {/* Sidebar Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-background-100 rounded-xl p-6 border border-background-200">
                <h3 className="font-heading text-lg font-semibold text-foreground-950 mb-4">
                  {t('contactInfoTitle')}
                </h3>
                <ul className="space-y-4">
                  <li>
                    <span className="text-xs text-foreground-500">{t('contactPhoneLabel')}</span>
                    <a
                      href={`tel:${contactInfo.phoneRaw}`}
                      className="block text-foreground-900 font-semibold hover:text-primary-500 transition-colors mt-0.5"
                    >
                      {contactInfo.phone}
                    </a>
                  </li>
                  <li>
                    <span className="text-xs text-foreground-500">{t('contactEmailLabel')}</span>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="block text-foreground-900 hover:text-primary-500 transition-colors mt-0.5 break-all"
                    >
                      {contactInfo.email}
                    </a>
                  </li>
                  <li>
                    <span className="text-xs text-foreground-500">{t('contactAddressLabel')}</span>
                    <p className="text-foreground-900 mt-0.5">{contactInfo.address}</p>
                  </li>
                  <li>
                    <span className="text-xs text-foreground-500">{t('contactHoursLabel')}</span>
                    <p className="text-foreground-900 font-semibold mt-0.5">{t('contactHoursValue')}</p>
                  </li>
                </ul>
              </div>

              {/* Quick Contact */}
              <div className="bg-accent-50 rounded-xl p-6 border border-accent-200 space-y-3">
                <h3 className="font-heading text-lg font-semibold text-foreground-950">
                  {t('contactQuickTitle')}
                </h3>
                <a
                  href={contactInfo.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-accent-500 text-foreground-950 text-sm font-semibold rounded-full hover:bg-accent-400 transition-colors whitespace-nowrap"
                >
                  <i className="ri-whatsapp-line"></i>
                  {t('whatsappChat')}
                </a>
                <a
                  href={`sms:${contactInfo.phoneRaw}?body=${encodeURIComponent(t('smsBody'))}`}
                  className="flex items-center justify-center gap-2 w-full py-3 border border-primary-200 text-primary-600 text-sm font-semibold rounded-full hover:bg-primary-50 transition-colors whitespace-nowrap"
                >
                  <i className="ri-message-3-line"></i>
                  {t('smsBtn')} — {contactInfo.phone}
                </a>
              </div>

              {/* Map */}
              <div className="bg-background-100 rounded-xl p-4 border border-background-200">
                <h3 className="font-heading text-sm font-semibold text-foreground-950 mb-3">
                  {t('contactMapTitle')}
                </h3>
                <div className="w-full h-48 rounded-lg overflow-hidden">
                  <iframe
                    title="AL Cleaning Pro Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11548.752105773754!2d-79.7624177!3d43.7315479!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b1592e22fbb5b%3A0x7cbcb9f9bc4b27b5!2sBrampton%2C%20ON!5e0!3m2!1sen!2sca!4v1690000000000!5m2!1sen!2sca"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}