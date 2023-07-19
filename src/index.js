import puppeteer from "puppeteer"
import getLinks from "./utils/getLinks.js"
import scrollDown from "./utils/scrollDown.js"
import getRequirements from "./utils/getRequirements.js"

export async function createBrowserInstance() {
  return await puppeteer.launch({
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--ignore-certificate-errors",
    ], // Required.
    headless: true,
  })
}

async function run() {
  const browser = await createBrowserInstance()
  const [page] = await browser.pages()

  await page.setUserAgent(
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36"
  )
  await page.goto("https://www.wanted.co.kr/wdlist/518/669", {
    waitUntil: "networkidle2",
  }) // 프론트엔드 페이지

  console.log("title", await page.title())

  await page.waitForSelector("[data-cy='job-card']")

  await scrollDown(page)
  const links = await getLinks(page)
  const countMap = new Map()
  for (let link of links) {
    await getRequirements(page, link, countMap)
  }

  await browser.close()
}

run()
