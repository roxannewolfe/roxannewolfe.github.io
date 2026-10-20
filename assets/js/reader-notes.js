(() => {
  const triggers = document.querySelectorAll('.reader-note-trigger');

  triggers.forEach((trigger) => {
    const panel = trigger.nextElementSibling;
    if (!panel || !panel.classList.contains('reader-note-body')) return;

    trigger.addEventListener('click', () => {
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';
      trigger.setAttribute('aria-expanded', String(!isOpen));
      panel.hidden = isOpen;
    });
  });
})();
