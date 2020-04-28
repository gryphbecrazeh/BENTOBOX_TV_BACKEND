import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import {
	Card,
	CardImg,
	CardBody,
	CardTitle,
	CardSubtitle,
	CardHeader,
	Button,
	CardFooter,
} from "reactstrap";
let Episode = () => {
	const [video, setEpisode] = useState({});
	const [loaded, setLoaded] = useState(false);
	const { episodeID, nextEpisodeID } = useParams();
	useEffect(() => {
		if (!loaded) {
			axios.get(`/api/episode/?episode=${episodeID}`).then((res) => {
				console.log(res);
				setEpisode(res.data);
				setLoaded(true);
			});
		}
	});
	return (
		<div className="episode-container">
			<div className="column-left"></div>
			<div className="column-center">
				<Card
					inverse
					style={{
						backgroundColor: "#333",
						border: "#333",
					}}
				>
					<CardBody>
						{(() => {
							if (video.video != null) {
								console.log(video.video);
								return (
									<video
										width="100%"
										height="auto"
										controls
										autoPlay
										onEnded={() => {
											if (nextEpisodeID) {
												window.location = `/e/${nextEpisodeID}`;
											}
										}}
									>
										<source src={`${video.video}`}></source>
									</video>
								);
							} else {
								return <div>Loading...</div>;
							}
						})()}
					</CardBody>
					<CardFooter>
						<CardTitle>{`${video.name} ${video.episode}`}</CardTitle>
						<CardSubtitle>Subtitle</CardSubtitle>
					</CardFooter>
				</Card>
			</div>
			<div className="column-right"></div>
		</div>
	);
};
export default Episode;
