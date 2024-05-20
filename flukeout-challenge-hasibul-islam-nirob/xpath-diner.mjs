import puppeteer from 'puppeteer';
import fs from 'fs/promises';
import answers from './xpath-answers.json' with {type : 'json'}

(async () => {

    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 20,
        userDataDir: "temporary",
    });
    const page = await browser.newPage();
    await page.goto("https://topswagcode.com/xpath/");

    const resetBtn = await page.waitForSelector(".reset-progress");
    await resetBtn.click();
    await page.reload();
    
    for (let [key, answer] of answers.entries()) {
        
        await page.waitForSelector(".level-header:not(.completed)");
        const answerArea = await page.waitForSelector(".input-strobe", {visible: true});
        await answerArea.type(answer, {delay : 100});
        await page.keyboard.press("Enter");
        await page.waitForSelector(".level-header.completed");
        await page.screenshot({path: `xpath_images/xpath_${key}.png`});


        const localStorageData = await page.evaluate(()=>{
            return Object.assign({}, window.localStorage);
        })

        await fs.writeFile(
            "xpathLocalStorageData.json",
            JSON.stringify(localStorageData)
        );
        
    }

    

    await browser.close();
})();