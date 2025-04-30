import { chromium, expect, test } from '@playwright/test'

test.describe('test feature', () => {
    test('Test scenario', async () => {
        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();


        await page.goto('https://magento.softwaretestingboard.com/');
        console.log('assertion :: ' + await expect(page.locator('[class="logo"]')).toBeVisible())
        await expect(page.locator('[class="logo"]')).toBeVisible()
        await page.locator('[id="ui-id-2"]').hover();
        await expect(page.locator('.level1.nav-2-1.category-item.first.parent.ui-menu-item')).toBeHidden()
    });

    test('present/Not Present Assertion', async () => {
        const browser = await chromium.launch({ headless: false })
        const context = await browser.newContext();
        const page = await context.newPage();

        await page.goto('https://the-internet.herokuapp.com/add_remove_elements/');
        await expect(page.locator('.added-manually')).not.toHaveCount(1)
        for (let i = 0; i < 5; i++) {
            await page.locator('button[onclick="addElement()"]').click()
            await expect(page.locator('.added-manually')).toHaveCount(i + 1)
        }
    })

    test('Test login/logOut Feature for Orange HRM', async () => {
        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();

        await page.goto('https://opensource-demo.orangehrmlive.com/');
        const userNameLocator = await page.locator("//p[contains(normalize-space(), 'Username')]").textContent()
        const userName = userNameLocator ? userNameLocator?.split(': ')[1] : '';
        const passwordLocator = await page.locator("//p[contains(normalize-space(), 'Password')]").textContent()
        const password = passwordLocator ? passwordLocator?.split(': ')[1] : '';

        await page.getByPlaceholder('username').fill(userName);
        await page.getByPlaceholder('password').fill(password);
    })
});