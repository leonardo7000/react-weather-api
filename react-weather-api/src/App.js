import React, { Component } from "react";
import "./App.css";

import WeatherDisplay from './components/WeatherDisplay';

const PLACES = [
    { name: "Mexico City", zip: "94303" },
    { name: "Sunnyvale", zip: "94088" },
    { name: "Santa Cruz", zip: "95062" },
    { name: "Honolulu", zip: "96803" },
    { name: "Kouba", zip: "16093" }

];

class App extends Component {
    constructor() {
        super();
        this.state = {
            activePlace: 0,
            zip: '94303'
        };
    }

    fetchData = (cityName) => {
        const city = cityName || 'warsaw';
        const URL = "http://api.openweathermap.org/data/2.5/weather?q=" +
            city +
            "&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=imperial";
        fetch(URL).then(res => res.json()).then(json => {
            this.setState({weatherData: json});
            console.log(URL);
        });
    };

    componentDidMount() {
        this.fetchData()
    }

    updateSearch = (event) => {
        if(event.charCode === 13) {
            this.fetchData(event.target.value);
            event.target.value = '';
        }
    }

    render() {
        return (
            <div className="App">
          <input type="text"
                 placeholder='enter city name'
            onKeyPress={this.updateSearch}
            />
            {PLACES.map((place, index) => (
            <button
        key={index}
        onClick={() => {
            this.fetchData(PLACES[index].zip)
        }}
    >
        {place.name}
    </button>
    ))}
    <WeatherDisplay data={this.state.weatherData} />
        </div>
    );
    }
}

export default App;