import "./App.css";
import { logo } from "./assets/img/imports";
import React, { useEffect, useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (navigator.geolocation) {
        try {
          if (city) {
            const response = await fetch(
              `${process.env.REACT_APP_API_URL}/weather?q=${city}&APPID=${process.env.REACT_APP_API_KEY}&units=metric`
            );
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
    
            const data = await response.json();
            setData(data);
          
          } else {
            const position = await new Promise((resolve, reject) => {
              navigator.geolocation.getCurrentPosition(resolve, reject);
            });
    
            const lat = position.coords.latitude;
            const long = position.coords.longitude;
            const response = await fetch(
              `${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
            );
  
    
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
    
            const data = await response.json();
            setData(data);          
          }
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };
  
    fetchData();
  }, [city]);

  return (
    <div className="App">
      <header className="App-header">
        <h4>Weather App</h4>
        <div className="App-logo">
          <img src={logo}></img>
        </div>
      </header>
      <main className="main-body">
        <div className="content">
          <div className="principal">
            <div className="input-wrapper">
            <input
                placeholder="Enter a city name"
                type="text"
                name="city"
                className="cityInput"
                autoComplete="off"
                value={city} // Bind input value to city state
                onChange={(e) => setCity(e.target.value)} // Update city state on change
              />
            </div>
            <center className="data">
            {weatherData? (
            <div className="weatherData">
              <h1>{weatherData.name}</h1>
              <p>Main Temperature: {weatherData.main.temp}°C</p>
              <p>Feels Like: {weatherData.main.feels_like}°C</p>
              <p>Minimum Temperature: {weatherData.main.temp_min}°C</p>
              <p>Maximum Temperature: {weatherData.main.temp_max}°C</p>
              <p>Pressure: {weatherData.main.pressure} hPa</p>
              <p>Visibility: {weatherData.visibility} meters</p>
              <p>Wind Speed: {weatherData.wind.speed} m/s</p>
              <p>Cloud Cover: {weatherData.clouds.all}%</p>
            </div>
          ) : (
            <p>Loading...</p>
          )}</center>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
