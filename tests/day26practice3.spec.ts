import{test, Page, Locator, expect} from "@playwright/test"

test("Flight Booking Automation", async({page})=>
{
   await page.goto("https://blazedemo.com/");

   const selectDeparture = page.locator("select[name='fromPort']");
   await selectDeparture.selectOption('Boston');


   const selectDestination = page.locator("select[name='toPort']");
   await selectDestination.selectOption('London');

   await page.getByRole('button',{name: 'Find Flights'}).click();
   
   const rows = page.locator("table.table tbody tr");
   const rowCount = await rows.count();
   expect(rowCount).toBeGreaterThan(0);

   const price:string[] = [];
   for(let i=0; i<rowCount; i++)
   {
      const priceText = await rows.nth(i).locator("td").nth(5).innerText();
      price.push(priceText);
   }

   console.log(price);
   console.log("Sort all prices in ascending order");
   const sortedPrice:string[] = [...price].sort();
   console.log(sortedPrice);
   const LoweestPrice = sortedPrice[0];
   console.log("Lowest Price is : "+LoweestPrice);

   for(let i=0; i<rowCount; i++)
   {
      const priceText = await rows.nth(i).locator("td").nth(5).innerText();
   
      if(priceText === LoweestPrice)
      {
         const click =  rows.nth(i).locator("td").nth(0).locator("input[type='submit']");
         await click.click();
         console.log(click);
         break;
      }
   }

   await page.pause();

})