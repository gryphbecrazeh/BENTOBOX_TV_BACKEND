class ScrapedCategory {
	constructor(url) {
		this.url = url;
		this.videos = [];
		/*

        Get all episdoes on the page

        */
		this.getCategory = async () => {
			let { url, videos } = this;
			// Import puppeteer
			const puppeteer = require("puppeteer");
			// Import ScrapedVideo
			const VideoScraper = require("./videoScraper");
			// Launch puppeteer
			return await puppeteer
				.launch({
					headless: true,
					args: ["--no-sandbox", "--disable-setuid-sandbox"],
				})
				.then(async (browser) => {
					const page = await browser.newPage();
					await page.setViewport({ width: 1920, height: 1080 });
					await page.goto(url);
					// Grab all the necessary data
					let urls = await page.evaluate(() => {
						let links = [
							...document.querySelectorAll("#episodes-grid li.da-tbl"),
						];
						// Scrape the website for name, image, and link
						return links.map((item) => {
							let number = item
								.querySelector(".ep-num")
								.innerText.replace(/EP\ /gim, "");
							let image = item.querySelector("a img").getAttribute("src");
							let link = item.querySelector("a").getAttribute("href");
							let name = item.querySelector(".da-tbl-text").innerText;

							// Construct into an object ( Make a class later )
							return {
								name: name,
								link: `${document.location.origin}${link}`,
								image: image,
								episode: Number(number),
							};
						});
					});
					await browser.close();
					return urls;
				});
		};
	}
}

module.exports = ScrapedCategory;
