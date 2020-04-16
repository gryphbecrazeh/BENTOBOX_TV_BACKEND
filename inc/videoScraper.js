class VideoScraper {
	constructor() {
		this.getVideo = async (url) => {
			let videoUrl;
			const puppeteer = require("puppeteer");

			return puppeteer.launch().then(async (browser) => {
				const page = await browser.newPage();
				page.on("response", (response) => {
					let resUrl = response["_url"];
					if (resUrl.match(/s.\.mp4\.sh\/\w+\//gim)) {
						videoUrl = resUrl;
					}
				});
				await page.goto(url);
				await browser.close();
				return await videoUrl;
			});
		};
	}
}

module.exports = VideoScraper;
