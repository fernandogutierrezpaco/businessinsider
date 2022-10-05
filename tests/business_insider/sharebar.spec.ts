import { test, expect } from '@playwright/test';
import { PlanningStudioTourPage } from '../../src/page-objects/PlanningStudioTourPage';

let planingStudioTourPage;

test.beforeEach(async ({ page }) => {
  planingStudioTourPage = new PlanningStudioTourPage(page);
  await page.goto('https://www.businessinsider.com/ikea-nyc-store-planning-studio-tour-2019-4');
});

test.describe('Share bar suite', () => {
  test('Assert that clicking the arrow expands the sharebar', async ({ page }) => {
    await planingStudioTourPage.clickShareIcon();
    expect(await planingStudioTourPage.isShareBarVisible()).toBeTruthy();
  });

  test('Assert that each button performs an action when clicked', async ({ page }) => {
    await test.step('🧪 1. Verify that Insider logo is displayed.', async () => {
      await planingStudioTourPage.clickSaveArticle();
      expect.soft(await planingStudioTourPage.isInsiderLogoVisible()).toBeTruthy();

      await planingStudioTourPage.clickCloseIcon();
    });

    await test.step('🧪 2. Assert that Facebook pop up title and its content is displayed.', async () => {
      const facebookPopUp = await planingStudioTourPage.openFacebookPopup();

      await expect.soft(facebookPopUp).toHaveTitle('Facebook');
      await expect.soft(facebookPopUp.locator("#content")).toContainText("Log into your Facebook account to share.");

      await facebookPopUp.close();
    });

    await test.step('🧪 3. Assert that Email pop up window is displayed.', async () => {
      // TODO: Not able to complete since email icon opens a new window depending of your Operating System
      await planingStudioTourPage.clickEmailIcon();
    });
 });
});
