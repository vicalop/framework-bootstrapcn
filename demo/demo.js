// Demo chrome: theme persistence + toggle. Sidebar mobile overlay uses bootcn.
(function () {
  var root = document.documentElement;
  var SUN = '<svg class="bootcn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>';
  var MOON = '<svg class="bootcn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>';

  function apply(theme) {
    root.setAttribute('data-bs-theme', theme);
    var btn = document.getElementById('themeToggle');
    if (btn) btn.innerHTML = theme === 'dark' ? MOON : SUN;
  }
  var urlTheme = new URLSearchParams(location.search).get('theme');
  if (urlTheme === 'dark' || urlTheme === 'light') localStorage.setItem('theme', urlTheme);
  apply(localStorage.getItem('theme') || 'light');

  var toggle = document.getElementById('themeToggle');
  if (toggle) toggle.addEventListener('click', function () {
    var next = root.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', next);
    apply(next);
  });

  // Show the platform-correct command-palette hint (⌘ on Mac, Ctrl elsewhere).
  var isMac = /Mac|iPhone|iPad|iPod/.test(navigator.platform || navigator.userAgent);
  if (!isMac) {
    document.querySelectorAll('.kbd').forEach(function (k) {
      k.textContent = k.textContent.replace('⌘', 'Ctrl ');
    });
  }
})();
