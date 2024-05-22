// mint-lang.png

import puppeteer from "puppeteer";
import localStorageData from './localStorageData.json' assert {type : 'json'}
import fs from 'fs/promises';

(async () => {

    const browser = await puppeteer.launch({
        headless: true,
        slowMo: 20,
        userDataDir: "temporary",
    });
    const page = await browser.newPage();

    await page.evaluateOnNewDocument((localStorageData)=>{
        localStorage.setItem('user', localStorageData.user)
    }, localStorageData)

    await page.goto("https://realworld.mint-lang.com/", {waitUntil: 'networkidle0'});
    await page.waitForSelector('a[href^="/article/"]');
    await page.screenshot({path: `mint-lang.png`});

    const articles = await page.evaluate(() => {
        return [...document.querySelectorAll(".x")].map(element => element.innerHTML);
    });

    console.log({articles});



    await browser.close();

})();