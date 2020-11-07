$(document).ready(function () {

    var ridbApiKey = "7771610e-244f-4e11-8ff0-59115fc17eb5";
    var ridbQueryURL = "https://ridb.recreation.gov/api/v1/facilities?limit=50&offset=0&state=GA&activity=BOATING&sort=NAME&apikey=" + ridbApiKey;


    const WeatherAPIKey = "5bb3a5739d78e8deccb5b36c764be06d";

    let searchHistory = JSON.parse(localStorage.getItem("searchHistory"));
    if (searchHistory === null) {
        searchHistory = [];
    }

    //Check for cities searched in local storage and display in city list container
    // if (searchHistory == "") {


    //On click of search button
    $("#search-button").on('click', function () {
        // $("#right-container").removeClass('hidden');
        //get users input cityName
        const userInput = $("#search-text").val();
        //show all weather data
        getWeatherData(userInput);
        //store in local
        searchHistory.push(userInput);
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));

        //render button
        //use the local data array search history and render buttons
        for (let i = 0; i < searchHistory.length; i++) {
            //create button tempalte
            let btnMarkUp = `<button class="btn btn-dark rounded" "cityname="${searchHistory[i]}">${searchHistory[i]}</button>`;
            //add button to container for btns
            $("#cities-list").html(btnMarkUp);
            //add event listener to it
            $(`[cityname="${searchHistory[i]}]"`).on("click", getWeatherData(searchHistory[i]));
        }
    });

    const getWeatherData = (cityName) => {
        const userChoiceURL = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${WeatherAPIKey}`;
        //Pull Current Day data from weather api
        $.ajax({
            url: userChoiceURL,
            method: "GET"
        }).then(function (res) {

            console.log("current weather: ", res);
            //Check if user input is valid city if not alert "enter a valid city name"
            //Display Current Day Data: Temp, Humidity, Wind Speed, UV

            //wrtie th markup which is a string
            const curentMarkUp =
                `
                <div id="current-day" class="border rounded">
                    <h2>
                        <span>${res.name}</span>
                        <span>(${new Date().toLocaleDateString()})</span>
                        <span><img src="http://openweathermap.org/img/w/${res.weather[0].icon}.png"/></span>
                    </h2>
                    <p>Temperature: ${res.main.temp}F</p>
                    <p>Humidity: ${res.main.humidity}%</p>
                    <p>Wind Speed: ${res.wind.speed}MPH</p>
                </div>
            `;

            //we convert the markup string into html then add it to the page
            $("#current-day").html(curentMarkUp);

        });
    }

})

// $.ajax({
//     url: ridbQueryURL,
//     method: "GET"
// }).then(function (response) {
//     console.log("This is the response" + response);
//     // console.log(response.RECDATA[0].FacilityDescription);
// });

