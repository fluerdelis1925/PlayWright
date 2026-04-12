import {test, locator, expect} from "@playwright/test"

test("Verify Playwright Locators", async ({page}) => {
 await page.goto("http://127.0.0.1:5500/tests/app.html");


 const btn: locator = page.getByRole("button",{name: "Primary Action"});
 await expect(btn).toBeVisible();

 const btnSubmitForm = page.getByText("Submit Form");
 await expect(btnSubmitForm).toBeVisible();
 await btnSubmitForm.click();

const emailInput = page.getByLabel("Email Address:");
await expect(emailInput).toBeVisible();
await emailInput.fill("Daniel@gmail.com");

const fullNameInput= page.getByPlaceholder("Enter your full name");
await expect(fullNameInput).toBeVisible();
await fullNameInput.fill("John Doe");

const TestImg = page.getByAltText("logo image");
await expect(TestImg).toBeVisible();

const HomeText = page.getByTitle("Home page link");
await expect(HomeText).toBeVisible();
await expect(HomeText).toHaveText("Home");

const emailData = page.getByTestId("profile-email");
await expect(emailData).toHaveText("john.doe@example.com");

})