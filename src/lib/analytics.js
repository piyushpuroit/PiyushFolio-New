export function initAnalytics() {
  // Placeholder: initialize analytics providers here (Google Analytics, Plausible, etc.)
  // Reads env keys and conditionally loads analytics
}

export function trackEvent(name, payload = {}) {
  // Safe wrapper for sending analytics events
  if (typeof window === 'undefined') return;
  try {
    // Example: window.dataLayer && window.dataLayer.push({ event: name, ...payload })
  } catch (e) {
    // swallow errors to avoid breaking the app
    // console.error('Analytics error', e)
  }
}
