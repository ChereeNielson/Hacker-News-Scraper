// Hackerbot image of the day API call

$.ajax({
    url: "api/nasa/images",
    method: "GET"
  }).then(function(response) {
    var pictureOfTheDay = response.url;
    console.log(pictureOfTheDay);
    $("#nasaImage").attr("src", pictureOfTheDay);
  });
  