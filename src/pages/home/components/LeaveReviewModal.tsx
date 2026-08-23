import { useState, useRef, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';

const REVIEW_FORM_URL = 'https://readdy.ai/api/form/d9j6co8hpes2mi34s700';

interface LeaveReviewModalProps {
  onClose: () => void;
}

export default function LeaveReviewModal({ onClose }: LeaveReviewModalProps) {
  const { t } = useTranslation();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
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
      const honeypot = formData.get('company_alt');
      if (honeypot && String(honeypot).trim() !== '') {
        setSubmitted(true);
        setLoading(false);
        return;
      }

      formData.delete('company_alt');

      const response = await fetch(REVIEW_FORM_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as unknown as Record<string, string>).toString(),
      });

      const responseText = await response.text();
      let parsed: Record<string, unknown> | null = null;
      try {
        parsed = JSON.parse(responseText);
      } catch {
        // not JSON
      }

      if (response.ok && parsed && parsed.code === 'OK') {
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

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-foreground-950/60 backdrop-blur-sm" onClick={onClose}></div>

      {/* Modal */}
      <div className="relative bg-background-50 rounded-2xl max-w-md w-full p-6 md:p-8 shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-background-100 text-foreground-500 transition-colors"
          aria-label={t('reviewModalClose')}
        >
          <i className="ri-close-line"></i>
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-accent-100 text-accent-600 mb-4">
              <i className="ri-check-line text-2xl"></i>
            </div>
            <h3 className="font-heading text-xl font-semibold text-foreground-950 mb-2">
              {t('reviewModalSuccess')}
            </h3>
            <button
              onClick={onClose}
              className="mt-6 px-6 py-2.5 bg-primary-500 text-background-50 text-sm font-semibold rounded-full hover:bg-primary-600 transition-all whitespace-nowrap"
            >
              {t('reviewModalClose')}
            </button>
          </div>
        ) : (
          <>
            <h3 className="font-heading text-xl font-semibold text-foreground-950 mb-1">{t('reviewModalTitle')}</h3>
            <p className="text-foreground-600 text-sm mb-6">{t('reviewsSubtext')}</p>

            <form ref={formRef} onSubmit={handleSubmit} data-readdy-form="">
              {/* Star Rating */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-foreground-700 mb-2">{t('reviewModalRating')} *</label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="text-2xl transition-colors"
                    >
                      <i
                        className={`${
                          star <= (hoverRating || rating) ? 'ri-star-fill text-accent-500' : 'ri-star-line text-foreground-300'
                        }`}
                      ></i>
                    </button>
                  ))}
                </div>
                <input type="hidden" name="rating" value={rating} />
              </div>

              {/* Name */}
              <div className="mb-4">
                <label htmlFor="review-name" className="block text-sm font-medium text-foreground-700 mb-1.5">
                  {t('reviewModalName')} *
                </label>
                <input
                  id="review-name"
                  name="name"
                  type="text"
                  required
                  placeholder="Enter your name"
                  className="w-full px-4 py-2.5 rounded-lg border border-background-200 bg-background-50 text-sm text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:border-primary-300 focus:ring-2 focus:ring-primary-100 transition-all"
                />
              </div>

              {/* Location */}
              <div className="mb-4">
                <label htmlFor="review-location" className="block text-sm font-medium text-foreground-700 mb-1.5">
                  {t('reviewModalLocation')}
                </label>
                <input
                  id="review-location"
                  name="location"
                  type="text"
                  placeholder="e.g. Brampton, ON"
                  className="w-full px-4 py-2.5 rounded-lg border border-background-200 bg-background-50 text-sm text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:border-primary-300 focus:ring-2 focus:ring-primary-100 transition-all"
                />
              </div>

              {/* Review Text */}
              <div className="mb-5">
                <label htmlFor="review-text" className="block text-sm font-medium text-foreground-700 mb-1.5">
                  {t('reviewModalText')} *
                </label>
                <textarea
                  id="review-text"
                  name="review_text"
                  required
                  rows={4}
                  maxLength={500}
                  placeholder="Tell us about your experience..."
                  className="w-full px-4 py-2.5 rounded-lg border border-background-200 bg-background-50 text-sm text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:border-primary-300 focus:ring-2 focus:ring-primary-100 transition-all resize-none"
                ></textarea>
                <p className="text-xs text-foreground-400 mt-1">Maximum 500 characters</p>
              </div>

              {/* Honeypot */}
              <div className="website-alt-field">
                <input
                  type="text"
                  name="company_alt"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  readOnly
                />
              </div>

              {/* Error */}
              {submitError && (
                <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                  {submitError}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={rating === 0 || loading}
                className={`w-full py-3 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
                  rating === 0
                    ? 'bg-background-200 text-foreground-400 cursor-not-allowed'
                    : 'bg-primary-500 text-background-50 hover:bg-primary-600'
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <i className="ri-loader-4-line animate-spin"></i>
                    {t('loading')}
                  </span>
                ) : (
                  t('reviewModalSubmit')
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}