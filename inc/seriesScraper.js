class SeriesScraper {
	constructor(url) {
		this.url = url;
		this.series = [];
		/*

        Get all series on the page

        */
		this.getSeries = async () => {
			let { url, series } = this;
			// Import puppeteer
			const puppeteer = require("puppeteer");
			// Launch puppeteer
			return await puppeteer
				.launch({
					headless: true,
					args: ["--no-sandbox", "--disable-setuid-sandbox"],
				})
				.then(async (browser) => {
					const page = await browser.newPage();
					await page.goto(url);
					// Grab all the necessary data
					let urls = await page.evaluate(() => {
						let links = [
							...document.querySelectorAll("#anime-grid li .anime-thumb"),
						];
						// Scrape the website for name, image, and link
						return links.map((item) => {
							// Construct into an object ( Make a class later )
							return {
								name: item.querySelector(".anime-name").innerText,
								link: `${document.location.origin}${
									item.querySelector("a").getAttribute["href"]
								}`,
								image: item.querySelector("img").getAttribute["src"],
							};
						});
					});
					await browser.close();
					return urls;
				});
		};
	}
}

module.exports = SeriesScraper;
