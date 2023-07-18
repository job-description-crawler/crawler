import puppeteer from 'puppeteer'

export async function createBrowserInstance() {
    return await puppeteer.launch({
        args: ['--no-sandbox'], // Required.
        headless: true
    })
}

const browser = await createBrowserInstance()
const [page] = await browser.pages()
await page.goto('https://www.google.com', { waitUntil: 'networkidle2' })
console.log('title', await page.title())
await browser.close()