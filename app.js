const request = require("request");

const apiKey = "2c656efd0abc6d2a2d2c8c1f2ef38cb6";
const langitude = 37.8267;
const longitude = -122.4233;
const apiEndPoint = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${langitude},${longitude}`;
console.log(apiEndPoint);

request({ url: apiEndPoint }, (error, response) => {
  try {
    if (error) {
      throw new Error(error);
    }
    const data = JSON.parse(response.body);
    console.log(data);
  } catch (err) {
    console.error(err.message);
  }
});
