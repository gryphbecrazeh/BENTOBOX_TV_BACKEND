const VideoScraper = require("../inc/videoScraper.js");
const ScrapedCategory = require("../inc/scrapedCategory.js");

function getVideos(req, res, then) {
	let category = new ScrapedCategory(
		"https://ww5.dubbedanime.net/anime/47-naruto-shippuden"
	);
	category.getCategory();

	const URL =
		"https://ww5.dubbedanime.net/episode/186141-naruto-shippuden-episode-500-english-dubbed";

	// let video = new ScrapedVideo(URL);
	// video.getVideo().then((video) => res.send(video));
	if (then) {
		then();
	}
}

module.exports = getVideos;
