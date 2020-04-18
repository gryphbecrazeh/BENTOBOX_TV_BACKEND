const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Video Schema
const VideoSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	link: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		required: false,
	},
	episode: {
		type: Number,
		required: true,
	},
	video: {
		type: String,
		required: false,
	},
});

module.exports = Video = mongoose.model("video", VideoSchema);
