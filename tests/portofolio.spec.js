import { test, expect } from '@playwright/test';

test.describe('CV Portfolio Website', () => {
    test('homepage dapat dibuka', async ({ page }) => {
        await page.goto('/');

        await expect(page).toHaveTitle(
            /Zakaria Ramadan/
        );
    });

    test('menampilkan nama pemilik website', async ({ page }) => {
        await page.goto('/');

        await expect(
            page.getByRole('heading', {
                name: 'Zakaria Ramadan',
                level: 1,
            })
        ).toBeVisible();
    });

    test('menampilkan bagian About Me', async ({ page }) => {
        await page.goto('/');

        await expect(
            page.getByRole('heading', {
                name: 'About Me',
            })
        ).toBeVisible();
    });
});
