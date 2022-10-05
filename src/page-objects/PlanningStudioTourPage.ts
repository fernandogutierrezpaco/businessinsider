import { Locator, Page } from "@playwright/test";

export class PlanningStudioTourPage {
  private readonly page: Page;
  private shareIcon: Locator;
  private shareBar: Locator;
  private saveArticleIcon: Locator;
  private facebookIcon: Locator;
  private emailIcon: Locator;
  private insiderLogo: Locator;
  private closeIcon: Locator;


  constructor(page: Page) {
    this.page = page;
    this.shareIcon = page.locator('.svg-icon.share-icon');
    this.shareBar = page.locator('.dropdown-menu');
    this.saveArticleIcon = page.locator("[aria-label='Save this article']");
    this.facebookIcon = page.locator('.share-link.facebook');
    this.emailIcon = page.locator('.share-link.email');
    this.insiderLogo = page.locator('.logo-INSIDER');
    this.closeIcon = page.locator("//*[contains(@class,'ins-drawer-close-icon')]");
  }

  public async clickShareIcon(): Promise<void> {
    await this.shareIcon.click();
  }

  public async isShareBarVisible(): Promise<boolean> {
    return await this.shareBar.isVisible();
  }

  public async isInsiderLogoVisible(): Promise<boolean> {
    return await this.insiderLogo.first().isVisible();
  }

  public async clickSaveArticle(): Promise<void> {
    await this.saveArticleIcon.click();
  }

  public async clickCloseIcon(): Promise<void> {
    await this.closeIcon.click();
  }

  public async clickFacebookIcon(): Promise<void> {
    await this.facebookIcon.first().click();
  }

  public async clickEmailIcon(): Promise<void> {
    await this.emailIcon.first().click();
  }
  
  public async openFacebookPopup(): Promise<Page> {
    const [newPage] = await Promise.all([
      this.page.waitForEvent('popup'),
      this.clickFacebookIcon()
    ]);

    return newPage;
  }
}
