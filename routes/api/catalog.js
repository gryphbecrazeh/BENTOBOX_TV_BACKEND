const express = require("express");
const router = express.Router();
const ScrapedCategory = require("../../inc/scrapedCategory");
const Video = require("../../models/Video");

// @route GET /api/catalog
// @desc get ALL videos from database
// @access PUBLIC
router.get("/", (req, res) => {
	Video.find()
		.sort({ episode: -1 })
		.then((items) => {
			return res.json({
				videos: items,
			});
		});
});

// @route POST /api/catalog
// @desc add videos to database
// @access PUBLIC
router.post("/", async (req, res) => {
	let { url } = req.body;
	if (!url) {
		return res.status(400).json({ msg: "URL not entered" });
	}
	let getValues = (url) => {
		let categoryObject = new ScrapedCategory(url);
		let res = categoryObject.getCategory();
		return res;
	};

	getValues(url).then((videos) => {
		videos.forEach((item) => {
			let { name, episode, link } = item;
			if (!name || !episode || !link) {
				return res.status(400).json({ msg: "Not all fields were available" });
			}
			let video = new Video({ ...item });
			Video.findOne(item)
				.then((foundVideo) => {
					if (foundVideo === null) {
						video.save();
					} else {
						Video.findOneAndUpdate(foundVideo._id, item)
							.then((updateRes) => console.log(updateRes))
							.catch((err) => {
								console.log(err);
							});
					}
				})
				.catch((err) => console.log(err));
		});
	});
	res
		.status(200)
		.json({ success: true, msg: "Videos successfully added to the DB" });
});

module.exports = router;
