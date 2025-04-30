import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://magento.softwaretestingboard.com/');
  await page.getByRole('menuitem', { name: ' Men' }).hover()
  await page.getByRole('menuitem', { name: ' Tops' }).hover()
  await page.getByRole('menuitem', { name: 'Hoodies & Sweatshirts' }).click();
  await page.getByRole('listitem').filter({ hasText: 'Marco Lightweight Active' }).getByLabel('S', { exact: true }).click();
  await page.getByRole('listitem').filter({ hasText: 'Marco Lightweight Active' }).locator('button').click();
});