# XR Teardown Scrollytelling

Starter repo untuk scrollytelling infografis teardown perangkat/aplikasi XR (Extended Reality) yang rilis dalam 3 tahun terakhir.

## Struktur

```
xr-teardown-scrollytelling/
├── index.html              # markup & konten tiap section
├── css/
│   └── style.css           # semua styling & layout
├── js/
│   └── main.js              # progress bar, sticky-step observer, counter animation
├── assets/
│   ├── images/               # taruh foto/render device di sini
│   └── data/
│       └── specs.json        # opsional — data device kalau ingin dipisah dari HTML
└── README.md
```

## Cara pakai

1. Buka `index.html` dan ganti semua teks dalam tanda kurung siku `[...]` dengan riset dan opini Anda.
2. Empat section wajib sudah disiapkan di `index.html` (cari `data-step="1"` sampai `"4"`): Device class, Input modality, Artificial intelligence, Impact — masing-masing punya slot `step-data` (fakta) dan `step-opinion` (pendapat pribadi Anda).
3. Ganti SVG placeholder di `#visualStage` dengan foto/ilustrasi device asli — taruh file gambar di `assets/images/`, lalu ganti tag `<svg>` terkait dengan `<img>`.
4. Buka `index.html` langsung di browser (double click) untuk preview — tidak perlu server atau build tool.
5. Kalau ingin isi statistik counter di section "context", ubah `data-target="0"` ke angka yang Anda mau dan isi `stat-label`.

## Efek yang sudah jalan

- Progress bar scroll di bagian atas
- Sticky visual di sisi kanan yang berganti sesuai section aktif (fade)
- Fade-in/opacity pada tiap step teks saat aktif
- Counter animation untuk angka statistik

## Kustomisasi

- Warna & font diatur lewat CSS variable di bagian atas `css/style.css` (`:root`) — tinggal ubah nilainya untuk ganti tema.
- Struktur di sini sengaja tanpa library eksternal (vanilla JS + Intersection Observer). Kalau ingin efek lebih kompleks, bisa tambahkan GSAP/ScrollTrigger via CDN di `index.html`.
