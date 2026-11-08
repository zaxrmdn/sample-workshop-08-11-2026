# Portfolio Website Template — Workshop CI/CD

Template website portfolio profesional untuk peserta workshop. Template ini **tidak berisi identitas atau riwayat karier milik orang tertentu**. Ganti semua teks di dalam tanda kurung siku (`[...]`) dengan informasi masing-masing peserta.

## Isi project
- `index.html`, `style.css`, `script.js`: website portfolio responsif.
- `scripts/build.js`: menyiapkan folder `dist`.
- `tests/portfolio.spec.js`: pengujian browser dengan Playwright.
- `.github/workflows/ci-cd.yml`: pipeline lint → test → security scan → build → deploy GitHub Pages.
- `PANDUAN-PENGISIAN.md`: panduan mengisi konten portfolio.

## Mulai
1. Extract ZIP ini.
2. Upload **isi folder** ke root repository GitHub.
3. Pastikan branch utama bernama `main` atau sesuaikan workflow.
4. Buka **Settings → Pages → Build and deployment → Source**, pilih **GitHub Actions**.
5. Jalankan secara lokal atau push ke GitHub untuk menjalankan workflow.

## Menjalankan secara lokal
Gunakan Node.js 22 atau versi LTS yang kompatibel.
```bash
npm install
npm run lint
npm run build
npx playwright install chromium
npm test
```

## Mengisi template
Buka `PANDUAN-PENGISIAN.md`, lalu edit `index.html`. Cari teks dalam tanda `[...]` dan ganti dengan informasi peserta. Hapus bagian yang tidak relevan, termasuk statistik atau proyek yang belum dimiliki. Jangan menampilkan data pribadi atau informasi perusahaan yang bersifat rahasia.

## Catatan CI/CD
- `npm install` digunakan agar peserta dapat memulai tanpa `package-lock.json`. Untuk praktik produksi, commit `package-lock.json` lalu gunakan `npm ci`.
- Trivy memindai repository dan dapat menggagalkan pipeline bila menemukan temuan HIGH/CRITICAL, sesuai konfigurasi security gate.
- GitHub Pages harus menggunakan source **GitHub Actions**.
- Website memakai Google Fonts dari CDN; fallback font tetap tersedia jika CDN tidak dapat diakses.
