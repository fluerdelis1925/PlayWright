import { Locator, Page, test, expect } from "@playwright/test";

test("Extract and compare process data from a dynamic web table." , async({page})=>
{

    await page.goto("https://testautomationpractice.blogspot.com/");
    const table:Locator = page.locator("#taskTable tbody ");
    await expect(table).toBeVisible();

    const rows:Locator[] = await table.locator("tr").all();
    await expect(rows).toHaveLength(4)

    let ChromecpuLoad = '';
    let FirefoxMemory = '';
    let Network = '';
    let FirefoxDisk = '';

    for(let row of rows)
    {
        const rowText:string = await row.nth(0).innerText();
        console.log(rowText);
        if(rowText === "Chrome")
        {
            ChromecpuLoad = await table.locator("td",{hasText:'%'}).innerText();
            Network = await table.locator("td",{hasText:'Mbps'}).innerText();

        }
        if(rowText === "Firefox")
        {
            FirefoxMemory = await table.locator("td",{hasText:'MB'}).innerText();
            FirefoxDisk = await table.locator("td",{hasText:'MB/s'}).innerText();
        }
        

   
    }

    const chromecpu:string = await page.locator("strong[class='chrome-cpu']").innerText();
    const firefoxmemory:string = await page.locator("strong[class='firefox-memory']").innerText();
    const chromenetwork:string = await page.locator("strong[class='chrome-network']").innerText();
    const firefoxdisk:string = await page.locator("strong[class='firefox-disk']").innerText();
    if(chromecpu.includes(ChromecpuLoad))
    if(chromecpu.includes(ChromecpuLoad))
    {
        console.log(`CPU load of Chrome process: ${chromecpu}`)
    }
     if(firefoxmemory.includes(FirefoxMemory))
    {
        console.log(`Memory Size of Firefox process: ${firefoxmemory}`)
    }
    if(chromenetwork.includes(Network))
    {
         console.log(`Network speed of Chrome process: ${chromenetwork}`)
    }
    if(firefoxdisk.includes(FirefoxDisk))
    {
        console.log(`Disk space of Firefox process: ${firefoxdisk}`)
    }
   




  await page.pause();

})