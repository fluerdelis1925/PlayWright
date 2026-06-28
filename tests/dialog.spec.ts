import {Locator, Page, expect, locator, test} from '@playwright/test';


test("Simple dialog", async ({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    page.on('dialog', (dialog) => {
        console.log("Dialog type: ",dialog.type()); //returns the type of the dialog (alert, confirm, prompt, beforeunload)
        expect(dialog.type()).toContain("alert");
        console.log("Dialog message:", dialog.message()); //returns the message displayed in the dialog
        
        
        
        dialog.accept()
    });

    await page.locator("#alertBtn").click();
    await page.pause();

})

test("Confirmation alert", async ({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    page.on('dialog', (dialog) => {
        console.log("Dialog type: ",dialog.type()); //returns the type of the dialog (alert, confirm, prompt, beforeunload)
        expect(dialog.type()).toContain("confirm");
        console.log("Dialog message:", dialog.message()); //returns the message displayed in the dialog
        expect(dialog.message()).toContain("Press a button!");
         dialog.accept()//close dialog by accepting it
         //dialog.dismiss()//close dialog by dismissing it

    });

    await page.locator("#confirmBtn").click();
    const demoText: string = await page.locator("#demo").innerText();
    console.log("Output text: 4", demoText);
    expect(page.locator("#demo")).toHaveText("You pressed OK!");
    await page.pause();

})

test.only("Prompt alert", async ({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    page.on('dialog', (dialog) => {
        console.log("Dialog type: ",dialog.type()); //returns the type of the dialog (alert, confirm, prompt, beforeunload)
        expect(dialog.type()).toContain("prompt");
        console.log("Dialog message:", dialog.message()); //returns the message displayed in the dialog
        expect(dialog.message()).toContain("Please enter your name:");

        expect(dialog.defaultValue()).toContain("Harry Potter"); //returns the default value in the prompt dialog
         dialog.accept("Harry Potter")//close dialog by accepting it
         //dialog.dismiss()//close dialog by dismissing it

    });

    await page.locator("#promptBtn").click();
    const demoText: string = await page.locator("#demo").innerText();
    console.log("Output text: 4", demoText);
    expect(page.locator("#demo")).toHaveText("Hello Harry Potter! How are you today?");
    await page.pause();

})