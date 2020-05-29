const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const app = express();

//Define paths for express config
const publicDir = path.join(__dirname, "../public/");
const viewsPath = path.join(__dirname, "../templates/views/");
const partialsPath = path.join(__dirname, "../templates/partials/");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDir));

// app.get("/help", (req, res) => {
//   res.render("help", {
//     helpText: "this is a help text",
//     title: "Help",
//     name: "Ameya",
//   });
// });

// app.get("/about", (req, res) => {
//   res.render("about", {
//     title: "About",
//     name: "Ameya",
//   });
// });

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Ameya",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "Error : Please provide address !" });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(longitude, latitude, (forecastError, forecastData) => {
        if (forecastError) {
          return res.send({ forecastError });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

// app.get("/product", (req, res) => {
//   if (!req.query.search) {
//     return res.send({
//       error: "You must provide a search tearm ",
//     });
//   }
//   console.log(req.query.name);
//   res.send({
//     products: [],
//   });
// });

// app.get("/help/*", (req, res) => {
//   res.render("404", {
//     title: "404",
//     errorMessage: "Article not found",
//     name: "Ameya",
//   });
// });
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Page not found ",
    name: "Ameya",
  });
});
app.listen(8080, () => {
  console.log(" Server is up ! ");
});
