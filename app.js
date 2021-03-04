const express = require("express");
const cors = require("cors");
const app = express();
const api = require("./api");
const DataBase = require("./dataBase.js");
app.use(express.json());
app.use(express.urlencoded());
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
app.get("/:id", async (request, response) => {
  const { id } = request.params;
  let originalUrl = await DataBase.findOriginalUrl(id);
  if (!originalUrl) {
    return response.status(400).send("short ID cannot be found");
  }
  response.status(302).redirect(`${originalUrl}`);
});
module.exports = app;
