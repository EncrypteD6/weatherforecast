import { useState } from "react";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (e) => {
    if (e.key === "Enter") {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
      )
        .then((res) => {
          if (res.ok) {
            res.json();
          } else {
            const err = new Error("not ok");
            err.res = res;
            throw err;
          }
        })
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        })
        .catch((err) => {
          if (err.res.status == 404) {
            alert("City not found");
            setQuery("");
          }
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date},${month},${year}`;
  };

  return (
    <div className="App">
      <main>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search...."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div>{weather.name}</div>
              <br />
              <div>{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">{Math.round(weather.main.temp)}°C</div>
            <div className="weather-type">{weather.weather[0].main}</div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
