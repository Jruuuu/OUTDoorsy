$(document).ready(function () {
    // var ridbApiKey = "7771610e-244f-4e11-8ff0-59115fc17eb5";
    // var ridbQueryURL = "https://ridb.recreation.gov/api/v1/facilities?limit=50&offset=0&state=GA&activity=BOATING&sort=NAME&apikey=" + ridbApiKey;
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
    const modalBg = $(".modal-background")

    $("#modal-button").on('click', function () {
        modal.addClass('is-active');
    });

    modalBg.on('click', function () {
        modal.removeClass('is-active')
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
        const userChoiceURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${WeatherAPIKey}`;
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
                        <span><img src="https://openweathermap.org/img/w/${res.weather[0].icon}.png"/></span>
                    </h2>
                    <p>Temperature: ${Math.round(((parseInt(res.main.temp) - 273.15) * (9/5) + 32) * 10) / 10}\u00B0F</p>
                    <p>Humidity: ${res.main.humidity}%</p>
                    <p>Wind Speed: ${res.wind.speed}MPH</p>
                </div>
            `;
            //we convert the markup string into html then add it to the page
            $("#current-day").html(currentMarkUp);

            //the hiking trails of 
            console.log(res)
            const lat = (res.coord.lat)
            const lon = (res.coord.lon)
            const hikingKey = "200971209-f8aa46e467071360508bc929af7dda47"
            const hikingURL = `https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${lon}&maxDistance=10&key=${hikingKey}`
            $.ajax({
                url: hikingURL,
                method: "GET"
            }).then(function (resHike) {
                console.log(resHike);
                //trails buttons for loop the length of trails array in hike
                let trailsMarkUp ="";

                for (let i = 0; i < resHike.trails.length; i++) {
                    trailsMarkUp+=
                    `
                       <button class="destination button is-success is-hovered">${resHike.trails[i].name}</button>
                    <br>
                    `;
                    $(".left-message-body").html(trailsMarkUp);
                    
                    
                }
                var destinations = $(".destination");
                for (i = 0; i < destinations.length; i++) {
                    destinations[i].addEventListener("click", function(event) {
                        console.log(resHike.trails)
                        for (j = 0; j < resHike.trails.length; j++) {
                            if (event.target.textContent === resHike.trails[j].name) {
                                $(".title").text(resHike.trails[j].name);
                                $(".subtitle").text(resHike.trails[j].location);
                                $("#summary").text(resHike.trails[j].summary);
                                $("#main-img").attr("src", resHike.trails[j].imgMedium);
                            }
                        }
                    })
                }
            });

        });


    }

})

