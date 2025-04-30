import {chromium, expect, test } from '@playwright/test'


test.describe('test Feature', () =>{
    test('test scenario', async()=>{

        const browser  = await chromium.launch({headless: false});
        const context  = await browser.newContext();
        const page = await context.newPage()

        await page.goto('https://magento.softwaretestingboard.com/')
        //expect 
        await expect(page).toHaveTitle('Home Page');
    })
})