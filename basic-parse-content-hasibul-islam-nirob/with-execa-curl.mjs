import {$} from 'execa'

const targetUrl = 'https://rt-barberry.myshopify.com/collections/all/products/portable-bluetooth-speaker'

const targetFileName = 'portable-bluetooth-speaker-with-curl-execa.html'

await $`curl ${targetUrl} -o ${targetFileName}` // tad function
