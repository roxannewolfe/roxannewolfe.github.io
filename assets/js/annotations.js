(() => {
  const annotations = [...document.querySelectorAll('.annotation')];
  if (!annotations.length) return;

  function closeAnnotation(annotation) {
    const trigger = annotation.querySelector('.annotation-trigger');
    const bubble = annotation.querySelector('.annotation-bubble');
    if (!trigger || !bubble) return;

    trigger.setAttribute('aria-expanded', 'false');
    bubble.hidden = true;
  }

  function closeAll(except = null) {
    annotations.forEach((annotation) => {
      if (annotation !== except) closeAnnotation(annotation);
    });
  }

  annotations.forEach((annotation) => {
    const trigger = annotation.querySelector('.annotation-trigger');
    const bubble = annotation.querySelector('.annotation-bubble');
    if (!trigger || !bubble) return;

    trigger.addEventListener('click', (event) => {
      event.stopPropagation();
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';

      closeAll(annotation);
      trigger.setAttribute('aria-expanded', String(!isOpen));
      bubble.hidden = isOpen;
    });

    bubble.addEventListener('click', (event) => event.stopPropagation());
  });

  document.addEventListener('click', () => closeAll());

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeAll();
  });
})();
