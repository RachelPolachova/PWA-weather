import React from 'react';
import Weather from './components/Weather';
import Navigation from './components/Navigation';
import Home from "./components/Home";

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

	/*
		App.js
		setting state of App.js as method's parameter city
	*/
	getCurrentCity = (city => {
		this.setState({
			city:city
		})
	})

	addToFavourite = (favouriteCity => {
		this.favouriteCities.push(favouriteCity)
		console.log( "fav cities:" + this.favouriteCities );
		// localStorage.setItem('test', JSON.stringify(this.favouriteCities))
		console.log( "Get item: " + JSON.parse(localStorage.getItem('test')) );
	})

	componentDidMount() {
		// console.log( JSON.parse(localStorage.getItem('test')) );
		// this.favouriteCities = JSON.parse(localStorage.getItem('test'));
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
							<h1>weather!</h1>
							{/* Passing city from App.js state to weather component */}
							<Weather city={this.state.city} addToFavourite={this.addToFavourite}/>
						</div>
					) : (
						<div>
							<h1>home</h1>
							{/* Passing methods getCurrentCity and showCurrent city (declared in App.js)
							to Home component */}
							<Home showCurrentCity={this.showCurrentCity} getCurrentCity={this.getCurrentCity} favouriteCities={this.favouriteCities}/>
						</div>
					) }
				</div>
		);
	}
}

export default App;
