import { test, chromium, expect } from '@playwright/test';
import { text } from 'stream/consumers';

test.describe('TestFeature', () => {
    test('Test TextBox - .fill()', async () => {
        const browser = await chromium.launch()
        const context = await browser.newContext()
        const page = await context.newPage()

        await page.goto('https://letcode.in/');
        await page.waitForLoadState('networkidle');
        await page.getByRole('link', { name: 'Work-Space' }).click();
        await page.waitForLoadState('networkidle');
        const field: string = 'Input'
        const selectorElement = page.locator(`//p[normalize-space(text())='${field}']/parent::*/following-sibling::*[2]//a`);
        await selectorElement.click();
        await page.getByPlaceholder('Enter first & last name').fill('Im Raj');
        await page.waitForTimeout(5000)
        await page.getByPlaceholder("Enter first & last name").clear()

        await page.close()
    })

    test('Test TextBox - .pressSequentially()', async () => {
        const browser = await chromium.launch()
        const context = await browser.newContext()
        const page = await context.newPage()

        await page.goto('https://letcode.in/');
        await page.waitForLoadState('networkidle');
        await page.getByRole('link', { name: 'Work-Space' }).click();
        await page.waitForLoadState('networkidle');
        const field: string = 'Input'
        const selectorElement = page.locator(`//p[normalize-space(text())='${field}']/parent::*/following-sibling::*[2]//a`);
        await selectorElement.click();
        await page.getByPlaceholder('Enter first & last name').pressSequentially('Im Raj', { delay: 300 });
        await page.waitForTimeout(5000)
        await page.getByPlaceholder("Enter first & last name").clear()
        await page.close()
    })

    test('Test Mouse actions - .click(), .dblclick(), .click({button:`right`})', async () => {
        const browser = await chromium.launch()
        const context = await browser.newContext()
        const page = await context.newPage()

        await page.goto('https://play1.automationcamp.ir/mouse_events.html');
        await page.waitForLoadState('networkidle');
        //single click
        await page.locator('#click_area').click();
        await page.waitForTimeout(5000)
        await expect(page.locator('#click_type')).toHaveText('Click');
        //double click
        await page.locator('#click_area').dblclick();
        await page.waitForTimeout(5000)
        await expect(page.locator('#click_type')).toHaveText('Double-Click');
        //right click
        await page.locator('#click_area').dblclick({ 'button': 'right' });
        await page.waitForTimeout(5000)
        await expect(page.locator('#click_type')).toHaveText('Right-Click');
        await page.close()
    })

    test('Test Radio Button - .check(), .isChecked(), .toBeChecked()', async () => {
        const browser = await chromium.launch()
        const context = await browser.newContext()
        const page = await context.newPage()

        await page.goto('https://letcode.in/');
        await page.waitForLoadState('networkidle');
        await page.getByRole('link', { name: 'Work-Space' }).click();
        await page.waitForLoadState('networkidle');
        const field: string = 'Radio';
        const selectorElement = page.locator(`//p[normalize-space(text())='${field}']/parent::*/following-sibling::*[2]//a`);
        await selectorElement.click();

        const radioButton = (value: 'yes' | 'no') => { return page.locator(`//label[normalize-space(text())='Select any one']/following-sibling::*/*/input[@id='${value}']`) };
        await expect(radioButton('yes')).not.toBeChecked()
        await expect(radioButton('no')).not.toBeChecked()
        await radioButton('yes').check()
        await page.pause()
        // await radioButton('no').uncheck()
        await expect(radioButton('no').isChecked).toBeFalsy()
        await page.close()
    })

    test('Test static dropdown - .selectOptions()', async () => {
        const browser = await chromium.launch()
        const context = await browser.newContext()
        const page = await context.newPage()

        await page.goto('https://letcode.in/');
        await page.waitForLoadState('networkidle');
        await page.getByRole('link', { name: 'Work-Space' }).click();
        await page.waitForLoadState('networkidle');
        const field: string = 'Select';
        const selectorElement = page.locator(`//p[normalize-space(text())='${field}']/parent::*/following-sibling::*[2]//a`);
        await selectorElement.click();
        await page.waitForLoadState('networkidle');
        await page.selectOption('#fruits', {
            value: "2"
        })
        page.waitForTimeout(900)
        await page.selectOption('#fruits', {
            index: 4
        })
        page.waitForTimeout(900)
        await page.selectOption('#fruits', {
            label: "Apple"
        })
        await page.pause()
        // await radioButton('no').uncheck()

    })

    test('Test Dynamic dropdown with search bar - ', async () => {
        const browser = await chromium.launch()
        const context = await browser.newContext()
        const page = await context.newPage()

        await page.goto('https://demo.automationtesting.in/Register.html');
        await page.waitForLoadState('networkidle');
        const field: string = "Select Country :"
        const selectorElement = page.locator(`//label[normalize-space(text())='${field}']/following::span/span[@role='combobox']`);
        await selectorElement.click();
        await page.locator('[type=search]').fill('India');
        await page.locator('#select2-country-results>li').click();

    })

    test('Test Dynamic dropdown withOut search bar - ', async () => {
        const browser = await chromium.launch()
        const context = await browser.newContext()
        const page = await context.newPage()

        await page.goto('https://demo.automationtesting.in/Register.html');
        await page.waitForLoadState('networkidle');
        const field: string = "Select Country :"
        const selectorElement = page.locator(`//label[normalize-space(text())='${field}']/following::span/span[@role='combobox']`);
        await selectorElement.click();
        await page.locator('[type=search]').locator('li', { hasText: 'Australia' });
        await page.locator('#select2-country-results>li').click();

    })


    test('Tab switch from on tab to another tab handler ', async () => {
        const browser = await chromium.launch()
        const context = await browser.newContext()
        const page = await context.newPage()

        await page.goto('https://letcode.in');

        const [newTab] = await Promise.all([
            context.waitForEvent('page'),
            page.evaluate(() => {
                window.open('/test', '_blank');
            }),
            await page.getByRole('link', { name: 'Work-Space' }).click()
        ])
        await newTab.waitForLoadState();
        await expect(newTab.locator("//h1[normalize-space(text()='Ready to be a Pro Engineer?')]")).toContainText('Ready to be a Pro Engineer?')
        await newTab.getByRole('link', { name: 'Work-Space' }).click();
        await newTab.waitForLoadState('networkidle');
        const field: string = 'Input'
        const selectorElement = newTab.locator(`//p[normalize-space(text())='${field}']/parent::*/following-sibling::*[2]//a`);
        await selectorElement.click();
        await newTab.getByPlaceholder('Enter first & last name').fill('Im Raj');
        await newTab.waitForTimeout(5000)
        await newTab.getByPlaceholder("Enter first & last name").clear()
    })

    test('web Tables', async () => {
        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();

        await page.goto('https://rahulshettyacademy.com/AutomationPractice/')
        const table = page.locator('#product');
        //#product tr th:nth-of-type(2)  ---- find nth in css
        const column = table.locator('tr th')
        console.log('Count of column  :: ' + await column.count())

        const row = table.locator('tbody tr')
        console.log('Count of row :: ' + await row.count())
    })

    test('web table handler and filter', async () => {
        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();

        await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

        const row = page.locator('fieldset div #product tr');
        const extratedText = await row.filter({
            has: page.locator('td:nth-of-type(2)'),
            hasText: 'Receptionist'
        })
        const test = await extratedText.locator('td:nth-of-type(2)').textContent();
        console.log(test)
    });






})