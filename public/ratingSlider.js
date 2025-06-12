(function(){
  function colorAt(val){
    const stops=[
      [1,[153,27,27]],
      [2,[239,68,68]],
      [3,[252,211,77]],
      [4,[34,197,94]],
      [4.7,[21,128,61]],
      [5,[124,58,237]]
    ];
    for(let i=0;i<stops.length-1;i++){
      const [v1,c1]=stops[i];
      const [v2,c2]=stops[i+1];
      if(val>=v1&&val<=v2){
        const t=(val-v1)/(v2-v1);
        const r=Math.round(c1[0]+t*(c2[0]-c1[0]));
        const g=Math.round(c1[1]+t*(c2[1]-c1[1]));
        const b=Math.round(c1[2]+t*(c2[2]-c1[2]));
        return `rgb(${r},${g},${b})`;
      }
    }
    return 'rgb(124,58,237)';
  }
  function setupSlider(slider){
    const parent=slider.parentElement;
 
    const valueEl=parent.querySelector('.rating-value');
    const bubble=document.createElement('span');
 
    parent.style.position='relative';
    const bubble=document.createElement('div');
 
    bubble.className='rating-bubble';
    parent.appendChild(bubble);
    const update=()=>{
      const min=parseFloat(slider.min||'0');
      const max=parseFloat(slider.max||'100');
      const val=parseFloat(slider.value);
      const percent=(val-min)/(max-min);
 
      if(valueEl) valueEl.textContent=val.toFixed(1);
      bubble.textContent=val.toFixed(1);
      bubble.style.left=`calc(${percent*100}% - 0.5rem)`;
   
      bubble.textContent=val.toFixed(1);
      bubble.style.left=`calc(${percent*100}% )`;
 
      const color=colorAt(val);
      slider.style.setProperty('--slider-color',color);
      slider.style.background=`linear-gradient(to right, ${color} 0%, ${color} ${percent*100}%, #ddd ${percent*100}%, #ddd 100%)`;
    };

    const stop=()=>{
      bubble.classList.add('hidden');
      document.body.classList.remove('no-scroll');
    };
    slider.addEventListener('input',update);
    slider.addEventListener('pointerdown',()=>{bubble.classList.remove('hidden');document.body.classList.add('no-scroll');update();});
    slider.addEventListener('pointerup',stop);
    slider.addEventListener('pointercancel',stop);
    slider.addEventListener('change',stop);

    slider.addEventListener('input',update);

    update();
  }
  document.addEventListener('DOMContentLoaded',()=>{
    document.querySelectorAll('.rating-slider').forEach(setupSlider);
  });
})();
