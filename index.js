/* Extracted page-specific JavaScript for index.html. */

/* =======================================================
           DATA SISWA
        ======================================================= */

        

      
/* PRELOAD FOTO PROFIL SISWA SECARA BERTAHAP */
const studentPhotoCache = new Map();
const studentPhotoQueue = [];
let isPreloadingStudentPhotos = false;

function preloadStudentPhoto(src) {
    if (!src || studentPhotoCache.has(src)) return;

    // Hindari foto yang sama masuk antrean berulang
    if (studentPhotoQueue.includes(src)) return;

    studentPhotoQueue.push(src);
    processStudentPhotoQueue();
}

function processStudentPhotoQueue() {
    if (isPreloadingStudentPhotos) return;

    const src = studentPhotoQueue.shift();
    if (!src) return;

    isPreloadingStudentPhotos = true;

    const img = new Image();

    img.onload = () => {
        studentPhotoCache.set(src, img);
        isPreloadingStudentPhotos = false;
        processStudentPhotoQueue();
    };

    img.onerror = () => {
        isPreloadingStudentPhotos = false;
        processStudentPhotoQueue();
    };

    img.src = src;
}

// Mulai memuat foto secara bertahap
// ketika browser sudah selesai memproses halaman
window.addEventListener("load", () => {
    studentsData.forEach(student => {
        if (student.img) {
            preloadStudentPhoto(student.img);
        }
    });
});


              /* =======================================================
           MODAL
        ======================================================= */

        const modalOverlay =
            document.getElementById("studentModal");

        const modalImg =
            document.getElementById("modalImg");

        const modalName =
            document.getElementById("modalName");

        const modalStatus =
            document.getElementById("modalStatus");

        const modalBirth =
            document.getElementById("modalBirth");

        const modalGoal =
            document.getElementById("modalGoal");

        const modalMotivation =
            document.getElementById("modalMotivation");

        const modalCloseBtn =
            document.getElementById("modalCloseBtn");

        let lastFocusedButton = null;

const studentImageCache = new Map();

function preloadStudentImage(src) {
    if (!src || studentImageCache.has(src)) return;

    const img = new Image();

    img.onload = () => {
        studentImageCache.set(src, img);
    };

    img.src = src;
}
      
        function openStudentModal(index, button) {

            if (
                !Number.isInteger(index) ||
                !studentsData[index]
            ) {
                return;
            }

            const student =
                studentsData[index];

            lastFocusedButton = button || null;

            modalName.textContent =
                student.name;

            modalStatus.textContent =
                student.status;

            modalBirth.textContent =
                student.birth;

            modalGoal.textContent =
                student.goal;

            modalMotivation.textContent =
                `"${student.motivation}"`;

            modalImg.alt =
                `Foto ${student.name}`;

            
const cachedPhoto = studentPhotoCache.get(student.img);

if (cachedPhoto) {
    modalImg.src = cachedPhoto.src;
} else {
    modalImg.src = student.img;
    preloadStudentPhoto(student.img);
}


            modalOverlay.classList.add("active");

            modalOverlay.setAttribute(
                "aria-hidden",
                "false"
            );

            document.body.classList.add(
                "modal-open"
            );

            requestAnimationFrame(() => {
                modalCloseBtn.focus();
            });
          }


        function closeModal() {

            modalOverlay.classList.remove(
                "active"
            );

            modalOverlay.setAttribute(
                "aria-hidden",
                "true"
            );

            document.body.classList.remove(
                "modal-open"
            );

            if (lastFocusedButton) {
                lastFocusedButton.focus();
            }

            lastFocusedButton = null;
        }


        document
            .querySelectorAll(".detail-btn")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        const index =
                            Number(
                                button.dataset.studentIndex
                            );

                        openStudentModal(
                            index,
                            button
                        );
                    }
                );

            });


        modalCloseBtn.addEventListener(
            "click",
            closeModal
        );


        modalOverlay.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    modalOverlay
                ) {
                    closeModal();
                }

            }
        );


        document.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Escape" &&
                    modalOverlay.classList.contains(
                        "active"
                    )
                ) {
                    closeModal();
                }

            }
        );

      /* =======================================================
           SCROLL TOP
        ======================================================= */

        
const scrollTopBtn =
    document.getElementById("scrollTopBtn");

let scrollScheduled = false;

function updateScrollButton() {
    scrollTopBtn.classList.toggle(
        "show",
        window.scrollY > 300
    );
}

function handleScroll() {
    if (scrollScheduled) return;

    scrollScheduled = true;

    requestAnimationFrame(() => {
        updateScrollButton();
        scrollScheduled = false;
    });
}

window.addEventListener(
    "scroll",
    handleScroll,
    { passive: true }
);



        scrollTopBtn.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );


        /* =======================================================
           ACTIVE NAVIGATION
        ======================================================= */

        const navLinks =
            document.querySelectorAll(
                ".nav-pill"
            );

        const sections =
            document.querySelectorAll(
                "#tentang, #profil, #album, #pengaduan"
            );


        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            const id =
                                entry.target.id;

                            navLinks.forEach(link => {

                                link.classList.toggle(
                                    "active",
                                    link.getAttribute(
                                        "href"
                                    ) === `#${id}`
                                );

                            });

                        }

                    });

                },
                {
                    rootMargin:
                        "-30% 0px -60% 0px"
                }
            );


        sections.forEach(section => {

            observer.observe(section);

        });

      /* =======================================================
           AUDIO PLAYER
        ======================================================= */

        (function () {

            const audio =
                document.getElementById(
                    "bgMusic"
                );

            if (!audio) {
                return;
            }


            const savedTime =
                localStorage.getItem(
                    "musicCurrentTime"
                );

            const isPlaying =
                localStorage.getItem(
                    "musicIsPlaying"
                );


            if (
                savedTime !== null
            ) {

                const time =
                    parseFloat(
                        savedTime
                    );

                if (
                    Number.isFinite(time)
                ) {

                    audio.addEventListener(
                        "loadedmetadata",
                        () => {

                            if (
                                time <
                                audio.duration
                            ) {
                                audio.currentTime =
                                    time;
                            }

                        },
                        { once: true }
                    );

                }

            }


            function saveAudioState() {

                try {

                    localStorage.setItem(
                        "musicCurrentTime",
                        String(
                            audio.currentTime
                        )
                    );

                    localStorage.setItem(
                        "musicIsPlaying",
                        audio.paused
                            ? "false"
                            : "true"
                    );

                } catch (error) {

                    // Abaikan jika localStorage tidak tersedia.

                }

            }


            audio.addEventListener(
                "play",
                () => {

                    localStorage.setItem(
                        "musicIsPlaying",
                        "true"
                    );

                }
            );


            audio.addEventListener(
                "pause",
                () => {

                    localStorage.setItem(
                        "musicIsPlaying",
                        "false"
                    );

                }
            );


            audio.addEventListener(
                "timeupdate",
                saveAudioState
            );


            window.addEventListener(
                "pagehide",
                saveAudioState
            );


            if (
                isPlaying === "true"
            ) {

                audio.play().catch(() => {

                    const resumeAudio =
                        () => {

                            if (
                                localStorage.getItem(
                                    "musicIsPlaying"
                                ) === "true"
                            ) {

                                audio.play()
                                    .catch(
                                        () => {}
                                    );

                            }

                            document.removeEventListener(
                                "click",
                                resumeAudio
                            );

                        };

                    document.addEventListener(
                        "click",
                        resumeAudio,
                        {
                            once: true
                        }
                    );

                });

            }

        })();

      /* =======================================================
           QUOTE SYSTEM
        ======================================================= */

        (function () {

            const listQuotes = [

                {
                    text:
                        "Masa sekolah memang akan berakhir, tetapi ikatan dan kenangan di dalamnya akan bertahan selamanya.",
                    author:
                        "— Kebersamaan XII IPS-1"
                },

                {
                    text:
                        "Kisah terbaik tidak ditulis di dalam buku pelajaran, melainkan di setiap tawa yang kita bagi di kelas ini.",
                    author:
                        "— Jejak XII IPS-1"
                },

                {
                    text:
                        "Jangan takut melangkah ke depan. Masa depan milik mereka yang berani bermimpi dan saling mendukung.",
                    author:
                        "— Motivasi XII IPS-1"
                },

                {
                    text:
                        "Suatu hari nanti, ruang kelas ini hanya akan berisi ingatan, tapi semangat kita akan terus menyala.",
                    author:
                        "— Kenangan XII IPS-1"
                },

                {
                    text:
                        "Kita melangkah dari sudut yang berbeda, berjuang di kelas yang sama, dan menuju masa depan yang gemilang.",
                    author:
                        "— Perjuangan XII IPS-1"
                },

                {
                    text:
                        "Bukan tentang seberapa cepat kita sampai di puncak, melainkan tentang siapa yang bertahan berjuang bersama.",
                    author:
                        "— Semangat XII IPS-1"
                },

              {
                    text:
                        "Setiap hari di sekolah adalah satu baris kalimat dalam buku kenangan indah yang takkan pernah pudar.",
                    author:
                        "— Catatan XII IPS-1"
                },

                {
                    text:
                        "Nikmati setiap detik kebersamaan, karena hal sederhana hari ini adalah hal yang paling dirindukan besok.",
                    author:
                        "— Momen XII IPS-1"
                },

                {
                    text:
                        "Pendidikan memberi kita pengetahuan, tetapi kebersamaan di kelas ini memberi kita arti kekeluargaan.",
                    author:
                        "— Keluarga XII IPS-1"
                },

                {
                    text:
                        "Jadikan setiap rintangan sebagai batu pijakan, dan jadikan teman sekelas sebagai pendorong keberhasilan.",
                    author:
                        "— Impian XII IPS-1"
                }

            ];


            let activeIdx = -1;
            let timerId = null;


            function renderQuote() {

                const elText =
                    document.getElementById(
                        "quoteText"
                    );

                const elAuthor =
                    document.getElementById(
                        "quoteAuthor"
                    );

                if (
                    !elText ||
                    !elAuthor
                ) {
                    return;
                }


                let newIdx;


                do {

                    newIdx =
                        Math.floor(
                            Math.random() *
                            listQuotes.length
                        );

                } while (
                    newIdx === activeIdx &&
                    listQuotes.length > 1
                );


                activeIdx =
                    newIdx;


                elText.style.opacity = "0";
                elAuthor.style.opacity = "0";


                setTimeout(() => {

                    elText.textContent =
                        `"${listQuotes[newIdx].text}"`;

                    elAuthor.textContent =
                        listQuotes[newIdx].author;

                    elText.style.opacity = "1";
                    elAuthor.style.opacity = "1";

                }, 300);

            }

          function startTimer() {

                if (timerId) {

                    clearInterval(
                        timerId
                    );

                }

                timerId =
                    setInterval(
                        renderQuote,
                        10000
                    );

            }


            renderQuote();
            startTimer();


            const quoteBox =
                document.getElementById(
                    "quoteBox"
                );


            if (quoteBox) {

                quoteBox.addEventListener(
                    "click",
                    () => {

                        renderQuote();
                        startTimer();

                    }
                );

            }

        })();

      /* =======================================================
           INITIALIZATION
        ======================================================= */

        updateScrollButton();

(() => {
    const splash = document.getElementById("classSplash");

    if (!splash) return;

    function hideSplash() {
      setTimeout(() => {
        splash.classList.add("splash-hidden");

        setTimeout(() => {
          splash.remove();
        }, 800);
      }, 1500);
    }

    if (document.readyState === "complete") {
      hideSplash();
    } else {
      window.addEventListener("load", hideSplash, { once: true });
    }
  })();

/* =========================================================
   V2 PREMIUM ENHANCEMENTS — no external dependency
========================================================= */
(() => {
  'use strict';

  // Reading progress
  const progress = document.createElement('div');
  progress.id = 'readingProgress';
  progress.setAttribute('aria-hidden', 'true');
  document.body.prepend(progress);

  const updateProgress = () => {
    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);
  updateProgress();

  // Class statistics
  const hero = document.querySelector('.hero-photo-section');
  if (hero) {
    const stats = document.createElement('div');
    stats.className = 'class-stats';
    stats.innerHTML = `
      <div class="stat-card"><span class="stat-number" id="studentCountStat">29</span><span class="stat-label">Siswa</span></div>
      <div class="stat-card"><span class="stat-number">1</span><span class="stat-label">Kelas</span></div>
      <div class="stat-card"><span class="stat-number">∞</span><span class="stat-label">Kenangan</span></div>
    `;
    hero.insertAdjacentElement('afterend', stats);
  }

  // Search and count for student list
  const list = document.querySelector('.students-list-container');
  const profileSection = document.getElementById('profil');
  if (list && profileSection) {
    const items = [...list.querySelectorAll('.student-list-item')];
    const header = profileSection.querySelector('.section-header');
    if (header) {
      const tools = document.createElement('div');
      tools.className = 'student-tools';
      tools.innerHTML = `
        <div class="student-search-wrap">
          <i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
          <input id="studentSearch" type="search" autocomplete="off"
                 placeholder="Cari nama siswa..." aria-label="Cari nama siswa">
        </div>
        <span class="student-result-count" id="studentResultCount">${items.length} siswa</span>
      `;
      header.insertAdjacentElement('afterend', tools);
    }

    const empty = document.createElement('div');
    empty.className = 'student-empty';
    empty.id = 'studentEmpty';
    empty.innerHTML = '<i class="fa-regular fa-face-frown" aria-hidden="true"></i><br>Tidak ada nama yang cocok.';
    list.appendChild(empty);

    const search = document.getElementById('studentSearch');
    const count = document.getElementById('studentResultCount');
    const emptyState = document.getElementById('studentEmpty');

    const filterStudents = () => {
      const query = search.value.trim().toLowerCase();
      let visible = 0;
      items.forEach(item => {
        const name = item.querySelector('.student-name')?.textContent.toLowerCase() || '';
        const match = !query || name.includes(query);
        item.classList.toggle('search-hidden', !match);
        if (match) visible++;
      });
      count.textContent = `${visible} dari ${items.length} siswa`;
      emptyState.style.display = visible ? 'none' : 'block';
    };
    search.addEventListener('input', filterStudents);

    const stat = document.getElementById('studentCountStat');
    if (stat) stat.textContent = items.length;
  }

  // Add a share button to the footer without changing existing content.
  const copyright = document.querySelector('.copyright');
  if (copyright && !document.getElementById('shareSiteBtn')) {
    const wrap = document.createElement('div');
    wrap.className = 'share-site-wrap';
    wrap.innerHTML = `<button type="button" class="share-site-btn" id="shareSiteBtn"><i class="fa-solid fa-share-nodes" aria-hidden="true"></i> Bagikan</button>`;
    copyright.parentNode.insertBefore(wrap, copyright);

    document.getElementById('shareSiteBtn').addEventListener('click', async () => {
      const shareData = {
        title: document.title,
        text: 'Lensa Kebersamaan XII IPS-1 MAN 1 Bangka',
        url: window.location.href
      };
      try {
        if (navigator.share) {
          await navigator.share(shareData);
        } else if (navigator.clipboard) {
          await navigator.clipboard.writeText(window.location.href);
          const btn = document.getElementById('shareSiteBtn');
          const old = btn.innerHTML;
          btn.innerHTML = '<i class="fa-solid fa-check"></i> Link disalin';
          setTimeout(() => { btn.innerHTML = old; }, 1800);
        }
      } catch (_) { /* dibatalkan pengguna */ }
    });
  }

  // Reveal sections/cards as they enter the viewport.
  const revealTargets = document.querySelectorAll('.section-space, .class-banner, .class-stats, .hero-photo-section');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion && 'IntersectionObserver' in window) {
    revealTargets.forEach(el => el.classList.add('reveal-on-scroll'));
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    revealTargets.forEach(el => observer.observe(el));
  }

  // Gambar: gunakan fallback hanya jika gambar utama gagal dimuat.
  document.querySelectorAll('img[data-fallback]').forEach(img => {
    img.addEventListener('error', function handleImageError() {
      const fallback = img.getAttribute('data-fallback');
      const alreadyFallback = img.getAttribute('data-fallback-used') === '1';
      if (!fallback || alreadyFallback) {
        img.classList.add('image-load-error');
        return;
      }
      img.setAttribute('data-fallback-used', '1');
      img.src = fallback;
    });
  });

  // Escape closes the existing student modal.
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    const modal = document.getElementById('studentModal');
    if (modal?.classList.contains('active')) {
      document.getElementById('modalCloseBtn')?.click();
    }
  });
})();

if("serviceWorker" in navigator){window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));}
