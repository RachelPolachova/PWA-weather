import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import data from './data';

class Home extends React.Component {


	state = {
		city: null,
		shouldOpenList: false,
		cities: data.cities,
		favouriteCities: this.props.favouriteCities,
		temps: []
	}

	updateCity = (value) => {
		this.setState({
			city: value
		});
		console.log(value)
	};

	/*
		Home.js
		handleClick is called after clicking on button "get weather"
		this.props.getCurrentCity calls method declared in App.js -> parameter is from Home.js state
	*/

	handleClick = (e) => {
		e.preventDefault;
		this.props.showCurrentCity(true)
		this.props.getCurrentCity(this.state.city)
	}

	getFavouriteWeather = async() => {

		if (this.state.favouriteCities && this.state.favouriteCities.length > 0) {
			for (var i = 0; i < this.state.favouriteCities.length; i++) {
				console.log( "i: " + i + "city: " + this.state.favouriteCities[i] );
				this.apiCall(this.state.favouriteCities[i])
			}
		}

	}

	apiCall = async (city) => {
		console.log("get Weather called!");
		const API_KEY = "321e4787765c65bde09141efd2385274";
		// const city = this.state.city;
		console.log("city in weather: " + city);
		const api_call = await fetch('https://api.openweathermap.org/data/2.5/forecast?q='+city+'&appid='+API_KEY+'&units=metric');
		const apidata = await api_call.json()
		var newArr = this.state.temps
		newArr.push(apidata.list[0].main.temp)
		this.setState({
			temps: newArr
		})
	}

	componentDidMount() {
		// console.log( this.state.favouriteCities );
		this.getFavouriteWeather()
	}

	render() {

		let temps;

		if (this.state.temps) {
			temps = this.state.temps.map(temp => {
				return <p>{temp}</p>
			})

		} else {
			console.log("empy temps.")
		}

		let favCities;

		if (this.state.favouriteCities) {
			favCities = this.state.favouriteCities.map(city => {
				return <p>{city}</p>
			})
		}

		return(
			<MuiThemeProvider>
				<div>
					<h3>Insert city</h3>
					<div className="container">
						<div className="item">
							<AutoComplete
								floatingLabelText="City"
								filter={AutoComplete.fuzzyFilter}
								dataSource={this.state.cities}
								maxSearchResults={5}
								onUpdateInput={this.updateCity}
							/>
						</div>
						<div className="item">
							{/* Home.js button get weather */}
							<button onClick={this.handleClick}>Search</button>
						</div>
					</div>
					<div className="container">
						<div className="item">
							{favCities}
						</div>
						<div className="item">
							{temps}
						</div>
					</div>
				</div>
			</MuiThemeProvider>
		)
	}
};

export default Home;
