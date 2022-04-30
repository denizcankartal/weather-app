const request = require("request");

const weatherForecast = function (apiKey, longitude, latitude, callback) {
  const apiEndPoint = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${latitude},${longitude}`;
  request({ url: apiEndPoint, json: true }, function (error, response) {
    if (error) {
      callback(error, undefined);
    } else if (response.body.error) {
      callback(response.body.error.info, undefined);
    } else {
      callback(undefined, response.body.current.temperature);
    }
  });
};

module.exports = { weatherForecast };
