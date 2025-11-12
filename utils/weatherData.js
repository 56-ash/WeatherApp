const request = require("request");

const openWeatherMap = {
  BASE_URL: "https://api.openweathermap.org/data/2.5/weather?q=",
  SECRET_KEY: "21e141eaa9e555bdb19225fc1078f358",
};

const weatherData = (address, callback) => {
  const url =
    openWeatherMap.BASE_URL +
    encodeURIComponent(address) +
    "&APPID=" +
    openWeatherMap.SECRET_KEY;
  console.log(url);
  request({ url, json: true }, (error, data) => {
    if (error) {
      return callback(true, "Unable to fetch data, Please try again. " + error);
    }
   
    return callback(false, data?.body);
  });
};

module.exports = weatherData;
