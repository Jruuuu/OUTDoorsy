
console.log('Hello World')

var apiKey = "7771610e-244f-4e11-8ff0-59115fc17eb5";
var queryURL = "https://ridb.recreation.gov/api/v1/facilities?limit=50&offset=0&state=GA&activity=BOATING&sort=NAME&apikey=" + apiKey;

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {
    console.log("This is the response" + response);
    // console.log(response.RECDATA[0].FacilityDescription);
})

