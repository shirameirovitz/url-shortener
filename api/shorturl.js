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

//   //check if the original url is valid
//   if (validUrl.isUri(longUrl)) {
//     try {
//       const urlExists = await checkIfUrlExists(dataBase, longUrl);
//       //check if url exists - if not adds new url to dataBase
//       if (!urlExists) {
//         const shortUrl = baseUrl + "/" + urlCode;
//         urlExists = dataBase.addUrl(longUrl, shortUrl);
//         return res.status(201).json(urlExists);
//       } else {
//         //if url exists return exists shortUrl
//         return res.status(200).json(urlExists);
//       }
//     } catch (err) {
//       //server error
//       console.error(err.message);
//       return res.status(500).json("Internal Server error " + err.message);
//     }
//   } else {
//     res.status(400).json({
//       message: "Invalid URL. Please enter a valid url for shortening.",
//     });
//   }
// });

module.exports = { router };
