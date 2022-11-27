//API Call
//api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

//example of API Call
//api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid={API key}

// //user story
// AS A traveler
// I WANT to see the weather outlook for multiple cities
// SO THAT I can plan a trip accordingly

//acceptance criteria
// GIVEN a weather dashboard with form inputs

// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history

// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, 
// the temperature, the humidity, and the the wind speed

// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, 
// the temperature, the wind speed, and the humidity

// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

//technical acceptance
// Uses the OpenWeather API to retrieve weather data
// Uses localStorage to store persistent data


//credits: https://github.com/mmeii/weather-dashboard

//credits: https://github.com/sylviaprabudy/weather-dashboard




$(function () {

    function displayTimeTop() {
        $("#currentDay").text(dayjs().format("dddd MMMM D, YYYY hh:mm:ss A"));
      }













      setInterval(displayTimeTop, 1000);

});