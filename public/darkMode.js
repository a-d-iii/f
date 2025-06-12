(function(){
  const root = document.documentElement;
  const stored = localStorage.getItem('theme');
  if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    root.classList.add('dark');
  }
  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('dark-mode-toggle');
    if (btn) {
      btn.addEventListener('click', () => {
        const isDark = root.classList.toggle('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
      });
    }
  });
})();
