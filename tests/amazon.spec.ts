import { test, expect } from '@playwright/test';

test('Amazon search for bat and extract item names and prices', async ({ page }) => {
    await page.goto('https://www.amazon.in');

    await page.locator('#twotabsearchtextbox').fill('bat');
    await page.locator('#nav-search-submit-button').click();

    await page.waitForSelector('[data-component-type="s-search-result"]');

    const items = page.locator('[data-component-type="s-search-result"]');

    const count = await items.count();
    const results: { name: string; price: string }[] = [];

    for (let i = 0; i < count; i++) {
        const item = items.nth(i);

        const name = await item.locator('h2 span').textContent().catch(() => null);
        const priceWhole = await item.locator('.a-price-whole').first().textContent().catch(() => null);
        const priceFraction = await item.locator('.a-price-fraction').first().textContent().catch(() => null);

        results.push({
            name: name?.trim() || 'No name',
            price: priceWhole ? `₹${priceWhole.trim()}.${priceFraction ? priceFraction.trim() : ''}` : 'No price',
        });
    }

    results.forEach((item, index) => {
        console.log(`${index + 1}:`, item);
    });

    expect(results.length).toBeGreaterThan(0);

});
