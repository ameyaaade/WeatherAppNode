const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiYW1leWFhYWRlIiwiYSI6ImNrYW5vNzA2NDBnNW4ycnFvcDdsc3MycjkifQ.Cu_Xakun2XMCE1zOrO6uKQ&limit=1`;
  request({ url, json: true }, (error, { body }) => {
    const { features } = body;
    if (error) {
      callback("Unable to connect to Geolocation Service ! ", undefined);
    }
    if (features.length === 0) {
      callback("No matching results found !", undefined);
    } else {
      callback(undefined, {
        longitude: features[0].center[1],
        latitude: features[0].center[0],
        location: features[0].place_name,
      });
    }
  });
};
module.exports = geocode;
