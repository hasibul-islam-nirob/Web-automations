
import {JSDOM} from "jsdom";
import fs from 'fs/promises';

const htmlContent = await fs.readFile("portable-bluetooth-speaker-with-curl-execa.html", 'utf-8')

const dom = new JSDOM(htmlContent)
const {document} = dom.window

// console.log(dom.window.document);
const price = document.querySelector('div.product-single.container > div > div:nth-child(2) > div > div.product-single__bottom p > span> span > span').textContent.trim()
// const price = document.querySelector('div.product-single.container > div > div:nth-child(2) > div > div.product-single__bottom p > span> span > span').innerHTML.trim()
// const price = document.querySelector('div.product-single.container > div > div:nth-child(2) > div > div.product-single__bottom p > span> span > span').innerText.trim()

console.log({price});


// #shopify-section-template--14132842102884__product-template> div.ProductSection-template--14132842102884__product-
// template.product__2246988726372.product-template_container.no-overlap.content-area> div.product-single.container > div > div:nth-child(2) > div div.product-single_bottom pspan> span > span