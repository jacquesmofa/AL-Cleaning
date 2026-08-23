import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { reviews } from '@/mocks/home';
import LeaveReviewModal from './LeaveReviewModal';

export default function Reviews() {
  const { t, i18n } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % reviews.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + reviews.length) % reviews.length);
  }, []);

  const getReviewText = (review: typeof reviews[0]) => {
    return i18n.language === 'fr' ? review.textFr : review.textEn;
  };

  return (
    <>
      <section id="reviews" className="py-16 md:py-20 bg-background-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <span className="inline-block text-accent-600 text-sm font-semibold tracking-wider uppercase mb-3">
              {t('reviewsLabel')}
            </span>
            <h2 className="text-2xl md:text-4xl font-heading font-bold text-foreground-950 mb-4">
              {t('reviewsTitle')}
            </h2>
            <p className="text-foreground-600 max-w-2xl mx-auto text-base mb-6">
              {t('reviewsSubtext')}
            </p>
            <button
              onClick={() => setShowReviewModal(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-500 text-background-50 text-sm font-semibold rounded-full hover:bg-primary-600 transition-all whitespace-nowrap"
            >
              <i className="ri-pencil-line"></i>
              {t('reviewsBtn')}
            </button>
          </div>

          {/* Featured Review Card */}
          <div className="relative max-w-3xl mx-auto">
            <div className="bg-background-50 rounded-2xl border border-background-200 p-8 md:p-10">
              {/* Stars */}
              <div className="flex items-center gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className="ri-star-fill text-accent-500 text-lg"></i>
                ))}
              </div>

              {/* Review Text */}
              <blockquote className="text-foreground-700 text-base leading-relaxed mb-6">
                &quot;{getReviewText(reviews[currentSlide])}&quot;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary-100 text-primary-700 font-semibold text-sm">
                  {reviews[currentSlide].initials}
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground-950">
                    {reviews[currentSlide].name}
                  </div>
                  <div className="text-xs text-foreground-500">{reviews[currentSlide].location}</div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-3 mt-6">
              <button
                onClick={prevSlide}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-background-200 hover:border-primary-300 hover:bg-primary-50 text-foreground-600 transition-all"
                aria-label={t('reviewPrev')}
              >
                <i className="ri-arrow-left-line"></i>
              </button>

              {/* Indicators */}
              <div className="flex items-center gap-2">
                {reviews.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === currentSlide
                        ? 'bg-primary-500 w-6'
                        : 'bg-background-300 hover:bg-background-400'
                    }`}
                    aria-label={`Review ${i + 1}`}
                  ></button>
                ))}
              </div>

              <button
                onClick={nextSlide}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-background-200 hover:border-primary-300 hover:bg-primary-50 text-foreground-600 transition-all"
                aria-label={t('reviewNext')}
              >
                <i className="ri-arrow-right-line"></i>
              </button>
            </div>
          </div>

          {/* All Reviews Grid (compact) */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {reviews.slice(0, 4).map((review) => (
              <div
                key={review.id}
                className="bg-background-50 rounded-lg border border-background-200 p-4 hover:border-accent-200 transition-colors"
              >
                <div className="flex items-center gap-0.5 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="ri-star-fill text-accent-500 text-xs"></i>
                  ))}
                </div>
                <p className="text-foreground-600 text-sm leading-relaxed line-clamp-3 mb-3">
                  &quot;{getReviewText(review)}&quot;
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 flex items-center justify-center rounded-full bg-primary-100 text-primary-700 font-semibold text-xs">
                    {review.initials}
                  </div>
                  <span className="text-xs font-semibold text-foreground-900">{review.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leave Review Modal */}
      {showReviewModal && (
        <LeaveReviewModal onClose={() => setShowReviewModal(false)} />
      )}
    </>
  );
}