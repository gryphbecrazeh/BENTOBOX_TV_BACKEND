const express = require("express");
const router = express.Router();
const VideoScraper = require("../../inc/videoScraper");
const Video = require("../../models/Video");

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
				Video.findByIdAndUpdate(episode, { video: link }).catch((err) => {
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

// @route POST /api/catalog
// @desc add videos to database
// @access PUBLIC
router.post("/", async (req, res) => {
	res.status(404);
});

module.exports = router;
