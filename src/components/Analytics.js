import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { initAnalytics, trackPageview } from "../utils/analytics";

/** Mounts once; sends a GA4/Clarity pageview on every client-side route change. */
function Analytics() {
  const { pathname, search } = useLocation();
  const didInit = useRef(false);

  useEffect(() => {
    if (!didInit.current) {
      initAnalytics();
      didInit.current = true;
    }
  }, []);

  useEffect(() => {
    trackPageview(pathname + search);
  }, [pathname, search]);

  return null;
}

export default Analytics;
