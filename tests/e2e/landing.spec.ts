import { expect, test } from '@playwright/test';
test('landing links to interactive demo',async({page})=>{await page.goto('/');await expect(page.getByRole('heading',{name:/See liquidity risk/})).toBeVisible();await page.getByRole('link',{name:/Explore Interactive Demo/}).click();await expect(page).toHaveURL(/\/demo$/);});
