import {test, expect, Page} from '@playwright/test';

test('handle authenticated popups', async ({browser}) => {

    const context = await browser.newContext({httpCredentials: {username: 'admin', password: 'admin'}}); // Set HTTP credentials for authentication
    const page = await context.newPage();
    
    await page.goto("https://the-internet.herokuapp.com/basic_auth");

    await page.waitForLoadState(); // Wait for the page to load completely

    await expect(page.locator('text=Congratulations')).toBeVisible(); // Verify that the success message is visible on the page
    await page.waitForTimeout(3000); // Wait for 3 seconds before closing the browser

})
