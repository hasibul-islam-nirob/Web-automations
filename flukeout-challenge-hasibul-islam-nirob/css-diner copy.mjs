import puppeteer from 'puppeteer';
import fs from 'fs/promises';
import answers from './css_answers.json' with {type : 'json'}

(async () => {

    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 50,
        userDataDir: "temporary",
    });
    const page = await browser.newPage();
    await page.goto("https://flukeout.github.io/");

    const resetBtn = await page.waitForSelector(".reset-progress");
    await resetBtn.click();
    await page.waitForTimeout(500);
    await page.evaluate(() => {
        window.scrollTo(0, 0);
    });
    await page.waitForTimeout(500);
    
    for (let [key, answer] of answers.entries()) {

        await page.waitForSelector(".level-header:not(.completed)");
        const answerArea = await page.waitForSelector(".input-strobe", {visible: true});
        await answerArea.type(answer, {delay : 100});
        await page.keyboard.press("Enter");
        await page.waitForSelector(".level-header.completed");
        await page.screenshot({path: `css_images/css_${key}.png`});


        const localStorageData = await page.evaluate(()=>{
            return Object.assign({}, window.localStorage);
        })

        await fs.writeFile(
            "cssLocalStorageData.json",
            JSON.stringify(localStorageData)
        );
        
    }

    

    await browser.close();
})();