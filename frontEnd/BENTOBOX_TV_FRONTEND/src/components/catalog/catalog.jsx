import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
	Card,
	CardImg,
	CardBody,
	CardTitle,
	CardSubtitle,
	CardHeader,
	Button,
} from "reactstrap";

class Catalog extends Component {
	state = {
		episodes: [],
		loaded: false,
		sort: true,
	};
	componentDidMount() {
		if (!this.state.loaded) {
			axios
				.get("/api/catalog")
				.then((res) =>
					this.setState({ episodes: [...res.data.videos], loaded: true })
				)
				.catch((err) => console.log("Couldn't Connect...", err));
		}
	}

	render() {
		let sortVideos = (array, sort) => {
			return array.sort((a, b) => {
				if (sort) {
					return a.episode - b.episode;
				} else {
					return b.episode - a.episode;
				}
			});
		};
		let renderVideos = (array) => {
			return sortVideos(this.state.episodes, this.state.sort).map(
				(episode, index, episodes) => {
					let nextEpisode = episodes[(index += 1)];
					let nextEpisodeId = "";
					if (nextEpisode) {
						nextEpisodeId = nextEpisode._id;
					}
					return (
						<Card
							key={episode._id}
							inverse
							style={{ backgroundColor: "#333", borderColor: "#333" }}
						>
							<CardHeader>
								<Link to={`/e/${episode._id}/${nextEpisodeId}`}>
									<CardTitle>{`${episode.name} ${episode.episode}`}</CardTitle>
								</Link>
							</CardHeader>
							<Link to={`/e/${episode._id}/${nextEpisodeId}`}>
								<CardImg top width="100%" src={episode.image} />
							</Link>
							<CardBody>
								<Button tag={Link} to={`/e/${episode._id}/${nextEpisodeId}`}>
									Watch Now!
								</Button>
							</CardBody>
						</Card>
					);
				}
			);
		};
		return (
			<div className="catalog-container">
				<div className="catalog-interaction-menu">
					<div className="catalog-interaction">
						<strong>Episodes</strong>
					</div>
				</div>
				<div className="catalog">
					{this.state.loaded ? renderVideos(this.state.episodes) : ""}
				</div>
			</div>
		);
	}
}

export default Catalog;
