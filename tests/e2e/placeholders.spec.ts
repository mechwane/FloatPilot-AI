import { expect, test } from '@playwright/test';
for(const route of ['agent','operations','admin','judge'])test(`${route} remains informational`,async({page})=>{await page.goto(`/${route}`);await expect(page.getByText(/planned for a future phase/)).toBeVisible();await expect(page.getByRole('link',{name:/Explore the static demo/})).toBeVisible();});
