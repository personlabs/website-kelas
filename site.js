/* ============================================================
   WEBSITE KELAS — GLOBAL JAVASCRIPT v2
   Shared UI: theme, navigation, reveal, gallery search, tools.
   ============================================================ */
(() => {
  'use strict';
  const body=document.body;
  const storageKey='kelas-theme';
  const saved=localStorage.getItem(storageKey);
  if(saved==='light') body.classList.add('light-mode');

  const page=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  const isHome=page==='index.html';

  // Shared navigation on every inner page.
  if(!isHome && !document.querySelector('.global-nav')){
    const nav=document.createElement('nav');
    nav.className='global-nav'; nav.setAttribute('aria-label','Navigasi utama');
    nav.innerHTML=`<div class="global-nav-inner">
      <a class="global-brand" href="index.html"><span class="global-brand-mark"><i class="fa-solid fa-camera"></i></span><span>XII IPS-1</span></a>
      <button class="global-menu" type="button" aria-label="Buka menu" aria-expanded="false"><i class="fa-solid fa-bars"></i></button>
      <div class="global-links">
        <a href="index.html"><i class="fa-solid fa-house"></i> Beranda</a>
        <a href="kegiatan.html"><i class="fa-solid fa-calendar-days"></i> Kegiatan</a>
        <a href="classmeeting.html"><i class="fa-solid fa-trophy"></i> Classmeeting</a>
        <a href="hari-batik.html"><i class="fa-solid fa-shirt"></i> Hari Batik</a>
        <a href="bukber.html"><i class="fa-solid fa-utensils"></i> Bukber</a>
        <a href="keseharian.html"><i class="fa-solid fa-images"></i> Keseharian</a>
        <a href="pengaduan.html"><i class="fa-solid fa-comment-dots"></i> Aspirasi</a>
      </div></div>`;
    document.body.prepend(nav);
    const menu=nav.querySelector('.global-menu'), links=nav.querySelector('.global-links');
    menu.addEventListener('click',()=>{const open=links.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.innerHTML=open?'<i class="fa-solid fa-xmark"></i>':'<i class="fa-solid fa-bars"></i>';});
    nav.querySelectorAll('a[href]').forEach(a=>{if(a.getAttribute('href').toLowerCase()===page)a.setAttribute('aria-current','page');});
  }

  // Theme + back to top.
  const tools=document.createElement('div'); tools.className='site-tools'; tools.setAttribute('aria-label','Alat bantu halaman');
  tools.innerHTML=`<button class="site-tool" id="themeToggle" type="button" title="Ganti tema"><i class="fa-solid fa-moon"></i></button><button class="site-tool" id="topToggle" type="button" title="Kembali ke atas"><i class="fa-solid fa-arrow-up"></i></button>`;
  body.appendChild(tools);
  const theme=tools.querySelector('#themeToggle'), top=tools.querySelector('#topToggle');
  function updateTheme(){const light=body.classList.contains('light-mode');theme.innerHTML=light?'<i class="fa-solid fa-sun"></i>':'<i class="fa-solid fa-moon"></i>';theme.title=light?'Gunakan mode gelap':'Gunakan mode terang';theme.setAttribute('aria-label',theme.title)}
  updateTheme();
  theme.addEventListener('click',()=>{body.classList.toggle('light-mode');localStorage.setItem(storageKey,body.classList.contains('light-mode')?'light':'dark');updateTheme();toast(body.classList.contains('light-mode')?'Mode terang aktif':'Mode gelap aktif')});
  function updateTop(){const show=scrollY>420;top.style.opacity=show?'1':'0';top.style.pointerEvents=show?'auto':'none';}
  top.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'})); window.addEventListener('scroll',updateTop,{passive:true});updateTop();

  // Skip link.
  const main=document.querySelector('main')||document.querySelector('.container');
  if(main&&!document.querySelector('.skip-link')){if(!main.id)main.id='main-content';const a=document.createElement('a');a.className='skip-link';a.href='#'+main.id;a.textContent='Lewati ke konten utama';document.body.prepend(a)}

  // Images.
  document.querySelectorAll('img').forEach(img=>{if(!img.hasAttribute('loading'))img.loading='lazy';img.decoding='async';});

  // Reveal on view (works in addition to existing page scripts).
  const revealTargets=document.querySelectorAll('.section-space,.about-card,.student-list-item,.photo-item,.hero-photo-section,.alert-box,.form-group');
  revealTargets.forEach(el=>el.classList.add('reveal-on-view'));
  if('IntersectionObserver' in window){const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target)}}),{threshold:.08});revealTargets.forEach(e=>io.observe(e));}else revealTargets.forEach(e=>e.classList.add('is-visible'));

  // Gallery search/filter.
  const photoList=document.querySelector('.photo-list');
  if(photoList){
    const items=[...photoList.querySelectorAll('.photo-item')];
    const toolbar=document.createElement('div'); toolbar.className='album-toolbar';
    toolbar.innerHTML=`<input class="album-search" type="search" placeholder="Cari dokumentasi..." aria-label="Cari dokumentasi"><span class="album-result"></span>`;
    photoList.parentNode.insertBefore(toolbar,photoList);
    const empty=document.createElement('div');empty.className='empty-result';empty.textContent='Dokumentasi yang dicari belum ditemukan.';photoList.after(empty);
    const input=toolbar.querySelector('.album-search'), result=toolbar.querySelector('.album-result');
    function filter(){const q=input.value.trim().toLowerCase();let count=0;items.forEach(item=>{const text=item.textContent.toLowerCase();const ok=!q||text.includes(q);item.classList.toggle('is-hidden',!ok);if(ok)count++});result.textContent=`${count} dari ${items.length} dokumentasi`;empty.classList.toggle('show',count===0)}
    input.addEventListener('input',filter);filter();
  }

  // Footer year.
  document.querySelectorAll('.page-footer').forEach(f=>{if(!f.querySelector('.footer-year')){const y=document.createElement('span');y.className='footer-year';y.textContent=' · '+new Date().getFullYear();f.appendChild(y)}});

  function toast(message){let el=document.querySelector('.site-toast');if(!el){el=document.createElement('div');el.className='site-toast';document.body.appendChild(el)}el.textContent=message;el.classList.add('show');clearTimeout(el._t);el._t=setTimeout(()=>el.classList.remove('show'),1800)}
  window.KelasUI={toast};
})();
