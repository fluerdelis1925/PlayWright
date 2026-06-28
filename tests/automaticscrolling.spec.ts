import { test, expect, Page} from '@playwright/test';


test('Scrolling inside dropdown', async ({page}) =>
{
    await page.goto('https://testautomationpractice.blogspot.com/')
    const comboBox = page.locator('#comboBox');
    await comboBox.click();

    const option100 = page.locator('#dropdown div:nth-child(100)');
    console.log(await option100.innerText());
    await option100.scrollIntoViewIfNeeded(); // Scroll the option into view if it's not already visible
    await option100.click(); // Click the option after scrolling it into view
    await page.waitForTimeout(5000);
})

test.only('Scrolling inside the table', async ({page}) =>
{
    await page.goto('https://datatables.net/examples/basic_init/scroll_xy.html');
    const name = page.locator('tbody tr:nth-child(10)  td:nth-child(2)');
    const email = page.locator('tbody tr:nth-child(10)  td:nth-child(9)');
    console.log(await name.innerText(), " ", await email.innerText());
    await email.scrollIntoViewIfNeeded();
    await page.waitForTimeout(5000);
})