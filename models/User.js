const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// User Schema
const UserSchema = new Schema({
	name: {
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
	},
	watchHistory: {
		type: Array,
	},
	favorites: {
		type: Array,
	},
	watchingList: {
		type: Array,
	},
});

module.exports = User = mongoose.model("user", UserSchema);
