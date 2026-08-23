import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { reviews } from '@/mocks/home';
import Layout from '@/components/feature/Layout';
import LeaveReviewModal from '@/pages/home/components/LeaveReviewModal';

type FilterType = 'all' | 'residential' | 'deep-clean' | 'move' | 'office' | 'airbnb' | 'post-construction';

export default function ReviewsPage() {
  const { t, i18n } = useTranslation();
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [showReviewModal, setShowReviewModal] = useState(false);

  const getReviewText = useCallback(
    (review: typeof reviews[0]) => (i18n.language === 'fr' ? review.textFr : review.textEn),
    [i18n.language],
  );

  const filterTabs: { key: FilterType; label: string }[] = [
    { key: 'all', label: t('reviewsFilterAll') },
    { key: 'residential', label: t('reviewsFilterResidential') },
    { key: 'deep-clean', label: t('reviewsFilterDeep') },
    { key: 'move', label: t('reviewsFilterMove') },
    { key: 'office', label: t('reviewsFilterOffice') },
    { key: 'airbnb', label: t('reviewsFilterAirbnb') },
    { key: 'post-construction', label: t('reviewsFilterConstruction') },
  ];

  const filtered = activeFilter === 'all'
    ? reviews
    : reviews.filter((r) => r.serviceType === activeFilter);

  return (
    <Layout>
      {/* Header */}
      <section className="py-14 md:py-20 bg-background-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <span className="inline-block text-accent-600 text-sm font-semibold tracking-wider uppercase mb-3">
            {t('reviewsLabel')}
          </span>
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-foreground-950 mb-4">
            {t('reviewsPageTitle')}
          </h1>
          <p className="text-foreground-600 max-w-2xl mx-auto text-base mb-8">
            {t('reviewsPageSubtext')}
          </p>

          {/* Stats Bar */}
          <div className="flex flex-wrap items-center justify-center gap-8 mb-8">
            <div className="text-center">
              <div className="flex items-center gap-0.5 mb-1">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className="ri-star-fill text-accent-500 text-lg"></i>
                ))}
              </div>
              <span className="text-sm text-foreground-500">{t('reviewsAverageRating')}: <strong className="text-foreground-950">5.0</strong></span>
            </div>
            <div className="text-center">
              <span className="text-3xl font-bold text-foreground-950">500+</span>
              <p className="text-sm text-foreground-500">{t('reviewsTotalReviews')}</p>
            </div>
          </div>

          <button
            onClick={() => setShowReviewModal(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-background-50 text-sm font-semibold rounded-full hover:bg-primary-600 transition-all whitespace-nowrap"
          >
            <i className="ri-pencil-line"></i>
            {t('reviewsBtn')}
          </button>
        </div>
      </section>

      {/* Filter + Reviews */}
      <section className="py-12 md:py-16 bg-background-50">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveFilter(tab.key)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                  activeFilter === tab.key
                    ? 'bg-primary-500 text-background-50'
                    : 'bg-background-100 text-foreground-600 hover:bg-background-200 border border-background-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filtered.map((review) => (
              <div
                key={review.id}
                className="bg-background-100 rounded-xl p-6 border border-background-200"
              >
                {/* Stars + Verified */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-0.5">
                    {[...Array(review.rating)].map((_, i) => (
                      <i key={i} className="ri-star-fill text-accent-500 text-sm"></i>
                    ))}
                  </div>
                  <span className="text-xs text-accent-600 font-medium bg-accent-50 px-2 py-0.5 rounded-full whitespace-nowrap">
                    <i className="ri-check-line mr-1"></i>
                    {t('reviewsVerifiedBadge')}
                  </span>
                </div>

                {/* Text */}
                <blockquote className="text-foreground-600 text-sm leading-relaxed mb-4">
                  &quot;{getReviewText(review)}&quot;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-background-200">
                  <div className="w-9 h-9 flex items-center justify-center rounded-full bg-primary-100 text-primary-700 font-semibold text-xs">
                    {review.initials}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground-950">{review.name}</div>
                    <div className="text-xs text-foreground-500">{review.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-foreground-500">No reviews match this filter.</p>
            </div>
          )}
        </div>
      </section>

      {showReviewModal && <LeaveReviewModal onClose={() => setShowReviewModal(false)} />}
    </Layout>
  );
}