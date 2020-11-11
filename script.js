$(document).ready(function () {
    var ridbApiKey = "7771610e-244f-4e11-8ff0-59115fc17eb5";
    var ridbQueryURL = "https://ridb.recreation.gov/api/v1/facilities?limit=50&offset=0&state=GA&activity=BOATING&sort=NAME&apikey=" + ridbApiKey;
    const WeatherAPIKey = "5bb3a5739d78e8deccb5b36c764be06d";
    const storageInput = $(".storage");
    const storedInput = $("recent-searches");

    // On click of burger menu
    const navbarMenu = $("#nav-links")

    $("#burger-button").on('click', function () {
        navbarMenu.toggleClass('is-active')
    });

    // Modal

    const modal = $(".modal");

    $("#modal-button").on('click', function () {
        modal.addClass('is-active')
    })


    //On click of search button
    $("#search-button").on('click', function () {
        //get users input cityName
        const userInput = $("#search-text").val();
        //show all weather data
        getWeatherData(userInput);

        const saveToLocalStorage = function () {
            localStorage.setItem('textinput', JSON.stringify(userInput))
        };

        saveToLocalStorage();


        //create button template
        let btnMarkUp = `<button class="btn btn-dark rounded" "cityname="${userInput}">${userInput}</button>`;
        //add button to container for btns
        $("#recent-searches").html(btnMarkUp);
        //add event listener to it
        $(`[cityname="${userInput}]"`).on("click", getWeatherData(userInput));

    })
    const getWeatherData = (cityName) => {
        const userChoiceURL = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${WeatherAPIKey}`;
        //Pull Current Day data from weather api
        $.ajax({
            url: userChoiceURL,
            method: "GET"
        }).then(function (res) {
            console.log("current weather: ", res);

            //write the markup which is a string
            const currentMarkUp =
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
            $("#current-day").html(currentMarkUp);
        });
    }
})