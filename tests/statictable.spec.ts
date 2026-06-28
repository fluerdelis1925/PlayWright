import { expect, Locator, test } from "@playwright/test";


test("Static web page", async ({page})=>
{
    await page.goto("https://testautomationpractice.blogspot.com/")

    const table:Locator = page.locator("table[name='BookTable'] tbody");
    await expect(table).toBeVisible();

    //count the number of rows
    const rows:Locator = table.locator("tr");
    await expect(rows).toHaveCount(7);
   
    const rowscount:number = await rows.count();
    console.log("the number of rows in a table: ", rowscount)
    expect(rowscount).toBe(7);

    //2 count the number of header
 
    const columns:Locator = rows.locator("th");
    await expect(columns).toHaveCount(4);

    const columnCount = await columns.count();
    expect(columnCount).toBe(4);

    // read all data from the 2nd row
    const secondRowsCells:Locator = rows.nth(2).locator('td');
    const secondrowsTexts:string[]= await secondRowsCells.allInnerTexts();
    console.log("2nd rows data", secondrowsTexts);
    await expect(secondRowsCells).toHaveText([ 'Learn Java', 'Mukesh', 'Java', '500' ])

    console.log("printing 2nd row data........")
    for(let text of secondrowsTexts)
    {
        console.log(text)
    }

    //4 Read all data from the table (excluding header)
   const allRowsdata=  await rows.all();
    console.log(allRowsdata)

    console.log("BookName     Author    Subject    Price")
    for(let rows of allRowsdata.slice(1))
    {
        const cols= await rows.locator('td').allInnerTexts();
        console.log(cols.join('\t'))
    }

    // 5 Print book names where the author mukesh
    console.log("Book written by mukkes")

    const mukesBook:string[]=[];
     for(let rows of allRowsdata.slice(1))
    {
        const cells= await rows.locator('td').allInnerTexts();
        const author = cells[1];
        const books = cells[0];

        if(author == "Mukesh")
        {
            console.log(`${author}, ${books}`)
            mukesBook.push(books)
        }
    }

    expect(mukesBook).toHaveLength(2);

     let total:number = 0;
     for(let rows of allRowsdata.slice(1))
    {
        const cells= await rows.locator('td').allInnerTexts();
        const price = cells[3];
        console.log(price);

        total = total + parseInt(price);     
    }
    console.log(total)

    page.pause();
})