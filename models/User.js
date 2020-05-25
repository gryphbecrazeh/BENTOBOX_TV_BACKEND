const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// User Schema
const UserSchema = new Schema({
	username: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	watchLater: {
		type: Array,
		default: [],
	},
	watchHistory: {
		type: Array,
		default: [],
	},
	favorites: {
		type: Array,
		default: [],
	},
	watchingList: {
		type: Array,
		default: [],
	},
});

module.exports = User = mongoose.model("user", UserSchema);
