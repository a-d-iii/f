(function(){
  function adjust(card){
    const nameEl = card.querySelector('.faculty-name');
    const specEl = card.querySelector('.faculty-spec');
    if(!nameEl || !specEl) return;
    const lh = parseFloat(getComputedStyle(nameEl).lineHeight);
    const lines = Math.round(nameEl.offsetHeight / lh);
    if(lines > 1){
      specEl.classList.remove('clamp-five-lines');
      specEl.classList.add('clamp-four-lines');
    }
  }
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-faculty-card]').forEach(adjust);
  });
})();
