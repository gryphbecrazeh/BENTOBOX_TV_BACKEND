const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const https = require("https");
// @route GET /api/catalog
// @desc get ALL videos from database
// @access PUBLIC
router.get("/:id", (req, res) => {});

// @route POST /api/catalog
// @desc add videos to database
// @access PUBLIC
router.post("/", async (req, res) => {
	let { username, email, password } = req.body;
	console.log(req);
	if (!username || !email || !password) {
		res.status(400).json({ msg: "Missing Username, Email, or Password" });
		return 0;
	}
	res.status(200).json({ msg: `${username}` });
});

module.exports = router;