import { Locator, Page, expect, test } from "@playwright/test";

test("Extract Data from a Paginated Table" , async({page})=>
{
   await page.goto("https://testautomationpractice.blogspot.com/")

   const row = await page.locator("#productTable tbody tr ").all();
  
    let hasnext = true;

    const nextBtn = page.locator('#pagination li');
    for (let i = 0; i < await nextBtn.count(); i++) {
    //  await page.waitForTimeout(500); 
      for(let rows of row)
   {
     console.log(await rows.innerText());
   }
      await nextBtn.nth(i).click();
    }
   
   

   
    

  
   await page.waitForTimeout(5000);
   page.pause();

})