import { test, expect, chromium } from '@playwright/test'

test.describe('Test the feature', () => {
    test('test - dynamic DropDown', async () => {
        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();

        await page.goto('https://www.goindigo.in/')
        // await page.locator(`[name='q']`).fill('goindigo')
        // await page.locator(`[name='q']`).press('Enter');
        // await page.locator(`//div[@class="recaptcha-checkbox-border"]`).check();

        const [newTab] = await Promise.all([
            page.waitForEvent('popup'),
            page.evaluate(() => {
                window.open('https://www.goindigo.in/')
                page.locator(`//a[@jsname="UWckNb"]/h3[contains(text(),'Book Domestic')]`).click()
            }),
            await page.waitForLoadState('load'),
            await page.locator(`//div[@class="YmvwI" and normalize-space(text())='News']`).click()
        ])
        await page.goto('https://www.goindigo.in/')

        await page.goto('https://demo.automationtesting.in/Windows.html');

        const [newTab] = await Promise.all([
            page.waitForEvent('popup'),
            await page.click('button:has-text("click")')
        ])

        await newTab.waitForLoadState('networkidle');
        // await newTab.getByPlaceholder('Start typing..').pressSequentially('NEW', { delay: 500 })
        // await newTab.locator(`.city-selection`).filter({ hasText: 'New York' }).click()
        await newTab.pause();
    })

    test.only('test - dynamic DropDown1', async () => {
        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();


        await page.goto('https://www.amazon.in/s?k=bat')

        // const [newTab] = await Promise.all([
        //     page.waitForEvent('popup'),
        //     await page.locator('.gb_X', { hasText: 'Images' }).click()
        // ])

        // await newTab.locator('[@name="q"]').fill('raj')

    })
})