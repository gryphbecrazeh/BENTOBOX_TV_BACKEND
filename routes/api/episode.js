const express = require("express");
const router = express.Router();
const VideoScraper = require("../../inc/videoScraper");
const Video = require("../../models/Video");
const fs = require("fs");
const https = require("https");
// @route GET /api/catalog
// @desc get ALL videos from database
// @access PUBLIC
router.get("/", (req, res) => {
	let { episode } = req.query;
	Video.findById(episode)
		.then((ep) => {
			// if (!ep.video) {
			let scraper = new VideoScraper();
			scraper.getVideo(ep.link).then((link) => {
				const file = fs.createWriteStream("/tmp/video.mp4");
				const request = https.get(link, (videoRes) => videoRes.pipe(file));
				Video.findByIdAndUpdate(episode, { video: link })
					.then(() => {
						console.log("updated");
					})
					.catch((err) => {
						console.log(err);
						res.status(400).json({ msg: "Unable to update file..." });
					});
				res.status(200).json({ ...ep, video: link });
			});
			// } else {
			// res.status(200).json(ep);
			// }
		})
		.catch((err) => console.log(err));
});
// router.get("/", (req, res) => {
// 	let { episode } = req.query;
// 	Video.findById(episode)
// 		.then((ep) => {
// 			console.log("found video");
// 			if (!ep.video) {
// 				console.log("video doesn't have raw url");
// 				let scraper = new VideoScraper();
// 				scraper.getVideo(ep.link).then((link) => {
// 					console.log("scraped video");
// 					Video.findByIdAndUpdate(episode, { video: link }).catch((err) => {
// 						res.status(400).json({ msg: "Unable to update file..." });
// 					});
// 					res.status(200).json({ ...ep, video: link });
// 				});
// 			} else {
// 				res.status(200).json(ep);
// 			}
// 		})
// 		.catch((err) => console.log(err));
// });

// @route POST /api/catalog
// @desc add videos to database
// @access PUBLIC
router.post("/", async (req, res) => {
	res.status(404);
});

module.exports = router;
