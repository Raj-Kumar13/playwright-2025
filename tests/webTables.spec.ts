import { test, chromium, Locator } from '@playwright/test'

test.describe('Test Describe on WebTable', () => {
    test('Test WebTable', async () => {
        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();


        await page.goto('https://testautomationpractice.blogspot.com/');
        const tableSelector = () => { return page.locator('#productTable') };
        const columns = () => { return tableSelector().locator('tr th') }
        const rows = () => { return tableSelector().locator('tbody tr') }

        console.log(`Columns :: ` + await columns().count());
        console.log(`Rows :: ` + await rows().count());
        const itemsToBeSelected = ['Smartwatch', 'Smartphone', 'Wireless Earbuds']

        for (const item of itemsToBeSelected) {
            let matchingRow;
            matchingRow = rows().filter({
                has: page.locator('td'),
                hasText: item
            })
            await matchingRow.locator('input').check()
        }



        await page.pause()
    })
})