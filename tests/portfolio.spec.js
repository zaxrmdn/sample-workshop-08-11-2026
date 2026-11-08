import { test, expect } from '@playwright/test';

test.describe('Portfolio Website Template', () => {
  test('homepage dapat dibuka', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Portfolio Profesional/);
  });

  test('menampilkan placeholder nama peserta', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: /NAMA.*LENGKAP/ }).first()).toBeVisible();
  });

  test('menampilkan bagian Tentang Saya', async ({ page }) => {
    await page.goto('/#about');
    await expect(page.locator('#about .section-label')).toContainText('TENTANG SAYA');
  });

  test('navigasi projects tersedia', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('link', { name: 'Proyek', exact: true })).toBeVisible();
  });

  test('bagian kontak memiliki email link', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('a[href^="mailto:"]')).toHaveCount(1);
  });
});
