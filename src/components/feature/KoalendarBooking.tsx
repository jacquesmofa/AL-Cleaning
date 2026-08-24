import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

type KoalendarFn = ((...args: unknown[]) => void) & { props?: unknown[][] };

let koalendarScriptInjected = false;

interface KoalendarBookingProps {
  url?: string;
  selectorId?: string;
}

export default function KoalendarBooking({
  url = 'https://koalendar.com/e/al-cleaning-pro',
  selectorId = 'inline-widget-al-cleaning-pro',
}: KoalendarBookingProps) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const win = window as unknown as { Koalendar?: KoalendarFn };

    if (!win.Koalendar) {
      const stub = ((...args: unknown[]) => {
        const fn = win.Koalendar as KoalendarFn;
        fn.props = fn.props || [];
        fn.props.push(args);
      }) as KoalendarFn;
      win.Koalendar = stub;
    }

    (win.Koalendar as KoalendarFn)('inline', { url, selector: `#${selectorId}` });

    if (koalendarScriptInjected) {
      setLoading(false);
      return;
    }

    koalendarScriptInjected = true;
    const script = document.createElement('script');
    script.id = 'koalendar-widget-script';
    script.src = 'https://koalendar.com/assets/widget.js';
    script.async = true;
    script.onload = () => setLoading(false);
    script.onerror = () => setLoading(false);
    document.body.appendChild(script);
  }, [url, selectorId]);

  return (
    <div className="relative w-full rounded-2xl border border-background-200 bg-background-50">
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-background-50">
          <div className="flex flex-col items-center gap-3 text-foreground-500">
            <i className="ri-loader-4-line animate-spin text-2xl text-primary-500"></i>
            <span className="text-sm">{t('bookingLoading')}</span>
          </div>
        </div>
      )}
      <div id={selectorId} className="w-full min-h-[720px]" />
    </div>
  );
}