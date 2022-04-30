const request = require("request");

const geocode = function (address, apiKey, callback) {
  const encodedAddress = encodeURIComponent(address);
  const apiEndPoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${apiKey}&limit=1`;
  request({ url: apiEndPoint, json: true }, function (error, response) {
    if (error) {
      console.log(error);
      callback(error, undefined);
    } else if (response.body.features.length === 0) {
      callback("Location could not be found!", undefined);
    } else {
      callback(undefined, {
        longitude: response.body.features[0].center[0],
        latitude: response.body.features[0].center[1],
        location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = {
  geocode,
};
