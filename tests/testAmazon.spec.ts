import { test, chromium } from '@playwright/test'
test.describe('Test Amazon', () => {
    test.only('test feature', async () => {
        const browser = await chromium.launch();
        //     const context = await browser.newContext({ headless: false })
        const context = await browser.newContext();
        const page = await context.newPage();


        await page.goto('https://www.amazon.in')
        await page.waitForSelector(`[name="field-keywords"]`);
        await page.locator(`[name="field-keywords"]`).pressSequentially('IPhone', { delay: 100 });
        await page.locator(`[type = "submit"]`).click();
        await page.waitForLoadState('networkidle');
        const results: { name: string; price?: string }[] = [];

        const items = await page.locator(`[class="a-section"]>.puisg-row`)
        for (let i = 0; i < await items.count(); i++) {
            const item = await items.nth(i);
            const getTitle = await item.locator('h2 span').textContent()
            const getPrice = await item.locator('span .a-price-whole').textContent()
            results.push({
                name: getTitle || 'No value',

                price: getPrice || 'No value'
            })

            console.log(`Item :: ${results[i].name}
                    price :: ${results[i].price}`)

        }



    })
})