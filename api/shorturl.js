const  = require("express");
const shortid = require("shortid");
const router = require("router");
const validUrl = require("valid-url");
const config = require("config");
const url = require("../dataBase");

const dataBase = url.DataBase();

function checkIfUrlExists(dataBase, currentUrl) {
    for(let i = 0; i < dataBase.length; i++) {
        if( dataBase[i].originalUrl === currentUrl ) {
            dataBase[i].count += 1;
            return dataBase[i].shortUrl;
        }
    }
    return false;
}
dataBase.post("/", async (req, res) => {
    const longUrl = req.body.longUrl;
    const baseUrl = config.get("api/shorturl/new");

    if ( !validUrl.isUri(baseUrl) ) {
        return res.status(401).json("Internal error. Please come back later.");
    }

    //make an original url id
    const urlCode = shortid.generate();

    //check if the original url is valid
    if ( validUrl.isUri(longUrl) ) {

        try {
            const urlExists = await checkIfUrlExists(dataBase ,longUrl);
            //check if url exists - if not adds new url to dataBase
            if (!urlExists) {
                const shortUrl = baseUrl + "/" + urlCode;
                urlExists  = dataBase.addUrl(longUrl, shortUrl);
                return res.status(201).json(urlExists);
            } else {
                //if url exists return exists shortUrl
                return res.status(200).json(urlExists);
            }

        } catch(err) {
            //server error
            console.error(err.message);
            return res.status(500).json("Internal Server error " + err.message);
        }
    } else {
        res.status(400).json("Invalid URL. Please enter a valid url for shortening.");
    }    
});

module.exports = shorturl;
