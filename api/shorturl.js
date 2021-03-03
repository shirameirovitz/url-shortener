const express = require("express");
const shortid = require("shortid");
const validUrl = require("valid-url");
const url = require("../dataBase");

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded());
const dataBase = url.DataBase;
const DB = new dataBase();

router.get("/:id", (request, response) => {
  try {
    const { id } = request.params;
    if (validUrl.isUri(id)) {
      response.status(200).json({ id });
    } else {
      response.status(400).json({
        message: "Invalid URL. Please enter a valid url for shortening.",
      });
    }
    // let body = fs.readFileSync(`./backend/bins/${id}.json`, {encoding:'utf8', flag:'r'});
    // body = JSON.parse(body);
    // response.status(200).json(body);
  } catch (e) {
    response
      .status(500)
      .json({ message: "Internal Server Error!", error: `${e}` });
  }
});

router.post("/new", (request, response) => {
  try {
    const { url } = request.body;
    //make an original url id
    const urlCode = shortid.generate();
    DB.addUrl(url, urlCode);
    response
      .status(200)
      .json({ original_url: `${url}`, short_url: `${urlCode}` });
  } catch (e) {
    response
      .status(500)
      .json({ message: "Internal Server Error!", error: `${e}` });
  }
});

module.exports = { router };
