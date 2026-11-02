(() => {
  const body = document.body;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let ticking = false;

  function updateBackgroundOffset() {
    ticking = false;

    if (reducedMotion.matches) {
      body.style.setProperty('--home-bg-parallax', '0px');
      return;
    }

    const offset = window.scrollY * 0.2;
    body.style.setProperty('--home-bg-parallax', `${offset}px`);
  }

  function requestUpdate() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateBackgroundOffset);
  }

  updateBackgroundOffset();
  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate, { passive: true });
  reducedMotion.addEventListener('change', updateBackgroundOffset);
})();
