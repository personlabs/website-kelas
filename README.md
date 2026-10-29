# Website Kelas XII IPS-1 MAN 1 Bangka

## Yang diperbaiki
- Struktur HTML, CSS, dan JavaScript dipisah.
- UI tetap mempertahankan desain asli, tetapi diberi polish responsive/mobile.
- Menu navigasi mobile (hamburger) pada HP.
- Mode gelap/terang dengan penyimpanan pilihan di browser.
- Toast notification ringan untuk feedback.
- Pencarian anggota kelas.
- Pencarian/filter dokumentasi pada setiap halaman album.
- Lightbox foto dengan next/previous, keyboard, dan swipe.
- Lazy loading dan fallback gambar yang sudah ada.
- Scroll-to-top, progress bar album, dan animasi yang menghormati prefers-reduced-motion.
- Form pengaduan tetap menggunakan Formspree yang ada pada file asli.
- Tidak menambahkan Service Worker baru agar tidak mengulang masalah cache.

## Struktur
```text
website-kelas-final-teliti/
├── index.html
├── kegiatan.html
├── classmeeting.html
├── hari-batik.html
├── bukber.html
├── keseharian.html
├── pengaduan.html
├── 404.html
├── MEDIA-YANG-DIBUTUHKAN.txt
├── assets/
│   ├── css/
│   │   ├── index.css
│   │   ├── gallery.css
│   │   ├── pengaduan.css
│   │   ├── 404.css
│   │   └── site-ui.css
│   └── js/
│       ├── index.js
│       ├── gallery.js
│       ├── pengaduan.js
│       ├── site-ui.js
│       ├── cleanup-sw.js
│       └── analytics.js
└── README.md
```

## Media asli
ZIP ini berasal dari `pp.zip`, yang hanya berisi halaman HTML. Foto siswa, foto album, `keluarga-besar.jpg`, ikon, dan `upayy.mp3` tidak tersedia di ZIP sumber ini. Jika file-file tersebut sudah ada di repository GitHub lama, pertahankan dan jangan hapus.

## Upload ke GitHub Pages
Upload **isi folder ini**, bukan file ZIP. `index.html` harus berada langsung di root repository. Pertahankan semua folder `assets/` beserta isinya. Pertahankan juga semua media lama di root repository.
