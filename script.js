
document.getElementById("weatherSubmit").addEventListener("click", function(event) {
    event.preventDefault();
    const value = document.getElementById("weatherInput").value;
    if (value === "")
      return;
    console.log(value);
    const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=236526517ddcd7c8bff3c59b9e4cbba0";
    fetch(url)
      .then(handleErrors)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {	
        console.log(json);
        let results = "";
      results += '<h2>Weather in ' + json.name + "</h2>";
      for (let i=0; i < json.weather.length; i++) {
	results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
      }
      results += '<h2>' + json.main.temp + " &deg;F</h2> Humidity:" + json.main.humidity + "%"
      results += "<p>"
      for (let i=0; i < json.weather.length; i++) {
	results += json.weather[i].description
	if (i !== json.weather.length - 1)
	  results += ", "
      }
      results += "</p>";
      document.getElementById("weatherResults").innerHTML = results;
      }).catch(function(error){
          console.log(error);
      });
      const url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + "&APPID=236526517ddcd7c8bff3c59b9e4cbba0";
      fetch(url2)
        .then(function(response) {
          return response.json();
        }).then(function(json) {
          console.log(json);
          let forecast = "";
          let k = 0;
          for (let i=0; i < json.list.length; i++) {
              if (i % 4 ==0)
              {
                forecast+= "<div class=\"row\">";
              }
              forecast += "<div class=\"col-sm\"><h2>" + moment(json.list[i].dt_txt).format('MMMM Do YYYY, h:mm:ss a') + "</h2>";
              forecast += "<p>Temperature: " + json.list[i].main.temp + "&deg;F <br>  Wind: " + json.list[i].wind.speed +"MPH</p>";
              forecast += '<img src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/></div>';
              k = k + 1;
              if (k ==4)
              {
                  forecast+= "</div>";
                  k = 0;
              }
          }
          if (k != 0)
          {
              forecast += "</div>";
          }
          document.getElementById("forecastResults").innerHTML = forecast;
        });
  });

  function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}