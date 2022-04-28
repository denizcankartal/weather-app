const { geocode } = require("./utils/geocode");
const { weatherForecast } = require("./utils/weatherForecast");

const weatherApiKey = "2c656efd0abc6d2a2d2c8c1f2ef38cb6";
const temperatureUnit = "m";

const geocodingApiKey =
  "pk.eyJ1IjoiY3liZXJsb3JkMTIiLCJhIjoiY2wyamF0NmxkMDFkMDNjbzhiYzJqMTJndCJ9.0YcWmPs0SKUzjSaD3ONWdw";

const address = process.argv[2];

if (!address) {
  console.log("Please provide an address!");
  process.exit(21);
}

geocode(address, geocodingApiKey, function (error, data) {
  if (error) {
    console.log(error);
    return;
  }

  const { longitude, latitude, location } = data;
  weatherForecast(
    weatherApiKey,
    longitude,
    latitude,
    function (error, temperature) {
      if (error) {
        console.log(error);
        return;
      }
      console.log(`Temperature in ${location} is ${temperature}`);
    }
  );
});
