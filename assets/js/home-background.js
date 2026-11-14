(() => {
  const background = document.querySelector('.home-background');
  if (!background) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let ticking = false;

  function updateBackground() {
    ticking = false;

    if (reducedMotion.matches) {
      background.style.setProperty('--home-bg-shift', '0px');
      return;
    }

    const maxShift = window.innerHeight * 0.6;
    const shift = Math.min(window.scrollY * 0.2, maxShift);
    background.style.setProperty('--home-bg-shift', `${shift}px`);
  }

  function requestUpdate() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateBackground);
  }

  updateBackground();
  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate, { passive: true });
  reducedMotion.addEventListener('change', updateBackground);
})();
