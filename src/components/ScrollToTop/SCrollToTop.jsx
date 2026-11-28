import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let target = window.scrollY;
    let position = target;
    let previousTime = 0;

    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      previousTime = 0;
    };

    const animate = (time) => {
      const elapsed = previousTime ? time - previousTime : 16;
      previousTime = time;
      const remaining = target - position;
      if (Math.abs(remaining) < 1) {
        window.scrollTo({ top: target, behavior: "instant" });
        stop();
        return;
      }
      position += remaining * (1 - Math.exp(-elapsed / 85));
      window.scrollTo({ top: position, behavior: "instant" });
      frame = requestAnimationFrame(animate);
    };

    const onWheel = (event) => {
      if (motion.matches || event.defaultPrevented || !event.cancelable ||
          event.ctrlKey || event.shiftKey || Math.abs(event.deltaX) >= Math.abs(event.deltaY)) return;

      for (let element = event.target; element instanceof Element && element !== document.body; element = element.parentElement) {
        if (element.matches("dialog, textarea, select, input") ||
            (element.scrollHeight > element.clientHeight && /auto|scroll/.test(getComputedStyle(element).overflowY))) {
          stop();
          return;
        }
      }

      const root = document.scrollingElement;
      const max = root.scrollHeight - root.clientHeight;
      if (max <= 0) return;
      event.preventDefault();
      const scale = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1;
      target = Math.round(Math.min(max, Math.max(0, (frame ? target : window.scrollY) + event.deltaY * scale)));
      if (!frame) {
        position = window.scrollY;
        frame = requestAnimationFrame(animate);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", stop);
    window.addEventListener("pointerdown", stop);
    motion.addEventListener("change", stop);
    return () => {
      stop();
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", stop);
      window.removeEventListener("pointerdown", stop);
      motion.removeEventListener("change", stop);
    };
  }, [pathname]);

  return null;
};

export default ScrollToTop;
