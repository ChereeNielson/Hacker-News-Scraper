// ＨＡＣＫＥＲＳＢＯＴ @Hackers_bot
// https://twitter.com/Hackers_bot  

$.ajax({
    url: "api/nasa/images",
    method: "GET"
  }).then(function(response) {
    var pictureOfTheDay = response.url;
    console.log(pictureOfTheDay);
    $("#nasaImage").attr("src", pictureOfTheDay);
  });


  // JS Path: document.querySelector('#stream-item-tweet-1106894415686193153 > div.tweet.js-stream-tweet.js-actionable-tweet.js-profile-popup-actionable.dismissible-content.original-tweet.js-original-tweet.has-cards.has-content')
  // Embedded Tweets: 
  