/* Extracted page-specific JavaScript for classmeeting.html. */

function revealOnScroll() {
            const reveals = document.querySelectorAll('.reveal');
            const windowHeight = window.innerHeight;
            for (let index = 0; index < reveals.length; index++) {
                const element = reveals[index];
                const elementTop = element.getBoundingClientRect().top;
                if (elementTop < windowHeight - 100) {
                    setTimeout(function () { element.classList.add('active'); }, index * 100);
                }
            }
        }
        window.addEventListener('scroll', revealOnScroll);
        window.addEventListener('load', revealOnScroll);

        // SKRIP LOGIKA SCROLL TO TOP
        const scrollTopBtn = document.getElementById('scrollTopBtn');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });

        if (scrollTopBtn) scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Sinkronisasi Musik
        (function() {
            const audio = document.getElementById('bgMusic');
            if (!audio) return;
            const savedTime = localStorage.getItem('musicCurrentTime');
            const isPlaying = localStorage.getItem('musicIsPlaying');
            if (savedTime !== null) audio.currentTime = parseFloat(savedTime);

            const saveCurrentState = () => {
                localStorage.setItem('musicCurrentTime', audio.currentTime);
                localStorage.setItem('musicIsPlaying', !audio.paused ? 'true' : 'false');
            };

            audio.addEventListener('timeupdate', saveCurrentState);
            window.addEventListener('beforeunload', saveCurrentState);
            window.addEventListener('pagehide', saveCurrentState);
            audio.addEventListener('play', () => localStorage.setItem('musicIsPlaying', 'true'));
            audio.addEventListener('pause', () => localStorage.setItem('musicIsPlaying', 'false'));

            if (isPlaying === 'true') {
                audio.play().catch(() => {
                    const resumeAudio = () => {
                        if (localStorage.getItem('musicIsPlaying') === 'true') audio.play();
                        document.removeEventListener('click', resumeAudio);
                    };
                    document.addEventListener('click', resumeAudio);
                });
            }
        })();

(function () {
  const items = document.querySelectorAll('.photo-item');
  const photos = [];
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const image = item.querySelector('img');
    if (image) {
      const heading = item.querySelector('h3');
      photos.push({
        item: item,
        img: image,
        title: heading ? heading.textContent : 'Foto ' + (i + 1)
      });
    }
  }

  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lbImage');
  const caption = document.getElementById('lbCaption');
  const counter = document.getElementById('albumCounter');
  const closeButton = document.getElementById('lbClose');
  const previousButton = document.getElementById('lbPrev');
  const nextButton = document.getElementById('lbNext');
  let current = 0;

  if (counter) {
    counter.textContent = photos.length + ' dokumentasi • Ketuk foto untuk memperbesar';
  }

  function showPhoto(index) {
    if (!lightbox || !lightboxImage || !caption || photos.length === 0) return;
    current = (index + photos.length) % photos.length;
    const photo = photos[current];
    lightboxImage.src = photo.img.currentSrc || photo.img.src;
    lightboxImage.alt = photo.img.alt || photo.title || ('Foto ' + (current + 1));
    caption.textContent = (current + 1) + ' / ' + photos.length + ' — ' + photo.title;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  for (let i = 0; i < photos.length; i++) {
    const photo = photos[i];
    const photoIndex = i;
    photo.img.addEventListener('click', function () { showPhoto(photoIndex); });
    photo.img.addEventListener('error', function () { photo.item.classList.add('image-broken'); });
  }

  if (closeButton) closeButton.addEventListener('click', closeLightbox);
  if (previousButton) previousButton.addEventListener('click', function () { showPhoto(current - 1); });
  if (nextButton) nextButton.addEventListener('click', function () { showPhoto(current + 1); });

  if (lightbox) {
    lightbox.addEventListener('click', function (event) {
      if (event.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener('keydown', function (event) {
    if (!lightbox || !lightbox.classList.contains('open')) return;
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowLeft') showPhoto(current - 1);
    if (event.key === 'ArrowRight') showPhoto(current + 1);
  });

  const progress = document.getElementById('albumProgress');
  window.addEventListener('scroll', function () {
    if (!progress) return;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (height > 0 ? (window.scrollY / height * 100) : 0) + '%';
  }, { passive: true });
})();
