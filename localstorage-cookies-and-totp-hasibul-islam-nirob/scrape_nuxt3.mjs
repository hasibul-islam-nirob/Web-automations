// nuxt3-lang.png

import puppeteer from "puppeteer";
import cookiesData from './cookiesData.json' assert {type : 'json'}
import fs from 'fs/promises';

(async () => {

    const browser = await puppeteer.launch({
        headless: true,
        slowMo: 20,
        userDataDir: "temporary",
    });
    const page = await browser.newPage();
    await page.setCookie(...cookiesData);

    await page.goto("https://nuxt3-realworld-example-app.vercel.app/", {waitUntil: 'networkidle0'});
    await page.waitForSelector('.preview-link');
    await page.screenshot({path: `nuxt3-lang.png`});
    

    const articles = await page.evaluate(() => {
        return [...document.querySelectorAll(".preview-link h1")].map(element => element.innerHTML);
    });

    console.log({articles});
    

    await browser.close();

})();