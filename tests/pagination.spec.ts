import {Locator, test, expect} from "@playwright/test"

test("Read data form all the table page" , async ({page})=>
{
    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");

    let hasmorepage = true;

  
       const row = await page.locator("#example tbody tr").all();

       while(hasmorepage)
       {
       for(let rows of row)
       {
         console.log(await rows.innerText());
       }
       page.waitForTimeout(2000);

       const nextButton = page.locator("button[aria-label='Next']");
       const disAbleBttn = await nextButton.getAttribute('class');

       {
        if(disAbleBttn?.includes("disabled"))
        {
            hasmorepage = false;
        }
        else
        {
            nextButton.click();
        }
       }


    }
    

})

test("Filter the rows and check the rows count" , async({page})=>
{
  
    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");
    const dropdown = page.locator("#dt-length-0")
    await dropdown.selectOption({label: '25'})

    const row = await page.locator("#example tbody tr").all();
    expect(row.length).toBe(25)

    const row2 = await page.locator("#example tbody tr");
    await expect(row2).toHaveCount(25);


})

test("Check the specific data in table", async({page})=>
{

    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");
    const searchBar = page.locator("#dt-search-0");
    await searchBar.fill('Brenden Wagner')

    
    await page.waitForTimeout(5000);
    const row = await page.locator("#example tbody tr").all();

    if(row.length >=1)
    {
        for(let rows of row)
        {
            let matchData = true;
            const text = await rows.innerText();
            if(text.includes("Brenden Wagner"))
            {
                console.log("record found");
                matchData = true;
                break;
            }
            else
            {
                console.log("not found")
            }

            expect(matchData).toBeTruthy();
        }


    }




})

