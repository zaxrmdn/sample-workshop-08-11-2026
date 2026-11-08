import { cp, mkdir, rm, access, writeFile } from 'node:fs/promises';

const sourceFiles = ['index.html', 'style.css', 'script.js'];

for (const file of sourceFiles) {
  try {
    await access(file);
  } catch {
    console.error(`Required source file not found: ${file}`);
    process.exit(1);
  }
}

await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });

for (const file of sourceFiles) {
  await cp(file, `dist/${file}`);
}

await writeFile('dist/.nojekyll', '');
try {
  await cp('assets', 'dist/assets', { recursive: true });
} catch {
  // Assets directory is optional.
}

console.log('Build completed: website copied to dist/');
