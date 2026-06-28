import{Locator, test, expect, Page} from "@playwright/test"

test("Check the specific data in table", async({page})=>
{
   await page.goto("https://testautomationpractice.blogspot.com/");
   const datePicker2 = page.locator("input[id='txtDate']");
   await datePicker2.click();

   await selectDate ("2029", "Jun", "29", page);
   await page.waitForTimeout(8000);

})

test("Select Date Range (using fill())", async({page})=>
{
   await page.goto("https://testautomationpractice.blogspot.com/");
const date = "2025-01-23";
const date1 = "2025-06-23";

await page.locator("#start-date").fill(date);
await page.locator("#end-date").fill(date1);
await page.locator(".date-picker-box").getByRole("button", {name: "Submit"}).click();

await page.pause();

})

async function selectDate(year:string, month:string, day:string, page:Page,)
{
 
   await page.locator(".ui-datepicker-month").selectOption({label: month});
   await page.locator(".ui-datepicker-year").selectOption({label: year});

    const dayLocator = page.locator(".ui-datepicker-calendar tbody tr td").all();

    for(let days of await dayLocator)
    {
        const dayText = await days.textContent();
        if(dayText === day)
        {
            await days.click();
            break;
        }
    }
}