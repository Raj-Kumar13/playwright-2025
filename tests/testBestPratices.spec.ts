import { test, expect, chromium } from '@playwright/test';

test.describe('Test letCode page', () => {
    test('test - inputField', async () => {
        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();

        await page.goto('https://letcode.in/');
        //implement-page should open on next tab
        const [newTab] = await Promise.all([
            page.waitForEvent('popup'),
            page.evaluate(() => {
                window.open('/test')
            }),
            await page.getByRole('link', { name: 'Work-Space' }).click()
        ]);
        await newTab.waitForLoadState('networkidle');
        const fieldName = 'Input';
        const selectElement = (field: string) => { return newTab.locator(`//p[normalize-space(text())='${field}']/parent::*/following::*[4]/a`) }
        await selectElement(fieldName).click()

        //fill Input Field - .fill()
        await newTab.locator('.field', {
            has: newTab.locator('label:text("Enter your full Name")')
        }).locator('div input').fill('My name is Raj Kumar')


        await newTab.locator(`//div/input[@type='text'][@id='join']`).clear()
        await newTab.locator(`//div/input[@type='text'][@id='join']`).pressSequentially('My name is Raj Kumar', { delay: 200 })
        await newTab.pause()
    })



    test('Test Windos', async () => {
        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage()


        await page.goto('https://letcode.in/');
        const [newTab] = await Promise.all([
            context.waitForEvent('page'), // wait for new page (tab)
            page.evaluate(() => {
                window.open('/test')
            }),
            page.getByRole('link', { name: 'Work-Space' }).click() // click that opens new tab
        ]);
        await newTab.waitForLoadState();
        console.log(await newTab.title());
    })

    test.only('Test -windows', async () => {
        const browser = await chromium.launch()
        const context = await browser.newContext();
        const page = await context.newPage();

        await page.goto('https://letcode.in/')
        await page.waitForLoadState('networkidle');

        const [newTab] = await Promise.all([
            page.waitForEvent('popup'),
            page.evaluate(() => {
                window.open('/test')
            }),
            await page.getByRole('link', { name: 'Work-Space' }).click()
        ])

        await newTab.waitForLoadState('networkidle');
        const fieldName = 'Input';
        const selectElement = (field: string) => { return newTab.locator(`//p[normalize-space(text())='${field}']/parent::*/following::*[4]/a`) }
        await selectElement(fieldName).click()

        //fill Input Field - .fill()
        await newTab.locator('.field', {
            has: newTab.locator('label:text("Enter your full Name")')
        }).locator('div input').fill('My name is Raj Kumar')


        await newTab.locator(`//div/input[@type='text'][@id='join']`).clear()
        await newTab.locator(`//div/input[@type='text'][@id='join']`).pressSequentially('My name is Raj Kumar', { delay: 200 })
    })
})