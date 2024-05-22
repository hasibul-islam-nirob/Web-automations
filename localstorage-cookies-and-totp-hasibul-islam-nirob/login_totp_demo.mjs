
import puppeteer from "puppeteer";
import 'dotenv/config'
import {TOTP} from 'totp-generator';
import {setTimeout} from 'timers/promises';

(async () => {

    const browser = await puppeteer.launch({
        headless: false,
        // slowMo: 20,
        userDataDir: "temporary",
    });
    const page = await browser.newPage();
    await page.goto("https://clerk-next-demo-page.vercel.app/dashboard");

    // #identifier-field
    const idField = await page.waitForSelector('#identifier-field');
    // await idField.type(process.env.USERNAME);
    await idField.type("nirob+clerk_test@hinirob.com");

    // #password-field
    const passwordField = await page.waitForSelector('#password-field');
    await passwordField.type(process.env.PASSWORD);

    // .cl-formButtonPrimary
    const submitBtn = await page.waitForSelector('.cl-formButtonPrimary');
    await submitBtn.click();

    // .cl-otpCodeFieldInputs
    // const otpInputField = await page.waitForSelector('.cl-otpCodeFieldInputs');
    // const {otp, expires} = TOTP.generate(process.env.TOTP_SECRET);
    // await otpInputField.type(otp);

    async function typeOtp(){
        const otpInputField = await page.waitForSelector('.cl-otpCodeFieldInputs');
        const {otp, expires} = TOTP.generate(process.env.TOTP_SECRET);
        await otpInputField.type(otp);

        await page.waitForSelector('.cl-otpCodeFieldErrorText', {timeout: 3000})
        .then(async()=>{
            await setTimeout(3000)
            return typeOtp()
        })
        .catch(()=>{
            console.log("Login Success");
        })
    }
    typeOtp()

    await page.waitForSelector('.cl-userButtonBox');
    await page.screenshot({path: 'totp-demo.png'});
    
    await browser.close();

})();