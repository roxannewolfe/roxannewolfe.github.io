(() => {
  const entries = [...document.querySelectorAll('.blog-entry[data-blog-type]')];
  const filterButtons = [...document.querySelectorAll('[data-blog-filter]')];
  const monthButtons = [...document.querySelectorAll('[data-month-jump]')];
  let activeFilter = null;

  const applyFilter = () => {
    entries.forEach((entry) => {
      entry.hidden = Boolean(activeFilter && entry.dataset.blogType !== activeFilter);
    });

    filterButtons.forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.blogFilter === activeFilter));
    });
  };

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const selected = button.dataset.blogFilter;
      activeFilter = activeFilter === selected ? null : selected;
      applyFilter();
    });
  });

  monthButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const month = button.dataset.monthJump;
      let matches = entries.filter((entry) => entry.dataset.blogMonth === month && !entry.hidden);

      if (!matches.length && activeFilter) {
        activeFilter = null;
        applyFilter();
        matches = entries.filter((entry) => entry.dataset.blogMonth === month);
      }

      const target = matches[matches.length - 1];
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });

  const openFromHash = () => {
    if (!window.location.hash) return;

    const id = decodeURIComponent(window.location.hash.slice(1));
    const target = document.getElementById(id);
    if (!target || target.tagName !== 'DETAILS') return;

    if (target.hidden) {
      activeFilter = null;
      applyFilter();
    }

    target.open = true;

    requestAnimationFrame(() => {
      target.scrollIntoView({ block: 'center' });
    });
  };

  document.querySelectorAll('.blog-entry-preview-link').forEach((link) => {
    link.addEventListener('click', (event) => event.stopPropagation());
  });

  applyFilter();
  openFromHash();
  window.addEventListener('hashchange', openFromHash);
})();
