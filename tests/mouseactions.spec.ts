    import {page, chromium, test, expect} from '@playwright/test';

    test ("mouse actions", async () => {
        const browser = await chromium.launch();
        const context = await browser.newContext();

        const chromePage = await context.newPage();
        await chromePage.goto("https://testautomationpractice.blogspot.com/");
    })

    
    test ("right click", async () => {
     const browser = await chromium.launch();
     const context = await browser.newContext();

     const chromePage = await context.newPage();

     await chromePage.goto('https://swisnl.github.io/jQuery-contextMenu/demo.html');

     const rightClickBtn = chromePage.locator('span.context-menu-one'); // Locate the button with the text "right click me"
     await rightClickBtn.click({ button: 'right' }); // Perform a right-click on the located button
     
    await chromePage.waitForTimeout(5000); // Wait for 5 seconds to observe the right-click effect
    })
    
    test ("double click", async () => {
     const browser = await chromium.launch();
     const context = await browser.newContext();

     const chromePage = await context.newPage();
     await chromePage.goto('https://testautomationpractice.blogspot.com/');
     const btncopy = chromePage.locator('button[ondblclick="myFunction1()"]')// Locate the button with the specified ondblclick attribute and perform a double-click on it
     await btncopy.dblclick();

     const field2 = chromePage.locator('#field2'); // Locate the element with id "field2"
     await expect(field2).toHaveValue('Hello World!'); // Assert that the value of the element with id "field2" is "Hello World!"
     chromePage.locator('#field2').waitFor(); // Wait for the element with id "field2" to be present in the DOM

        await chromePage.waitForTimeout(5000); // Wait for 5 seconds to observe the double-click effect 
    })

    test.only ("drag and drop", async () => {
    
        const browser = await chromium.launch();
        const context = await browser.newContext();

        const chromePage = await context.newPage();
       await chromePage.goto('https://testautomationpractice.blogspot.com/');

       const boxA = chromePage.locator('#draggable');
       const boxB = chromePage.locator('#droppable');

       await boxA.dragTo(boxB); 

       await chromePage.waitForTimeout(5000); // Wait for 5 seconds to observe the drag-and-drop effect

    })