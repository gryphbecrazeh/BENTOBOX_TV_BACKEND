class VideoScraper {
	constructor() {
		this.getVideo = async (url) => {
			let videoUrl;
			const puppeteer = require("puppeteer");
			console.log("launching puppeteer");
			return puppeteer
				.launch({
					headless: true,
					args: ["--no-sandbox", "--disable-setuid-sandbox"],
				})
				.then(async (browser) => {
					console.log("puppeteerlaunched");
					const page = await browser.newPage();
					page.on("response", (response) => {
						if (videoUrl == null) {
							let resUrl = response["_url"];
							let status = response["_status"];
							if (resUrl.match(/s.\.mp4\.sh\/\w+\//gim) && status == "206") {
								console.log(resUrl);

								videoUrl = resUrl;
							}
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
