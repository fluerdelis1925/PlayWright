import {test, expect, Locator, chromium} from '@playwright/test';

test ("handle tabs", async() =>
{
    const browser = await chromium.launch();
    const context = await browser.newContext();

    // creating 2 page
    const parentPage = await context.newPage();
    const page1 = await context.newPage();

    context.waitForEvent('page'); //pending, fulfilled, rejected
     parentPage.goto("https://testautomationpractice.blogspot.com/");
    // parentPage.locator("button:has-text('New Tab')").click();
    
    const [childPage] = await Promise.all([context.waitForEvent('page'), parentPage.locator("button:has-text('New Tab')").click()]);

    //approah 1 swith between pages and get titles
    const page  = context.pages(); // get all pages / returns an array of all open pages in the context
    console.log("No of pages opened", page.length); // Log the number of pages opened in the context

    console.log("Parent page title:", await page[0].title()); // Log the title of the parent page
    console.log("Child page title:", await page[1].title()); // Log the title of the child page

    //approach 2
    console.log("Parent page title:", await parentPage.title()); // Log the title of the parent page
    console.log("Child page title:", await childPage.title()); // Log the title of the child page


})