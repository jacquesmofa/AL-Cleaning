import { useTranslation } from 'react-i18next';
import { workGallery } from '@/mocks/home';

export default function OurWork() {
  const { t, i18n } = useTranslation();
  const isFr = i18n.language === 'fr';

  const getTitle = (item: typeof workGallery[0]) =>
    isFr ? item.titleFr : item.titleEn;
  const getDesc = (item: typeof workGallery[0]) =>
    isFr ? item.descFr : item.descEn;

  return (
    <section className="py-14 md:py-20 bg-background-100">
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
          {workGallery.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-xl bg-background-200 aspect-[4/3]"
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
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="#"
            className="inline-flex items-center gap-2 px-6 py-3 text-primary-600 text-sm font-semibold rounded-full border border-primary-200 hover:bg-primary-50 transition-all whitespace-nowrap"
          >
            {t('ourWorkViewMore')}
            <i className="ri-arrow-right-line"></i>
          </a>
        </div>
      </div>
    </section>
  );
}