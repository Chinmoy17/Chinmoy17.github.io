/**
 * Lightweight analytics loader — Google Analytics 4 (pageviews/events) and
 * Microsoft Clarity (heatmaps + session recordings). Both are free. Scripts
 * only load in production builds, and only when their ID is configured.
 */
const GA_ID = process.env.REACT_APP_GA_MEASUREMENT_ID;
const CLARITY_ID = process.env.REACT_APP_CLARITY_PROJECT_ID;
const isProd = process.env.NODE_ENV === "production";

let gaLoaded = false;
let clarityLoaded = false;

export function initAnalytics() {
  if (!isProd) return;
  initGA();
  initClarity();
}

function initGA() {
  if (gaLoaded || !GA_ID) return;
  gaLoaded = true;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag("js", new Date());
  // We send one page_view per route change ourselves (SPA), so skip GA's automatic one.
  gtag("config", GA_ID, { send_page_view: false });
}

function initClarity() {
  if (clarityLoaded || !CLARITY_ID) return;
  clarityLoaded = true;

  /* eslint-disable */
  (function (c, l, a, r, i, t, y) {
    c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
    t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
    y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
  })(window, document, "clarity", "script", CLARITY_ID);
  /* eslint-enable */
}

export function trackPageview(path) {
  if (!isProd) return;
  if (GA_ID && window.gtag) {
    window.gtag("event", "page_view", {
      page_path: path,
      page_location: window.location.href,
      page_title: document.title,
    });
  }
  if (CLARITY_ID && window.clarity) {
    window.clarity("set", "page_path", path);
  }
}

/** Fire a custom GA4 event, e.g. trackEvent("click_resume_download"). */
export function trackEvent(name, params = {}) {
  if (!isProd || !GA_ID || !window.gtag) return;
  window.gtag("event", name, params);
}
