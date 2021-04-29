const app = require("express")();
const bodyParser = require("body-parser");
const geolib = require("geolib");

app.use(bodyParser.json()); // for parsing application/json

const port = 8081;

app.get("/", (req, res) => res.send("Hello, we are making the world better!"));
app.post("/api/distance", (req, res) => {
  const { coordinates } = req.body;
  const resData = [];

  const firstCoordinate = coordinates[0];
  const otherCordinates = coordinates.slice(1);

  otherCordinates.forEach((coord) => {
    let obj = {};
    obj.metre = geolib.getDistance(firstCoordinate, coord);

    if (obj.hasOwnProperty("metre") && obj.metre !== undefined) {
      obj.kilometre = geolib.convertDistance(obj.metre, "km");
      resData.push(obj);
    }
  });

  if (resData.length === 0) {
    return res.json({
      status: "Ok",
      message: "Distance not available at the moment. Please try again",
      data: resData,
    });
  }
  // Sorting by ascending order
  resData.sort((a, b) => a.kilometre - b.kilometre);

  return res.json({ status: "Ok", message: "Success", data: resData });
});

app.listen(port, () => console.log(`Server started on port:: ${port} .`));
