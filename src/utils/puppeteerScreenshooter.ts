import puppeteer, { type Page, type Browser } from 'puppeteer'

export class PuppeteerLogic {
  private static instance: PuppeteerLogic
  private browser!: Browser
  private page!: Page

  async initialize (): Promise<void> {
    this.browser = await puppeteer.launch({
      args: ['--no-sandbox'],
      headless: 'new',
      executablePath: '/usr/bin/chromium'
    })

    this.page = await this.browser.newPage()

    await this.page.setViewport({ width: 1200, height: 630 })
  }

  public static async getInstance (): Promise<PuppeteerLogic> {
    if (PuppeteerLogic.instance == null) {
      PuppeteerLogic.instance = new PuppeteerLogic()
      await PuppeteerLogic.instance.initialize()
    }

    return PuppeteerLogic.instance
  }

  async setContent (title: string): Promise<void> {
    const html = `
    <main>
    <img src="https://arch-fan.com/_astro/icon.d9857d6f_ZdO0go.webp">
    <h1>${title}</h1>
  </main>
  <style>
  * {
  margin: 0;
}

main {
  background-image: linear-gradient(to bottom right, #09f, #01f);
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

img {
  border-radius: 360px;
  width: 20%;
}

h1 {
  font-family: ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";
  color: black;
  font-size: 60px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  width: 80%;
  text-align: center;
  -webkit-text-stroke-width: 2px; 
  -webkit-text-stroke-color: white;
}
</style>
      `

    await this.page.setContent(html)
  }

  async getScreenshot (): Promise<Buffer> {
    const screenshot = await this.page.screenshot({
      type: 'webp',
      optimizeForSpeed: true
    })

    return screenshot
  }
}
