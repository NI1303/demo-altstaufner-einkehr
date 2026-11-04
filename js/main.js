/* Altstaufner Einkehr – seitenspezifisch: Speisekarten-Reiter, Ruhetag-Prüfung, Rubriken auf großen Bildschirmen offen */
(() => {
  const tabs = [...document.querySelectorAll('[role="tab"]')];
  const select = t => {
    tabs.forEach(x => { const on = x === t; x.setAttribute('aria-selected', on); x.tabIndex = on ? 0 : -1; document.getElementById(x.getAttribute('aria-controls')).hidden = !on; });
  };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => select(t));
    t.addEventListener('keydown', e => {
      const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (d) { const n = tabs[(i + d + tabs.length) % tabs.length]; n.focus(); select(n); }
    });
  });
  const form = document.getElementById('res-form');
  if (form) form.demoCheck = () => {
    const v = form.datum.value; if (!v) return '';
    const d = new Date(v + 'T12:00:00').getDay();
    return (d === 0 || d === 1) ? 'Sonntag und Montag ist Ruhetag – bitte wählen Sie einen Tag von Dienstag bis Samstag.' : '';
  };
  const mq = matchMedia('(min-width: 900px)');
  const sync = () => document.querySelectorAll('.panel.cols .mgroup').forEach((d, i) => { d.open = mq.matches || i === 0; });
  sync(); mq.addEventListener && mq.addEventListener('change', sync);
})();

/* Bildstrecke: mit der Maus ziehen */
(function(){
  var t=document.querySelector('[data-drag]'); if(!t) return;
  var down=false,sx=0,sl=0,moved=0;
  t.addEventListener('pointerdown',function(e){ if(e.pointerType!=='mouse') return; down=true;moved=0;sx=e.clientX;sl=t.scrollLeft; });
  window.addEventListener('pointermove',function(e){ if(!down) return; var dx=e.clientX-sx; moved=Math.max(moved,Math.abs(dx)); if(moved>5) t.classList.add('dragging'); t.scrollLeft=sl-dx; });
  window.addEventListener('pointerup',function(){ if(!down) return; down=false; setTimeout(function(){t.classList.remove('dragging');},0); });
  t.addEventListener('click',function(e){ if(moved>5){ e.preventDefault(); e.stopPropagation(); } },true);
  t.addEventListener('keydown',function(e){ if(e.key==='ArrowRight'){t.scrollBy({left:300,behavior:'smooth'});} if(e.key==='ArrowLeft'){t.scrollBy({left:-300,behavior:'smooth'});} });
})();
