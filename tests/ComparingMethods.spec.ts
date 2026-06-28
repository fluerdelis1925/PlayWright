import{test,expect, Locator} from '@playwright/test'

test("Comparing methods", async({page})=> 
{
   await page.goto("https://demowebshop.tricentis.com/")
   const products:Locator = page.locator('.product-title'); //6 group of elements can use only tradition loop

//1) inner Text vs textContent
 console.log(await products.nth(1).innerText()); //14.1-inch Laptop
 console.log(await products.nth(1).textContent()); //            14.1-inch Laptop

//array[] for in loop
//not array traditional loop

const count = await products.count();

/* for(let i = 0; i < count; i++)
{
   // const productName:string = await products.nth(i).innerText(); //extract plain text, eliminates whitespace and line breaks
   // console.log(productName);

   // const productName: null | string = await products.nth(i).textContent(); //extracts text including extra whitespaces, line breaks, etc
   // console.log(productName);

    const productName: null | string = await products.nth(i).textContent(); //extracts text including extra whitespaces, line breaks, etc
   console.log(productName?.trim()); // ? optional parameter
} */

   //2) AllInnerText() vs AllTextContext()
   
/*    console.log("*****Comparing AllInnerText() vs AllTextContext()")
   const ProductName: string[] = await products.allInnerTexts();
   console.log("Product Names captured by allInerText(): ",ProductName);

   const productNames:string[] = await products.allTextContents();
   console.log("Product Names captured by allInerText(): ",productNames);

   const ProductNamesTrims: string[] = productNames.map(text => text.trim());
   console.log("Product Names trims: ",ProductNamesTrims); */

   //3 All() converts locators -----> Locators[]

 const productLocators:Locator[] = await products.all();
 console.log(await productLocators);
 //console.log(await productLocators[3].innerText());

 /* for(let productLoc of productLocators)
 {
   console.log(await productLoc.innerText())
 } */

   for(let i in productLocators)
   {
      console.log(await productLocators[i].innerText());
   }








})