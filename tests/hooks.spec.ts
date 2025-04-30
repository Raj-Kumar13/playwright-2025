import { test, expect, chromium } from '@playwright/test';
test.describe('testing Hooks concept', () => {

    let page;
    test.beforeEach(async ({ browser }) => {
        page = await browser.newPage()
        await page.goto(`https://www.saucedemo.com/v1/index.html`);
        await page.locator(`[id='user-name']`).fill('standard_user')
        await page.locator(`[id='password']`).fill('secret_sauce')
        await page.locator(`[id='login-button']`).click()
    })

    test.afterAll(async () => {
        await page.locator(`//button[@xpath='1']`).click()
        await page.locator(`#logout_sidebar_link`).click()
        await page.close()
    })

    test('test -swag Labs application ', async () => {
        // const item = 'Sauce Labs Backpack'
        // const getSelector = (item) => { return page.locator(`//div[@class='inventory_item_label']/a/div[normalize-space(text()='${item}')]/parent::*/parent::*/following-sibling::div/div/following::button`) }
        // await getSelector(item).click()
        await page.locator(`//button[@xpath='1']`).click()
        await page.locator(`[role="img"]`).click()
        await page.locator(`.btn_action.checkout_button`).click();
    })
})