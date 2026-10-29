(() => {
  'use strict';

  const revealOnScroll = () => {
    const reveals = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;
    reveals.forEach((element, index) => {
      if (element.getBoundingClientRect().top < windowHeight - 80) {
        window.setTimeout(() => element.classList.add('active'), index * 80);
      }
    });
  };

  const scrollTopBtn = document.getElementById('scrollTopBtn');
  const updateScrollTop = () => {
    if (!scrollTopBtn) return;
    scrollTopBtn.classList.toggle('show', window.scrollY > 300);
  };

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  window.addEventListener('scroll', revealOnScroll, { passive: true });
  window.addEventListener('scroll', updateScrollTop, { passive: true });
  window.addEventListener('load', () => {
    revealOnScroll();
    updateScrollTop();
  });

  // Musik tetap tersinkron antarhalaman.
  const audio = document.getElementById('bgMusic');
  if (audio) {
    const savedTime = localStorage.getItem('musicCurrentTime');
    const wasPlaying = localStorage.getItem('musicIsPlaying') === 'true';

    if (savedTime !== null) {
      const time = Number.parseFloat(savedTime);
      if (Number.isFinite(time)) {
        try { audio.currentTime = time; } catch (_) {}
      }
    }

    const saveState = () => {
      try {
        localStorage.setItem('musicCurrentTime', String(audio.currentTime));
        localStorage.setItem('musicIsPlaying', String(!audio.paused));
      } catch (_) {}
    };

    audio.addEventListener('timeupdate', saveState);
    audio.addEventListener('play', saveState);
    audio.addEventListener('pause', saveState);
    window.addEventListener('pagehide', saveState);

    if (wasPlaying) {
      audio.play().catch(() => {
        const resume = () => {
          if (localStorage.getItem('musicIsPlaying') === 'true') {
            audio.play().catch(() => {});
          }
          document.removeEventListener('pointerdown', resume);
        };
        document.addEventListener('pointerdown', resume, { once: true });
      });
    }
  }

  // Pencarian/filter dokumentasi berdasarkan judul dan deskripsi.
  const photoList = document.querySelector('.photo-list');
  const existingItems = [...document.querySelectorAll('.photo-item')];
  if (photoList && existingItems.length) {
    const tools = document.createElement('div');
    tools.className = 'gallery-tools';
    tools.innerHTML = `
      <div class="gallery-search-wrap">
        <i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
        <input id="gallerySearch" type="search" autocomplete="off" placeholder="Cari dokumentasi..." aria-label="Cari dokumentasi">
      </div>
      <span class="gallery-result-count" id="galleryResultCount"></span>`;
    photoList.insertBefore(tools, photoList.firstChild);
    const empty = document.createElement('div');
    empty.className='gallery-empty'; empty.id='galleryEmpty';
    empty.innerHTML='<i class="fa-regular fa-face-frown" aria-hidden="true"></i><br>Tidak ada dokumentasi yang cocok.';
    photoList.appendChild(empty);
    const search=document.getElementById('gallerySearch');
    const result=document.getElementById('galleryResultCount');
    const emptyState=document.getElementById('galleryEmpty');
    const filter=()=>{
      const q=search.value.trim().toLowerCase(); let visible=0;
      existingItems.forEach(item=>{
        const text=item.textContent.toLowerCase(); const match=!q||text.includes(q);
        item.style.display=match?'':'none'; if(match) visible++;
      });
      result.textContent=`${visible} dari ${existingItems.length} dokumentasi`;
      emptyState.style.display=visible?'none':'block';
    };
    search.addEventListener('input',filter); filter();
  }

  // Lightbox album.
  const items = [...document.querySelectorAll('.photo-item')];
  const photos = items.map((item, index) => {
    const img = item.querySelector('img');
    const heading = item.querySelector('h3');
    return img ? {
      item,
      img,
      title: heading?.textContent?.trim() || `Foto ${index + 1}`
    } : null;
  }).filter(Boolean);

  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lbImage');
  const caption = document.getElementById('lbCaption');
  const counter = document.getElementById('albumCounter');
  const closeButton = document.getElementById('lbClose');
  const previousButton = document.getElementById('lbPrev');
  const nextButton = document.getElementById('lbNext');
  const progress = document.getElementById('albumProgress');

  let current = 0;
  let touchStartX = 0;

  if (counter) {
    counter.textContent = `${photos.length} dokumentasi • Ketuk foto untuk memperbesar`;
  }

  const showPhoto = (index) => {
    if (!lightbox || !lightboxImage || !caption || photos.length === 0) return;
    current = (index + photos.length) % photos.length;
    const photo = photos[current];
    lightboxImage.src = photo.img.currentSrc || photo.img.src;
    lightboxImage.alt = photo.img.alt || photo.title;
    caption.textContent = `${current + 1} / ${photos.length} — ${photo.title}`;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
    closeButton?.focus();
  };

  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  };

  photos.forEach((photo, index) => {
    photo.img.addEventListener('click', () => showPhoto(index));
    photo.img.addEventListener('error', () => photo.item.classList.add('image-broken'));
  });

  closeButton?.addEventListener('click', closeLightbox);
  previousButton?.addEventListener('click', () => showPhoto(current - 1));
  nextButton?.addEventListener('click', () => showPhoto(current + 1));

  lightbox?.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  lightbox?.addEventListener('touchstart', (event) => {
    touchStartX = event.changedTouches[0]?.clientX || 0;
  }, { passive: true });

  lightbox?.addEventListener('touchend', (event) => {
    const endX = event.changedTouches[0]?.clientX || 0;
    const delta = endX - touchStartX;
    if (Math.abs(delta) < 50) return;
    if (delta > 0) showPhoto(current - 1);
    else showPhoto(current + 1);
  }, { passive: true });

  document.addEventListener('keydown', (event) => {
    if (!lightbox?.classList.contains('open')) return;
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowLeft') showPhoto(current - 1);
    if (event.key === 'ArrowRight') showPhoto(current + 1);
  });

  const updateProgress = () => {
    if (!progress) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);
  updateProgress();
})();
