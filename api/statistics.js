const express = require("express");
const { request, response } = require("../app.js");
const DataBase = require("../dataBase.js");

const statistics = express.Router();
statistics.use(express.json());
statistics.use(express.urlencoded());


statistics.get("/", (request, response) => {
    try {
   const urls = DataBase.items
   response.status(200).json(urls)
    } catch(e){
        response.status(500).json({ message: "Internal Server Error!", error: `${e}` });
    }
});


module.exports = statistics