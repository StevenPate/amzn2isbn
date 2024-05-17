import * as cheerio from 'cheerio';
import ISBN from 'isbn3'

export async function getISBN(amazonURL) {
    if (!/^https?:\/\//i.test(amazonURL)) {
        return "oops! that doesn't look like a url...";
    }
    if (decodeURI(amazonURL) !== amazonURL) {
        amazonURL = decodeURI(amazonURL);
    }

    const response = await fetch(amazonURL, {
        " User-Agent": 'Chrome/51.0.2704.103 Safari/537.36'
    });
    const $ = cheerio.load(await response.text());
    const $selected = $('#rpi-attribute-book_details-isbn13  .rpi-attribute-value').text();
    const isbn = ISBN.parse($selected)?.isValid ? ISBN.parse($selected)?.isbn13 : $selected
    return isbn
}