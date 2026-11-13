import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { workGallery } from '@/mocks/home';

export default function OurWork() {
  const { t, i18n } = useTranslation();
  const isFr = i18n.language === 'fr';

  const getTitle = (item: typeof workGallery[0]) =>
    isFr ? item.titleFr : item.titleEn;
  const getDesc = (item: typeof workGallery[0]) =>
    isFr ? item.descFr : item.descEn;

  // Full-screen viewer: click a photo, use arrows / swipe / Escape.
  const [open, setOpen] = useState<number | null>(null);
  const total = workGallery.length;
  const close = useCallback(() => setOpen(null), []);
  const step = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + total) % total)), [total]);
  const [touchX, setTouchX] = useState<number | null>(null);
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open, close, step]);

  return (
    <section id="our-work" className="py-14 md:py-20 bg-background-100 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-10">
          <span className="inline-block text-accent-600 text-sm font-semibold tracking-wider uppercase mb-3">
            {t('ourWorkLabel')}
          </span>
          <h2 className="text-2xl md:text-4xl font-heading font-bold text-foreground-950 mb-4">
            {t('ourWorkTitle')}
          </h2>
          <p className="max-w-2xl mx-auto text-foreground-600 text-base leading-relaxed">
            {t('ourWorkSubtext')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {workGallery.map((item, index) => (
            <button
              type="button"
              key={item.id}
              onClick={() => setOpen(index)}
              aria-label={getTitle(item)}
              className="group relative overflow-hidden rounded-xl bg-background-200 aspect-[4/3] text-left cursor-zoom-in focus:outline-none focus-visible:ring-4 focus-visible:ring-accent-400"
            >
              <img
                src={item.imageUrl}
                alt={getTitle(item)}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground-950/80 via-foreground-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <span className="inline-block px-2.5 py-1 bg-accent-500 text-foreground-950 text-xs font-semibold rounded-full mb-2 whitespace-nowrap">
                  {t(item.categoryKey)}
                </span>
                <h4 className="font-heading text-sm font-semibold text-background-50 mb-1">
                  {getTitle(item)}
                </h4>
                <p className="text-background-50/80 text-xs leading-relaxed line-clamp-2">
                  {getDesc(item)}
                </p>
              </div>
            </button>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/quote"
            className="inline-flex items-center gap-2 px-6 py-3 text-primary-700 text-sm font-semibold rounded-full border border-primary-200 hover:bg-primary-50 transition-all whitespace-nowrap"
          >
            {t('btnGetQuote')}
            <i className="ri-arrow-right-line"></i>
          </Link>
        </div>
      </div>

      {open !== null && (
        <div
          className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-foreground-950/95 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={getTitle(workGallery[open])}
          onClick={close}
          onTouchStart={(e) => setTouchX(e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX === null) return;
            const dx = e.changedTouches[0].clientX - touchX;
            if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
            setTouchX(null);
          }}
        >
          <img
            src={workGallery[open].imageUrl}
            alt={getTitle(workGallery[open])}
            className="max-h-[74vh] max-w-[94vw] rounded-lg object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="mt-4 max-w-xl text-center text-background-50" onClick={(e) => e.stopPropagation()}>
            <h4 className="font-heading font-semibold">{getTitle(workGallery[open])}</h4>
            <p className="text-sm text-background-50/75 mt-1">{getDesc(workGallery[open])}</p>
            <p className="text-xs tracking-widest text-background-50/60 mt-2">{open + 1} / {total}</p>
          </div>
          <button onClick={close} className="absolute top-4 right-4 w-12 h-12 rounded-full bg-background-50/10 hover:bg-background-50/25 text-background-50 text-2xl flex items-center justify-center cursor-pointer" aria-label={isFr ? 'Fermer' : 'Close'}>
            <i className="ri-close-line" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); step(-1); }} className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background-50/10 hover:bg-background-50/25 text-background-50 text-2xl flex items-center justify-center cursor-pointer" aria-label={isFr ? 'Photo précédente' : 'Previous photo'}>
            <i className="ri-arrow-left-s-line" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); step(1); }} className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background-50/10 hover:bg-background-50/25 text-background-50 text-2xl flex items-center justify-center cursor-pointer" aria-label={isFr ? 'Photo suivante' : 'Next photo'}>
            <i className="ri-arrow-right-s-line" />
          </button>
        </div>
      )}
    </section>
  );
}