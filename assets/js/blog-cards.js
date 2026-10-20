(() => {
  const openFromHash = () => {
    if (!window.location.hash) return;

    const id = decodeURIComponent(window.location.hash.slice(1));
    const target = document.getElementById(id);
    if (!target || target.tagName !== 'DETAILS') return;

    target.open = true;

    requestAnimationFrame(() => {
      target.scrollIntoView({ block: 'center' });
    });
  };

  document.querySelectorAll('.blog-entry-preview-link').forEach((link) => {
    link.addEventListener('click', (event) => event.stopPropagation());
  });

  openFromHash();
  window.addEventListener('hashchange', openFromHash);
})();
