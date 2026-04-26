import{expect, Locator, test} from '@playwright/test';

test('Validate Username text box', async ({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    
    const username:Locator = page.locator('#name');

    await expect(username).toBeVisible();
    await expect(username).toBeEnabled();

    const maxLenght:string| null = await username.getAttribute("maxlength");
    console.log("Max Length of the Username text box is :", maxLenght);
    expect(maxLenght).toBe('15');

    await username.fill("John Canedy");
    const enteredValue:string = await username.inputValue();
    console.log("Input Value of the Username text box is :", enteredValue);
    expect(enteredValue).toBe("John Canedy");

});

test('Validate radio button', async({page}) => 
{
   await page.goto("https://testautomationpractice.blogspot.com/");
   const maleRadio:Locator = page.locator('#male');

   await expect(maleRadio).toBeVisible();
   await expect(maleRadio).toBeEnabled();
   expect(await maleRadio.isChecked()).toBe(false);

   await maleRadio.check();
   expect(await maleRadio.isChecked()).toBe(true);
   await expect(maleRadio).toBeChecked();

   await page.waitForTimeout(3000);
});

test('Validate Checkbox', async({page}) => {
 await page.goto("https://testautomationpractice.blogspot.com/");

 const sundayChecbox:Locator = page.locator('#sunday');
 await sundayChecbox.check();
 await expect(sundayChecbox).toBeChecked();

 const days:string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
 const checkboxes:Locator[] = days.map(day => page.getByLabel(day));
 expect(checkboxes.length).toBe(7);

 for (const checkbox of checkboxes) {
     await checkbox.check();
     await expect(checkbox).toBeChecked();
 }
  await page.waitForTimeout(1000);
  for (const checkbox of checkboxes.slice(-3))
  {
      await checkbox.uncheck();
      await expect(checkbox).not.toBeChecked();
  }

  await page.waitForTimeout(3000);

  for (const checkbox of checkboxes)
  {
    if (await checkbox.isChecked())
    {
        await checkbox.uncheck();
        await expect(checkbox).not.toBeChecked();
    }
    else
    {
        await checkbox.check();
        await expect(checkbox).toBeChecked();

    }
  }
    await page.waitForTimeout(3000);

    const indexes:number[] = [1,2,3];
    for(const index of indexes)
    {
        await checkboxes[index].check();
        await expect(checkboxes[index]).toBeChecked();
    }

    await page.waitForTimeout(3000);

    const weekname:string = "Friday";
    
    for(const label of days)
    {
        if(label.toLowerCase() == weekname.toLowerCase())
        {
            const checkbox = page.getByLabel(label);
            await checkbox.check();
            await expect(checkbox).toBeChecked();
        }
    }

      await page.waitForTimeout(3000);
})