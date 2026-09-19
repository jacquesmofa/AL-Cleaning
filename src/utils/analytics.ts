type GtagParams = Record<string, unknown>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (command: string, ...args: unknown[]) => void;
  }
}

/**
 * Sends a Google Ads / Google tag event if the tag is present on the page.
 * Safe no-op when the tag is blocked or unavailable (e.g. ad blockers, SSR).
 */
export function trackEvent(eventName: string, params: GtagParams = {}): void {
  if (typeof window === 'undefined') return;
  if (typeof window.gtag !== 'function') return;
  window.gtag('event', eventName, params);
}