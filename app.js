const express = require("express");
const cors = require("cors");
const app = express();
const api = require("./api");
//const shortUrl = require("dataBase.js");

app.use(cors());
app.use("/api", api);

app.use("/public", express.static(`./public`));
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  try {
    res.sendFile(__dirname + "/views/index.html");
  } catch {
    res.status(404).send("page not found");
  }
});

module.exports = app;
