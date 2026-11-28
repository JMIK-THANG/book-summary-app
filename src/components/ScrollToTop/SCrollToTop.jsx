import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const lenisRef = useRef(null);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncMotionPreference = () => {
      lenisRef.current?.destroy();
      lenisRef.current = motion.matches
        ? null
        : new Lenis({
            autoRaf: true,
            smoothWheel: true,
            syncTouch: false,
            lerp: 0.09,
            allowNestedScroll: true,
            prevent: (node) => node.matches("dialog, textarea, select, input, .hero-category-shelf"),
          });
    };

    syncMotionPreference();
    motion.addEventListener("change", syncMotionPreference);
    return () => {
      motion.removeEventListener("change", syncMotionPreference);
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;
