import {Locator, test, expect} from "@playwright/test";

test("Verify Chrome CPU load in dynamic table" , async({page})=>
{
   await page.goto("https://practice.expandtesting.com/dynamic-table");
   const table:Locator = page.locator("table.table tbody");
   await expect(table).toBeVisible();

   const rows:Locator[] = await table.locator("tr").all();
   await expect(rows).toHaveLength(4);


   let cpuLoad = '';
   for(const row of rows)
   {
      const processName:string = await row.locator("td").nth(0).innerText();
      if(processName === "Chrome")
      {
         cpuLoad = await row.locator("td",{hasText:'%'}).innerText();
         console.log("CPU Load of chrome: ", cpuLoad)
         break;
      }
   }
   // step 2 compate it with value in yellow vallue

   await page.waitForTimeout(5000)

   const yellowBoxText = await page.locator("#chrome-cpu").innerText();
   console.log("Chrome CPU from yellow box is: ",yellowBoxText);

   if(yellowBoxText.includes(cpuLoad))
   {
      console.log("CPU load of chrome is equal")
   }
   else
   {
      console.log("CPU load of chrome is not equal")
   }

   expect(yellowBoxText).toContain(yellowBoxText);

  
}) 
