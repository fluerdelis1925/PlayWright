import {test, expect, Locator, Page} from '@playwright/test';


test('Date Picker Automation', async ({page}) => {
 await page.goto("https://testautomationpractice.blogspot.com/")

 const dateInput = page.locator("#datepicker");
 await dateInput.click();

 selectDate("2029", "June", "29", page, true);

 

 await page.pause();
})

async function selectDate(year:string, month:string, day:string, page:Page, iFuture: boolean) {


  
    while (true) 
        {
    const Year = page.locator(".ui-datepicker-year").textContent();
    const Month = page.locator(".ui-datepicker-month").textContent();


            if(await Year === year && await Month === month) {
                break;
            }
         
              if (iFuture) 
              {
                const nextBtn = page.locator(".ui-datepicker-next");
                await nextBtn.click();
              }
              else
              {
                const prevBtn = page.locator(".ui-datepicker-prev");
                await prevBtn.click();
              }
 }
              const dayLocator = page.locator(".ui-datepicker-calendar tbody tr td").all();
              
              for(let days of await dayLocator)
              {
                const dayText = await days.textContent();
                if(dayText === day)
                {                
                  await days.click();
                  console.log(days);
                  break;
                }
           
             


 }
 }