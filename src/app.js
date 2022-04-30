const express = require("express");
const path = require("path");
const hbs = require("hbs");
const { request } = require("http");

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

app.get("/about", (request, response) => {
  response.render("about", {
    title: "ABOUT",
    img: "img/cat.png",
    name: "Deniz",
  }); // render the template
});

app.get("/help", (request, response) => {
  response.render("help", {
    title: "HELP",
    message: "you cannot get any help here!",
    name: "Deniz",
  });
});

app.get("/weather", (request, response) => {
  let jsonResponse;
  if (!request.query.address) {
    jsonResponse = {
      error: "Please provide an address!",
    };
  } else {
    jsonResponse = {
      address: request.query.address,
    };
  }
  response.send(jsonResponse); // serving JSON, when the argument to the send method is an object, express directly stringifies that object to send the object as a JSON
});

app.get("/help/*", (request, response) => {
  response.render("404", {
    title: "Not Found",
    errorMessage: "help article not found",
    name: "Deniz",
  });
});

app.get("/products", (request, response) => {
  if (!request.query.search) {
    response.send({
      error: "provide a search field",
    });
    return;
  }
  console.log(request.query);

  response.send({
    products: [],
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
app.listen(3005, () => {
  console.log("Server started to listen on port 3005");
});
