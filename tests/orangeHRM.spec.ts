import { expect, chromium, test } from '@playwright/test'

test.describe('Test A LOGIN feature OrangeHRM', () => {
        test('Test Scenario', async () => {
                const browser = await chromium.launch();
                const context = await browser.newContext();
                const page = await context.newPage();
                //Login
                await page.goto('https://opensource-demo.orangehrmlive.com');
                await page.getByPlaceholder('Username').fill('Admin')
                await page.getByPlaceholder('Password').fill('admin123')
                await page.getByRole('button', { name: 'Login' }).click();
                await page.waitForLoadState('networkidle');
                await expect(page.locator('//h6')).toHaveText('Dashboard')
                //Assertion .toBeVisible(), .toBeHidden() 
                console.log(await page.getByPlaceholder('Search').isVisible());
                await expect(page.getByPlaceholder('Search')).toBeVisible({ 'visible': true });
                await page.locator("[type='button'][role='none']").click()
                console.log(await page.getByPlaceholder('Search').isHidden());
                await expect(page.getByPlaceholder('Search')).toBeHidden();

                //LogOut
                await page.locator("//img[@alt='profile picture']/following-sibling::*[2]").click()
                await page.getByRole('menuitem', { name: 'Logout' }).click()



        })
})