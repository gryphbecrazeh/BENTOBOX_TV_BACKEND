import React from "react";
import "./App.scss";
import NavBar from "./components/navbar/navbar";
import Catalog from "./components/catalog/catalog";
import Episode from "./components/episode/episode";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
function App() {
	return (
		<Router>
			<div className="App">
				<header className="App-header">
					<NavBar />
				</header>
				<Switch>
					<Route exact path="/"></Route>
					<Route path="/catalog">
						<Catalog />
					</Route>
					<Route
						exact
						path="/e/:episodeID"
						render={(props) => <Episode {...props} />}
					/>
					<Route
						exact
						path="/e/:episodeID/:nextEpisodeID"
						render={(props) => <Episode {...props} />}
					/>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
