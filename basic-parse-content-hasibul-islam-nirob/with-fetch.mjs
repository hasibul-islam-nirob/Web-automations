import { log } from 'console'
import fs from 'fs/promises'

const targetUrl = 'https://rt-barberry.myshopify.com/collections/all/products/portable-bluetooth-speaker'

const targetFileName = 'portable-bluetooth-speaker-with-fetch.html'

const fileExist = async () => {
    try {
        await fs.access(targetFileName, fs.constants.F_OK)
        return true
    } catch (error) {
        return false
    }
}

if(!await fileExist()){
    console.log('Downloading file');
    const htmlCode = await fetch(targetUrl).then(data => data.text())
    fs.writeFile(targetFileName, htmlCode)
}

