import { test, expect } from '@playwright/test';
import {appLogin, getCard, getColumn, getTag} from '../test_objects/helper_methods';
import {loginData, testData} from '../test_objects/data_objects'

test.describe("Kanban Board Tests", () => {
  for (const { appType, columnName, cardText, tags } of testData) {
    test(`Verify card '${cardText}' in column '${columnName}' for '${appType}'`, async ({ page }) => {
      // Login
      await appLogin(page, loginData.url, loginData.email, loginData.password);
      await page.getByRole("button", { name: appType }).click();

      // Get Column and Verify it's visible
      const column = await getColumn(page, columnName);
      await expect(column).toBeVisible();

      // Get Card and Verify it's visible
      const card = await getCard(column, cardText);
      await expect(card).toBeVisible();

      // Get and Verify Tags
      for (const tag of tags) {
        const tagLocator = await getTag(card, tag);
        await expect(tagLocator).toBeVisible();
      }
    });
  }
});