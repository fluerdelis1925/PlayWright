import {expect, test, Page} from '@playwright/test';

test ("handle popup", async ({browser}) =>
{
    const context = await browser.newContext(); // Create a new browser context
    const page = await context.newPage(); // Create a new page in the context
    await page.goto("https://testautomationpractice.blogspot.com/");

    //muliple popups

    await Promise.all([page.waitForEvent('popup'),await page.locator("#PopUp").click()]);
    // page.waitForEvent('popup'); //pending, fulfilled, rejected
    // await page.locator("PopUp").click();

    const allPopupWindows = context.pages(); // get all pages / returns an array of all open pages in the context
    console.log("No of pages opened", allPopupWindows.length); // Log the number of pages opened in the context

    console.log(allPopupWindows[0].url()); // Log the URL of the parent page
    console.log(allPopupWindows[1].url()); // Log the URL of the child page

    for(const pw of allPopupWindows)
        {
            const title = await pw.title();
            if(title.includes("Selenium"))
            {
               await pw.locator('.getStarted_Sjon').click();
            //    Perform any action on the popup page
              await pw.close(); // Close the popup page
              
            }
        }
    
})