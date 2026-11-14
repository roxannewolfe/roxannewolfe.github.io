(() => {
  const annotations = [...document.querySelectorAll('.annotation')];
  if (!annotations.length) return;

  function positionBubble(annotation) {
    const trigger = annotation.querySelector('.annotation-trigger');
    const highlight = annotation.querySelector('.annotation-highlight');
    const bubble = annotation.querySelector('.annotation-bubble');
    if (!trigger || !highlight || !bubble || bubble.hidden) return;

    const rects = [...highlight.getClientRects()];
    if (!rects.length) return;

    const anchor = rects[0];
    const bubbleRect = bubble.getBoundingClientRect();
    const viewportPadding = 12;
    const desiredCenter = anchor.left + (anchor.width / 2);
    const halfWidth = bubbleRect.width / 2;
    const minCenter = viewportPadding + halfWidth;
    const maxCenter = window.innerWidth - viewportPadding - halfWidth;
    const center = Math.min(Math.max(desiredCenter, minCenter), maxCenter);

    bubble.style.left = `${center}px`;
    bubble.style.top = `${anchor.top}px`;
  }

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

  function toggleAnnotation(annotation) {
    const trigger = annotation.querySelector('.annotation-trigger');
    const bubble = annotation.querySelector('.annotation-bubble');
    if (!trigger || !bubble) return;

    const isOpen = trigger.getAttribute('aria-expanded') === 'true';
    closeAll(annotation);

    if (isOpen) {
      closeAnnotation(annotation);
      return;
    }

    trigger.setAttribute('aria-expanded', 'true');
    bubble.hidden = false;
    positionBubble(annotation);
  }

  annotations.forEach((annotation) => {
    const trigger = annotation.querySelector('.annotation-trigger');
    const bubble = annotation.querySelector('.annotation-bubble');
    if (!trigger || !bubble) return;

    trigger.addEventListener('click', (event) => {
      event.stopPropagation();
      toggleAnnotation(annotation);
    });

    trigger.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        event.stopPropagation();
        toggleAnnotation(annotation);
      }
    });

    bubble.addEventListener('click', (event) => event.stopPropagation());
  });

  document.addEventListener('click', () => closeAll());

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeAll();
  });

  window.addEventListener('resize', () => {
    annotations.forEach((annotation) => positionBubble(annotation));
  });

  window.addEventListener('scroll', () => {
    annotations.forEach((annotation) => positionBubble(annotation));
  }, { passive: true });
})();
