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
		const API_KEY = "321e4787765c65bde09141efd2385274";
		const api_call = await fetch('https://api.openweathermap.org/data/2.5/forecast?q='+city+'&appid='+API_KEY+'&units=metric');
		const apidata = await api_call.json()
		var newArr = this.state.temps
		newArr.push(apidata.list[0].main.temp)
		this.setState({
			temps: newArr
		})
	}

	onClick(index) {
		console.log("Clicked on: " + this.state.favouriteCities[index]);
		this.props.showCurrentCity(true)
		this.props.getCurrentCity(this.state.favouriteCities[index])
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

		}

		return(
			<MuiThemeProvider>
				<div>
					<h4>Find your city.</h4>
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
							<button onClick={this.handleClick}><i class="fas fa-search"></i></button>
						</div>
					</div>
					<div className="container">
						<div className="item">
							{this.state.favouriteCities.map((city, index) =>
								<div key={index} onClick={() => this.onClick(index)}>
									<p>{city}</p> 
								</div>
							)}
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
