import {test, expect, Page, chromium, firefox, webkit} from '@playwright/test';

test ("Browser context demo", async () => {

        const browser = await chromium.launch(); // Launch the Chromium browser
        const context = await browser.newContext(); // Create a new browser context
        
        //creating 2 page
        const page1 = await context.newPage(); // Create a new page in the context
        const page2 = await context.newPage(); // Create another page in the same context
        console.log("No of pages created", context.pages().length); // Log the number of pages created in the context

         
        await page1.goto("https://playwright.dev"); // Navigate to Google on the first page
        await expect(page1).toHaveTitle(/Playwright/); // Assert that the title of the first page contains "Google"
        await page2.goto("https://selenium.dev"); // Navigate to Bing on the second page
        await expect(page2).toHaveTitle(/Selenium/); // Assert that the title of the second page contains "Bing"


        await page1.waitForTimeout(5000); // Wait for 5 seconds
        await page2.waitForTimeout(5000); // Wait for 5 seconds
})