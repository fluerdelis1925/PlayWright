import { test, expect, Locator } from '@playwright/test';
import fs from 'fs';
import {parse} from 'csv-parse/sync';
import console from 'console';

//Reading data from csv
const csvPath = 'testdata/LOAN_BOOKING_20260611002.csv';
const fileContent=fs.readFileSync(csvPath,'utf-8');

const records: { baseAcctNoO: string }[] = parse(fileContent,
                        {
                            columns:true, 
                            skip_empty_lines:true
                        }
                    ) as { baseAcctNoO: string }[];

//main test
   test('Wala lang', async ({ page }) => {
  await page.goto('https://sso-integrator-sbf-uat5.ocft.com.sg/login-page?systems=icms');
  await page.locator('#userName').click();
  await page.locator('#userName').fill('dinsular@vertere-gs.com');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('dinsular@vertere-gs.com');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.locator('div').filter({ hasText: /^Loan Management$/ }).click();
  await page.getByRole('menuitem', { name: 'Loan Exception Mgt' }).click();
  await page.getByRole('textbox', { name: 'End date' }).click();
  await page.getByTitle('Next year (Control + right)').dblclick();
  await page.getByTitle('Next year (Control + right)').nth(1).dblclick();
  await page.getByTitle('Next year (Control + right)').nth(1).click();
  await page.getByTitle('Next year (Control + right)').nth(1).dblclick();
  await page.getByText('31').nth(2).click();
  await page.getByText('1').nth(2).click();
  await page.getByRole('textbox', { name: 'Loan/Borrow No.:' }).click();
  
  for (const data of records) {
    
  await page.getByRole('textbox', { name: 'Loan/Borrow No.:' }).fill(data.LoanNo);
  await page.getByRole('button', { name: 'icon: search Query'}).click();   
  const table: Locator = page.locator("tbody");
  const rows: Locator = table.locator("tr");
   const allRowsdata=  await rows.all();
   
  for (let rows of allRowsdata) {
    const cols = await rows.locator('td').allInnerTexts();
    console.log("Loan Acc Number:", data.LoanNo, "Status:", cols[8]);
  
    if(cols[8] === "Pending")
    {
       const btn = page.getByRole('radio')
       await btn.click();
       console.log(await btn.isChecked())
       await page.getByRole('button', { name: 'Repost' }).click();
    }
    else
    {
        console.log(cols[8])
       
    }

  }

  

   
  

  }


});


