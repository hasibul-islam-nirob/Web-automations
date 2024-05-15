
import puppeteer from 'puppeteer';
import fs from 'fs/promises';

const htmlContent = await fs.readFile("portable-bluetooth-speaker-with-fetch.html", 'utf-8')

const browser = await puppeteer.launch();

const page = await browser.newPage();

await page.setContent(htmlContent);

const price  = await page.evaluate(()=>{
    return document.querySelector('div.product-single.container > div > div:nth-child(2) > div > div.product-single__bottom p > span> span > span').textContent.trim();
});

console.log({price});

await browser.close();