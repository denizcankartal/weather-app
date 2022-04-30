const express = require("express");
const path = require("path");
const hbs = require("hbs");
const { geocode } = require("./utils/geocode");
const { weatherForecast } = require("./utils/weatherForecast");

const app = express();

// define paths for express config
const publicDirPath = path.join(__dirname, "../public");
const viewsDirPath = path.join(__dirname, "../templates/views");
const partialsDirPath = path.join(__dirname, "../templates/partials");

// setup handlebars engine and views path location
app.set("view engine", "hbs"); // set the view engine
app.set("views", viewsDirPath); // set the default views path as viewsDirPath
hbs.registerPartials(partialsDirPath);

// setup static public directory to serve static content
app.use(express.static(publicDirPath));

app.get("", (request, response) => {
  response.render("index", {
    title: "Weather App",
    name: "Deniz",
  }); // render the template
});

app.get("/weather", (request, response) => {
  const weatherApiKey = "2c656efd0abc6d2a2d2c8c1f2ef38cb6";
  const geocodingApiKey =
    "pk.eyJ1IjoiY3liZXJsb3JkMTIiLCJhIjoiY2wyamF0NmxkMDFkMDNjbzhiYzJqMTJndCJ9.0YcWmPs0SKUzjSaD3ONWdw";

  if (!request.query.address) {
    response.send({
      error: "Please provide an address!",
    }); // serving JSON, when the argument to the send method is an object, express directly stringifies that object to send the object as a JSON
    return;
  }
  geocode(
    request.query.address,
    geocodingApiKey,
    (err, { longitude, latitude, location } = {}) => {
      if (err) {
        response.send({ error: err });
        return;
      }
      weatherForecast(
        weatherApiKey,
        longitude,
        latitude,
        (err, temperature) => {
          if (err) {
            response.send({ error: err });
            return;
          }
          response.send({
            location: location,
            temperature: temperature,
          });
        }
      );
    }
  );
});

app.get("/weather/*", (request, response) => {
  response.render("404", {
    title: "Not Found",
    errorMessage: "end point not found",
    name: "Deniz",
  });
});

app.get("*", (request, response) => {
  // 404 page
  response.render("404", {
    title: "Not Found",
    errorMessage: "page not found",
    name: "Deniz",
  });
});
app.listen(3000, () => {
  console.log("Server started to listen on port 3000");
});
