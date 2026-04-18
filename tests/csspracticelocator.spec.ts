import { expect, Locator, test } from "@playwright/test";

test("Verify CSS Locators", async ({page}) =>
{
    await page.goto("https://testpages.eviltester.com/pages/basics/basic-web-page/");

    const button:Locator = page.locator("button#button1");
    await button.click();

    const para2:Locator = page.locator("p#para2");
    await expect(para2).toBeVisible();


    const classP:Locator = page.locator("p.main");
    await expect(classP).toBeVisible();

    await page.goto("https://demowebshop.tricentis.com/");
    const searchBox:Locator = page.locator("input[name='NewsletterEmail']");
    await searchBox.fill("test");

    await page.waitForTimeout(5000); 
})