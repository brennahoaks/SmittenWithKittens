document.getElementById("smittenSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const url = "https://aws.random.cat/meow";
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log(json);

      let results = "";

    results += '<img src=' + json.file + '>';

    document.getElementById("Kittens").innerHTML = results;
    });


});
