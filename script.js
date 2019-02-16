document.getElementById("weatherSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const value = document.getElementById("weatherInput").value;
  if (value === "")
    return;
  console.log(value);

  const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=APIKEY";
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {	
      console.log(json);
    });
});