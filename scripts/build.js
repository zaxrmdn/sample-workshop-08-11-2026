import {
  existsSync,
  mkdirSync,
  rmSync,
  cpSync,
  writeFileSync,
} from 'node:fs';

const sourceFiles = [
  'index.html',
  'style.css',
  'script.js',
];

console.log('Starting production build...');

// Pastikan source website tersedia
for (const file of sourceFiles) {
  if (!existsSync(file)) {
    throw new Error(`Required source file not found: ${file}`);
  }
}

// Bersihkan hasil build sebelumnya
rmSync('dist', { recursive: true, force: true });

// Buat direktori output
mkdirSync('dist', { recursive: true });

// Salin source website
for (const file of sourceFiles) {
  cpSync(file, `dist/${file}`);
  console.log(`Copied: ${file}`);
}

// Salin assets jika tersedia
if (existsSync('assets')) {
  cpSync('assets', 'dist/assets', { recursive: true });
  console.log('Copied: assets/');
}

// GitHub Pages helper
writeFileSync('dist/.nojekyll', '');

console.log('Build completed successfully!');
