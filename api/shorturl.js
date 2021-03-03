//shortening the URL
const express = require("express");
const shortid = require("shortid");
const router = require("router");
const validUrl = require("valid-url");
const config = require("config");
const shortUrlRoute = express.Router();
const url = require("../dataBase");

const dataBase = url.DataBase();

function checkIfUrlExists(dataBase, currentUrl) {
    for(let i = 0; i < dataBase.length; i++) {
        if( dataBase[i].originalUrl === currentUrl ) {
            dataBase[i].count += 1;
            return dataBase[i].shortUrl;
        }
    }
}
shortUrlRoute.post("/", async (req, res) => {
    const longUrl = req.body.longUrl;
    const baseUrl = config.get("baseURL");

    //check if the url is valid
    if ( !validUrl.isUri(baseUrl) ) {
        return res.status(401).json("Internal error. Please come back later.");
    }

    const urlCode = shortid.generate();

    if ( validUrl.isUri(longUrl) ) {

        try {
            const urlExists = await checkIfUrlExists(dataBase ,longUrl);
            if (url) {
                return  res.status(200).json(urlExists);
            } else {

                const shortUrl = baseUrl + "/" + urlCode;
                urlExists  = new Url({});
                
                await urlExists.save()
                return res.status(201).json(urlExists);
            }
        } catch(err) {
            console.error(err.message);
            return res.status(500).json("Internal Server error " + err.message);
        }
    } else {
        res.status(400).json("Invalid URL. Please enter a valid url for shortening.");
    }    
});

module.exports = shortUrlRoute;
// route.post("/new", async (req, res) => {
//     const longUrl = req.body.longUrl;
//     const baseUrl = config.get("baseURL");
//     if (!validUrl.isUri(baseUrl)) {
//       return res.status(401).json("Internal error. Please come back later.");
//     }
// module.exports = route;
