
(() => {
  'use strict';
  const root = document.documentElement;
  const stored = localStorage.getItem('siteTheme');
  const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  root.dataset.theme = stored || (prefersLight ? 'light' : 'dark');

  const toast = document.createElement('div');
  toast.className = 'ui-toast';
  toast.setAttribute('role','status');
  toast.setAttribute('aria-live','polite');
  document.body.appendChild(toast);
  let toastTimer;
  window.siteToast = (message, icon='fa-circle-check') => {
    toast.innerHTML = `<i class="fa-solid ${icon}" aria-hidden="true"></i><span></span>`;
    toast.querySelector('span').textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
  };

  const makeButton = (cls, label, icon, title) => {
    const b = document.createElement('button');
    b.type='button'; b.className=`ui-icon-btn ${cls}`; b.setAttribute('aria-label',label); b.title=title||label;
    b.innerHTML=`<i class="fa-solid ${icon}" aria-hidden="true"></i>`;
    return b;
  };
  const updateThemeButton = b => {
    const light = root.dataset.theme === 'light';
    b.innerHTML = `<i class="fa-solid ${light?'fa-moon':'fa-sun'}" aria-hidden="true"></i>`;
    b.setAttribute('aria-label', light ? 'Aktifkan mode gelap' : 'Aktifkan mode terang');
    b.title = light ? 'Mode gelap' : 'Mode terang';
  };
  const toggleTheme = b => {
    root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('siteTheme', root.dataset.theme);
    updateThemeButton(b);
    window.siteToast(root.dataset.theme === 'light' ? 'Mode terang aktif' : 'Mode gelap aktif', 'fa-circle-half-stroke');
  };

  const addControls = (host, mobileMenuTarget) => {
    if (!host || host.querySelector('.ui-nav-controls')) return;
    const controls=document.createElement('div'); controls.className='ui-nav-controls';
    const theme=makeButton('ui-theme-btn','Aktifkan mode terang','fa-sun','Mode terang');
    updateThemeButton(theme); theme.addEventListener('click',()=>toggleTheme(theme));
    controls.appendChild(theme);
    if (mobileMenuTarget) {
      const menu=makeButton('ui-menu-btn','Buka menu navigasi','fa-bars','Menu');
      menu.addEventListener('click',()=>{
        const open=mobileMenuTarget.classList.toggle('nav-open');
        menu.innerHTML=`<i class="fa-solid ${open?'fa-xmark':'fa-bars'}" aria-hidden="true"></i>`;
        menu.setAttribute('aria-label',open?'Tutup menu navigasi':'Buka menu navigasi');
      });
      controls.insertBefore(menu, theme);
    }
    host.appendChild(controls);
  };

  const sticky=document.querySelector('.sticky-nav-wrapper');
  if(sticky){
    const nav=sticky.querySelector('.nav-inner');
    addControls(nav, sticky);
  } else {
    const nav=document.createElement('div');
    nav.className='site-top-nav';
    nav.innerHTML=`<a href="index.html" class="site-home-link"><i class="fa-solid fa-house" aria-hidden="true"></i><span>Beranda</span></a><div class="site-album-links"><a href="kegiatan.html">Kegiatan</a><a href="keseharian.html">Keseharian</a><a href="classmeeting.html">Classmeeting</a><a href="hari-batik.html">Hari Batik</a><a href="bukber.html">Bukber</a><a href="pengaduan.html">Saran</a></div>`;
    document.body.prepend(nav);
    const links=nav.querySelector('.site-album-links');
    addControls(nav, null);
    const menu=makeButton('ui-menu-btn','Buka menu navigasi','fa-bars','Menu');
    nav.querySelector('.ui-nav-controls').insertBefore(menu, nav.querySelector('.ui-theme-btn'));
    menu.addEventListener('click',()=>{
      const open=nav.classList.toggle('nav-open');
      links.classList.toggle('open',open);
      menu.innerHTML=`<i class="fa-solid ${open?'fa-xmark':'fa-bars'}" aria-hidden="true"></i>`;
      menu.setAttribute('aria-label',open?'Tutup menu navigasi':'Buka menu navigasi');
    });
  }

  // Close mobile index menu after choosing a section.
  document.querySelectorAll('.quick-nav a').forEach(a=>a.addEventListener('click',()=>sticky?.classList.remove('nav-open')));

  // Highlight the current gallery page.
  const current=location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-album-links a').forEach(a=>{
    if(a.getAttribute('href')===current) a.setAttribute('aria-current','page');
  });
})();
