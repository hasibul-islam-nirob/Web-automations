import puppeteer from 'puppeteer';

(async () => {

    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: { width: 1080, height: 1024 },
        slowMo: 50,
        userDataDir: "temporary",
    });

    const page = await browser.newPage();

    // your code here

    page.setDefaultNavigationTimeout(60000);

    try {
        await page.goto("https://duckduckgo.com", {
            waitUntil: "networkidle2",
        });

        await page.waitForSelector("#searchbox_input");
        await page.type("#searchbox_input", "hasibul islam nirob in github");
        await page.click("button[aria-label='Search']");

        const firstResultLink = await page.waitForSelector("[data-testid='result-title-a']");
        await firstResultLink.click();

        await page.waitForNavigation({ waitUntil: 'networkidle2' });
        await page.screenshot({ path: 'images/github_profile.png' });
    } catch (error) {
        console.error("Error:", error);
    } finally {
        await browser.close();
    }

})();
