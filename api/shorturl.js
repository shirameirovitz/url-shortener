const express = require("express");
const shortid = require("shortid");
const validUrl = require("valid-url");
const url = require("../dataBase");

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded());
const dataBase = url.DataBase;
const DB = new dataBase();

router.get("/:shorurl", (request, response) => {
    const { shorturl } = request.params;
    DB.
});

router.post("/new", (request, response) => {
    const { url } = request.body;

    if (validUrl.isUri(url)) {
        response.status(200).json({ url });
      } else {
        response.status(400).json({
          message: "Invalid URL. Please enter a valid url for shortening.",
        });
      }
  try {
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
