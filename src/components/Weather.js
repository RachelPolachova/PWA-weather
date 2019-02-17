import React from 'react';


class Weather extends React.Component {

	state = {
		temperatures: [],
		dates: [],
		city: this.props.city,
		favouriteCities: this.props.favouriteCities,
		hasData: false,
	};

	getWeather = async () => {
		// console.log("get Weather called!");
		const API_KEY = "321e4787765c65bde09141efd2385274";
		const city = this.state.city;
		// console.log("city in weather: " + city);
		const api_call = await fetch('https://api.openweathermap.org/data/2.5/forecast?q='+city+'&appid='+API_KEY+'&units=metric');
		const data = await api_call.json()



		// nicer way to insert data into array, problably loop?
		const tempArray = [data.list[0].main.temp, data.list[8].main.temp, data.list[16].main.temp, data.list[24].main.temp, data.list[32].main.temp];
		const dateArray = [data.list[0].dt_txt, data.list[8].dt_txt, data.list[16].dt_txt, data.list[24].dt_txt, data.list[32].dt_txt, ]
		if (city) {
			this.setState({
				temperatures: tempArray,
				dates: dateArray,
				city: city,
			})
		} else {
			this.setState({
				temperatures: [],
				dateArray: [],
				city: undefined,
			})
		}

		if (this.state.temperatures && this.state.temperatures.length > 0) {
			this.setState({
				hasData: true
			})
		}

	}

	componentDidMount() {

		if (this.state.city != null) {
			this.getWeather();
		}
	};

	makeFavourite = (e) => {

		let isFav = this.isFavourite  

		if (this.state.favouriteCities.indexOf(this.state.city) > -1) {
			console.log("Is already favourite! ")
			let newArray = this.state.favouriteCities.filter(city => city !== this.state.city)
			this.setState({
				favouriteCities: newArray
			})
			this.props.removeFromFavourite(this.state.city)
		}  else {
			console.log("is not favourite!")
			this.setState({
				favouriteCities: this.props.favouriteCities
			})
			this.props.addToFavourite(this.state.city)
		}
	}


	render() {

		let temps;

		if (this.state.temperatures) {
			temps = this.state.temperatures.map(temp => {
				return <p>{temp}</p>
			})

		}

		let dates;
		if (this.state.dates) {
			dates = this.state.dates.map(date => {
				return <p>{date}</p>
			})
		}

		let favCities = this.state.favouriteCities
		let city = this.state.city
		let makeFavourite = this.makeFavourite

		function MakeFavouriteButton() {
			return <button onClick={makeFavourite}><i class="far fa-heart">Favourite</i></button>;
		  }
		  
		  function DeleteFavouriteButton() {
			return <button onClick={makeFavourite}><i class="fas fa-heart">Unfavourite</i></button>;
		  }

		function IsFavouriteButton() {
			if (favCities.indexOf(city) > -1) {
				console.log("return deletefav")
				return <DeleteFavouriteButton />;	
			}
			console.log("return makefav")
			return <MakeFavouriteButton />;
		  }


		return (
				<div className="weather">
					<div className="container">
						<div className="item">
							{ this.state.city ? (
								<div>
									<div className="container">
										<div className="item">
											<h3>{this.state.city}</h3>
										</div>
										<div className="item">
											<IsFavouriteButton/>
										</div>
									</div>
								</div>
							) : (
								<h3>Please, insert city.</h3>
							)}
						</div>
					</div>
					
						{ this.state.hasData === true ? (
							<div className="container">
								<div className="item">
									<h3>Date</h3>
									<div>
										{dates}
									</div>
								</div>
								<div className="item">
									<h3>Temperatures</h3>
									<div>
										{temps}
									</div>
								</div>
							</div>

						) : (
							<p>No data.</p>
						) }
				</div>
		);
	}
}

export default Weather;
