(function() {
  function setup() {
    const slider = document.getElementById('width-slider');
    const valueEl = document.getElementById('width-value');
    if (!slider) return;
    const root = document.documentElement;
    const update = () => {
      const val = slider.value;
      root.style.setProperty('--card-width', val + 'px');
      if (valueEl) valueEl.textContent = val + 'px';
    };
    slider.addEventListener('input', update);
    update();
  }
  document.addEventListener('DOMContentLoaded', setup);
})();
