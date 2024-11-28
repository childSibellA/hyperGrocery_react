import { useEffect } from "react";

const DIRECTIONS = {
  up: "fade-up",
  right: "fade-right",
  left: "fade-left",
};

export function useFade(direction, options) {
  const className = DIRECTIONS[direction];

  return useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          let lastY = 0;
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          } else if (
            entry.boundingClientRect.bottom > 0 &&
            entry.boundingClientRect.y > lastY
          ) {
            entry.target.classList.remove("is-visible");
          }
          lastY = entry.boundingClientRect.y;
        });
      },
      { threshold: 0 }
    );

    const animateObserver = () => {
      options.forEach((selector) => {
        document.querySelectorAll(selector).forEach((el) => {
          el.classList.add(className);
          observer.observe(el);
        });
      });

      requestAnimationFrame(animateObserver);
    };

    animateObserver();

    return () => {
      observer.disconnect();
    };
  }, [className, options]);
}
