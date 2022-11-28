// Contributions: https://github.com/sylviaprabudy/weather-dashboard
// Contibutions: https://github.com/mmeii/weather-dashboard

//API Call
//api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

$(function () {

    //ID elements
    const CITYENTER = document.getElementById("enterCity");
    const SEARCHBTN = document.getElementById("searchBtn");
    const NEWSEARCH = document.getElementById("newSearch");
    const NAMECITY = document.getElementById("cityName");
    const CURRENTPIC = document.getElementById("weatherPic");
    const CURRENTTEMPERATURE = document.getElementById("temperature");
    const CURRENTHUMIDITY = document.getElementById("humidity");
    const CURRENTWIND = document.getElementById("wind");
    const SAVEDSEARCH = document.getElementById("searchedLast");
    
    //variables
    var fiveDay = document.getElementById("fiveDay");
    var todayWeather = document.getElementById("todayWeather");
    var todayWeatherTitle = document.getElementById("TodayWeatherTitle");
    var lastSearchedTitle = document.getElementById("lastSearchedTitle");
    let searchHistory = JSON.parse(localStorage.getItem("search")) || [];

    //API - 60 calls per minute max
    const APIKEY = "9e19c11c5ae2513b934cad2837eb6265";

    function displayTimeTop() {
        $("#currentDay").text(dayjs().format("dddd - MMMM D, YYYY hh:mm:ss A"));
      }

      function setWeather(cityName) {
        let weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKEY;
        axios.get(weatherURL)
            .then(function (response) {

                todayWeather.classList.remove("d-none");
                todayWeatherTitle.classList.remove("d-none");
                lastSearchedTitle.classList.remove("d-none");

                // Parse API to display current weather
                const CURRENTDATE = new Date(response.data.dt * 1000);
                const SETDAY = CURRENTDATE.getDate();
                const SETMONTH = CURRENTDATE.getMonth() + 1;
                const SETYEAR = CURRENTDATE.getFullYear();
                NAMECITY.innerHTML = response.data.name + " (" + SETMONTH + "/" + SETDAY + "/" + SETYEAR + ") ";
                let weatherPic = response.data.weather[0].icon;
                CURRENTPIC.setAttribute("src", "https://openweathermap.org/img/wn/" + weatherPic + "@2x.png");
                CURRENTPIC.setAttribute("alt", response.data.weather[0].description);
                CURRENTTEMPERATURE.innerHTML = "Temperature: " + kelvinFahrenheit(response.data.main.temp) + " &#176F";
                CURRENTHUMIDITY.innerHTML = "Humidity: " + response.data.main.humidity + "%";
                CURRENTWIND.innerHTML = "Wind Speed: " + response.data.wind.speed + " MPH";
                
                // Get 5 day forecast
                let cityID = response.data.id;
                let forecastFiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&appid=" + APIKEY;
                axios.get(forecastFiveDayURL)
                    .then(function (response) {
                        fiveDay.classList.remove("d-none");
                        
                        //  Parse API to display forecast for next 5 days
                        const FORECASTCARDS = document.querySelectorAll(".forecast");
                        for (i = 0; i < FORECASTCARDS.length; i++) {
                            FORECASTCARDS[i].innerHTML = "";
                            const FORECASTINDEX = i * 8 + 4;
                            const FORECASTDATE = new Date(response.data.list[FORECASTINDEX].dt * 1000);
                            const FORECASTDAY = FORECASTDATE.getDate();
                            const FORECASTMONTH = FORECASTDATE.getMonth() + 1;
                            const FORECASTYEAR = FORECASTDATE.getFullYear();
                            const FORCASTDATECOMBINED = document.createElement("p");
                            FORCASTDATECOMBINED.setAttribute("class", "mt-3 mb-0 forecast-date");
                            FORCASTDATECOMBINED.innerHTML = FORECASTMONTH + "/" + FORECASTDAY + "/" + FORECASTYEAR;
                            FORECASTCARDS[i].append(FORCASTDATECOMBINED);

                            // Icon for current weather
                            const WEATHERICON = document.createElement("img");
                            WEATHERICON.setAttribute("src", "https://openweathermap.org/img/wn/" + response.data.list[FORECASTINDEX].weather[0].icon + "@2x.png");
                            WEATHERICON.setAttribute("alt", response.data.list[FORECASTINDEX].weather[0].description);
                            FORECASTCARDS[i].append(WEATHERICON);
                            const FORECASTTEMP = document.createElement("p");
                            FORECASTTEMP.innerHTML = "Temp: " + kelvinFahrenheit(response.data.list[FORECASTINDEX].main.temp) + " &#176F";
                            FORECASTCARDS[i].append(FORECASTTEMP);
                            const FORECASTHUMIDITY = document.createElement("p");
                            FORECASTHUMIDITY.innerHTML = "Humidity: " + response.data.list[FORECASTINDEX].main.humidity + "%";
                            FORECASTCARDS[i].append(FORECASTHUMIDITY);
                            const FORECASTWIND = document.createElement("p");
                            FORECASTWIND.innerHTML = "Wind: " + response.data.list[FORECASTINDEX].wind.speed + "MPH";
                            FORECASTCARDS[i].append(FORECASTWIND);
                        }
                    })
            });
    }

    // Get history from local storage
    SEARCHBTN.addEventListener("click", function () {
        const SAVEDSEARCH = CITYENTER.value;
        setWeather(SAVEDSEARCH);
        searchHistory.push(SAVEDSEARCH);
        localStorage.setItem("search", JSON.stringify(searchHistory));
        setSearchHistory();
    })

    // Clear History button
    NEWSEARCH.addEventListener("click", function () {
        localStorage.clear();
        searchHistory = [];
        setSearchHistory();
        location.reload();
    })

    function kelvinFahrenheit(K) {
        return Math.floor((K - 273.15) * 1.8 + 32);
    }

    function setSearchHistory() {
        SAVEDSEARCH.innerHTML = "";
        for (let i = 0; i < searchHistory.length; i++) {
            const SAVEDITEM = document.createElement("input");
            SAVEDITEM.setAttribute("type", "text");
            SAVEDITEM.setAttribute("readonly", true);
            SAVEDITEM.setAttribute("class", "form-control d-block bg-white btn");
            SAVEDITEM.setAttribute("value", searchHistory[i]);
            SAVEDITEM.addEventListener("click", function () {
                setWeather(SAVEDITEM.value);
            })
            SAVEDSEARCH.append(SAVEDITEM);
        }
    }

    setSearchHistory();
    if (searchHistory.length > 0) {
        setWeather(searchHistory[searchHistory.length - 1]);
    }

      setInterval(displayTimeTop, 1000);
});