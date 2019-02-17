import React from 'react';
import Weather from './components/Weather';
import Navigation from './components/Navigation';
import Home from "./components/Home";
// import ls from 'local-storage';

class App extends React.Component {

	favouriteCities = []

	state = {
		viewCurrentCity: true,
		city: null
	}

	showCurrentCity = (bool => {
		this.setState({
			viewCurrentCity: bool
		})
	});

	getCurrentCity = (city => {
		this.setState({
			city:city
		})
	})

	addToFavourite = (favouriteCity => {
		console.log("addToFavorite in app.js called!")
		this.favouriteCities.push(favouriteCity)
		console.log( "fav cities:" + this.favouriteCities );
		localStorage.removeItem('test')
		localStorage.setItem('test', JSON.stringify(this.favouriteCities))
		console.log( "Get item: " + JSON.parse(localStorage.getItem('test')) );
	})

	removeFromFavourite = (favouriteCity => {
		console.log("Deleting " + favouriteCity + " from favourites.")
		let newArray = this.favouriteCities.filter(city => city !== favouriteCity)
		this.favouriteCities = newArray
		localStorage.removeItem('test')
		localStorage.setItem('test',JSON.stringify(this.favouriteCities))
	})

	componentDidMount() {
		console.log("if null, then []")
		console.log( JSON.parse(localStorage.getItem('test')) );
		let favCities = JSON.parse(localStorage.getItem('test'));
		if (favCities == null || favCities == undefined) {
			console.log('were null || undefined')
			this.favouriteCities = []
		} else {
			this.favouriteCities = favCities
		}
		this.setState({
			viewCurrentCity: false
		})
	}

	render() {
		return (
				<div>
					{ this.state.viewCurrentCity ? (
						<div>
							<Navigation showCurrentCity={this.showCurrentCity}/>
							<Weather city={this.state.city} addToFavourite={this.addToFavourite} removeFromFavourite={this.removeFromFavourite} favouriteCities={this.favouriteCities}/>
						</div>
					) : (
						<div>
							<h3>Home.</h3>
							<Home showCurrentCity={this.showCurrentCity} getCurrentCity={this.getCurrentCity} favouriteCities={this.favouriteCities}/>
						</div>
					) }
				</div>
		);
	}
}

export default App;
