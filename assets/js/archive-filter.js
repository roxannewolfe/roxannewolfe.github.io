(() => {
  const cards = [...document.querySelectorAll('.publication-card')];
  if (!cards.length) return;

  const params = new URLSearchParams(window.location.search);
  let activeType = (params.get('type') || 'all').toLowerCase();
  let activeTopic = (params.get('topic') || '').toLowerCase();

  const typeButtons = [...document.querySelectorAll('[data-filter-type]')];
  const topicButtons = [...document.querySelectorAll('[data-filter-topic]')];
  const status = document.querySelector('#archive-filter-status');

  function applyFilters() {
    let visible = 0;

    cards.forEach((card) => {
      const cardType = card.dataset.type || '';
      const cardTopics = (card.dataset.topics || '').split(',').filter(Boolean);
      const typeMatches = activeType === 'all' || cardType === activeType;
      const topicMatches = !activeTopic || cardTopics.includes(activeTopic);
      const show = typeMatches && topicMatches;

      card.hidden = !show;
      if (show) visible += 1;
    });

    typeButtons.forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.filterType === activeType));
    });

    topicButtons.forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.filterTopic === activeTopic));
    });

    if (status) status.textContent = `${visible} publication${visible === 1 ? '' : 's'} shown.`;

    const next = new URLSearchParams();
    if (activeType !== 'all') next.set('type', activeType);
    if (activeTopic) next.set('topic', activeTopic);
    const query = next.toString();
    history.replaceState(null, '', `${window.location.pathname}${query ? `?${query}` : ''}`);
  }

  typeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      activeType = button.dataset.filterType;
      applyFilters();
    });
  });

  topicButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const chosen = button.dataset.filterTopic;
      activeTopic = activeTopic === chosen ? '' : chosen;
      applyFilters();
    });
  });

  applyFilters();
})();
