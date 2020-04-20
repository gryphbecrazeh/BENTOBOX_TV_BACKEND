const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const mongoose = require("mongoose");
const getVideos = require("./middleware/getVideos");
const path = require("path");

dotenv.config({ path: "./config/config.env" });

const app = express();

// Middleware
app.use(express.json());

// DB CONFIG
const DB = process.env.MONGO_URI;

// Connect to Mongo
mongoose
	.connect(DB, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	})
	.then(() => console.log("MongoDB Connected...".green.bold))
	.catch((err) => console.log(err));
app.use("/api/episode", require("./routes/api/episode.js"));
app.use("/api/catalog", require("./routes/api/catalog.js"));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
	// Set static folder
	// Test post
	app.use(express.static("frontEnd/BENTOBOX_TV_FRONTEND/build"));
	app.get("*", (req, res) => {
		res.sendFile(
			path.resolve(
				__dirname,
				"frontEnd",
				"BENTOBOX_TV_FRONTEND",
				"build",
				"index.html"
			)
		);
	});
}

const PORT = process.env.PORT || 5000;

app.listen(
	PORT,
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
	)
);
