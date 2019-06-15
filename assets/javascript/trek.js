//setting vars for user input as well as query's for apis
var userInput;
var currentLocation;
var queryYelp;
var queryNYT;
var querySky;
var queryWeather;

//first hiding divs
//when we click on the submit button and get a result, we will show divs
$("#eventsSection").hide();
$("#foodSection").hide();
$("#travelSection").hide();
$("#weatherForecast").hide();

//a function to update weather
//if we get a response from the data base, we call this function
function updateWeather(weatherData){
    var weatherTemp = ((weatherData.main.temp-273.15)* 1.80 + 32);
    var weatherSky = weatherData.weather[0].main;
    var weatherIcon = weatherData.weather[0].icon;
    console.log(weatherSky);
    $("#weatherHeader").text("Weather Forecast for " +userInput);
    $("#tempText").text(Math.round(weatherTemp)+ " ºF ");
    $("#tempText").append("<img src=https://openweathermap.org/img/w/"+weatherIcon+".png>");
    $("#weatherForecast").show();
}

//a function to update flights
//if we get a response from the data base, we call this function
function updateSky(skyData){

}

//a function to update NYT
//if we get a response from the data base, we call this function
function updateNYT(nytData){
    for(var i =0; i<4; i++){
        var article = nytData.response.docs;
        $("#travelURL"+i).attr("href", nytData.response.docs[i].web_url);
        $("#headTravel"+i).text(nytData.response.docs[i].headline.main);

    }

    $("#travelSection").show();
}

function updateYelpFood(yelpData){
    for(var i=0; i<yelpData.businesses.length ; i++){
        //set rb as response.businesses
        var rb = yelpData.businesses[i];
        //set variables from the API to the variables
        var name = rb.name;
        var price = rb.price;
        var rating = rb.rating; 
        var yelpLink = rb.url;
        var picture = rb.image_url;

        $("#cardFoodImage"+i).attr("src", picture);
        $("#cardFoodLink"+i).attr("href", yelpLink);
        $("#cardFoodTitle"+i).text(name);
        $("#foodPrice"+i).text(price);
        $("#foodRating"+i).text(rating);
        }
    
    $("#foodSection").show();
}

function updateYelpEvent(yelpEvent){
    console.log(yelpEvent);
            //console data from yelp
            
            console.log(yelpEvent.events[1].name);
            console.log(yelpEvent.events[1].description);
            console.log(yelpEvent.events[1].is_free);
            console.log(yelpEvent.events[1].event_site_url);
            for(var j=0; j<yelpEvent.events.length ; j++){
            
            //  set rt as response.businesses
            var rt = yelpEvent.events[j];
            //set variables from the API to the variables
            var nameEvent = rt.name;
            var description = rt.description;
            var free = rt.is_free;
            var eventUrl = rt.event_site_url;
            var imageEvent = rt.image_url;
            $("#eventImage"+i).attr("src", imageEvent);
            $("#eventURL"+i).attr("href", eventUrl);
            $("#eventTitle"+i).text(nameEvent);
            $("#descEvent"+i).text(description);
            $("#freeEvent"+i).text("Is the event free? " +nameEvent);


            console.log(nameEvent);
            console.log(description);
            console.log(free);
            console.log(eventUrl);
            }

    $("#eventsSection").show();
        }




//When a button is clicked, we want to grab that value and use that value to search our apis
$("button").on("click", function() {
    console.log("in button click");
    //we want to get the users input
    //we do that by getting the id of the input and then the val
    userInput = $("#searchInput").val().trim();
    console.log(userInput);

    //next we want to set a query's
    queryWeather = "https://api.openweathermap.org/data/2.5/weather?q="+userInput+",US&appid=e921e4ee26a025090f4ff9b62f27ad89";
    // querySky = "Whatever the url is"+userInput+"api key";
    queryNYT = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q="+userInput+"&fq=headline:(36 hours "+userInput+")&fq=section_name:(Travel)&api-key=vMdLSfd0YAZw8KWXtnoXqszuA5lKGB1T";
    queryYelpFood= "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location="+userInput+"&limit=2"
    queryYelpEvents = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/events?location="+userInput+"&limit=3";
    //next we are going to call our api's
    //using a ajax call, we call our url and methond
    //when we get a response, we update each section;
    $.ajax({
        url: queryWeather,
        method: "GET"
    }).then(updateWeather);
    
    $.ajax({
        url: querySky,
        method: "GET"
    }).then(updateSky);

    $.ajax({
        url: queryNYT,
        method: "GET"
    }).then(updateNYT);

    $.ajax({
        url: queryYelpFood,
        headers: {
            'Authorization':'Bearer 2ozrOdoM-iqGVuP5uozgiBk6CunvT4pCllsN7PdRctZR63EopSt0ZruMP-E6Xiv7YOzffRRDGwVqUUwMLjVdKlYk_n49Q9d7WpshV0LSbgThn9oclFErTIuS14ECXXYx',
           },
        method: "GET"
    }).then(updateYelpFood);
   

    $.ajax({
        url: queryYelpEvents,
        headers: {
            'Authorization':'Bearer 2ozrOdoM-iqGVuP5uozgiBk6CunvT4pCllsN7PdRctZR63EopSt0ZruMP-E6Xiv7YOzffRRDGwVqUUwMLjVdKlYk_n49Q9d7WpshV0LSbgThn9oclFErTIuS14ECXXYx',
           },
        method: "GET"
    }).then(updateYelpFood);
});