const express = require("express");
const shortid = require("shortid");
const validUrl = require("valid-url");
const DataBase = require("../dataBase.js");

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded());

router.post("/new", async (request, response) => {
  const url = request.body.url;

  if (!validUrl.isUri(url)) {
    response.status(400).json({
      message: "Invalid URL. Please enter a valid url for shortening.",
    });
  } else {
    try {
      let shortUrl = await DataBase.addUrl(url);
      response.status(200).json({ message: shortUrl });
    } catch (e) {
      response
        .status(500)
        .json({ message: "Internal Server Error!", error: `${e}` });
    }
  }
});

router.get("/:id", async (request, response) => {
  const { id } = request.params;
  let originalUrl = await DataBase.findOriginalUrl(id);
  response.redirect(`${originalUrl}`);
});

module.exports = { router };
