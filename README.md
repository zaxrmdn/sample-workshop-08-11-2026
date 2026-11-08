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

## Sample Pipeline
```
name: CV Portfolio CI/CD

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read

jobs:
  lint:
    name: 1. Lint
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22
      - name: Install dependencies
        run: npm install
      - name: Run lint
        run: npm run lint

  test:
    name: 2. Test
    runs-on: ubuntu-latest
    needs: lint
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22
      - name: Install dependencies
        run: npm install
      - name: Build website for test
        run: npm run build
      - name: Install Playwright browser
        run: npx playwright install --with-deps chromium
      - name: Run Playwright tests
        run: npm test
      - name: Upload test report on failure
        if: failure()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: |
            playwright-report/
            test-results/
          if-no-files-found: ignore

  security:
    name: 3. Security Scan
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
      - name: Scan repository with Trivy
        uses: aquasecurity/trivy-action@v0.36.0
        with:
          scan-type: fs
          scan-ref: .
          scanners: vuln,misconfig,secret
          severity: HIGH,CRITICAL
          ignore-unfixed: true
          exit-code: '1'

  build:
    name: 4. Build
    runs-on: ubuntu-latest
    needs: [lint, test, security]
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22
      - name: Install dependencies
        run: npm install
      - name: Build website
        run: npm run build
      - name: Upload GitHub Pages artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    name: 5. Deploy
    runs-on: ubuntu-latest
    needs: build
    if: github.event_name != 'pull_request' && github.ref == 'refs/heads/main'
    permissions:
      pages: write
      id-token: write
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```
