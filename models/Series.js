const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Series Schema
const SeriesSchema = new Schema({
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
});

module.exports = Series = mongoose.model("series", SeriesSchema);
