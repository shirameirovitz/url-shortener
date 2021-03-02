const fsPromises = require("fs").promises;
const shortId = require("shortid");

const url = {};

class Url {
  constructor(originUrl) {
    this.redirectCount = 0;
    this.originUrl = originUrl;
    this.shortUrlId = Date.now();
    this.createDate = new Date().toISOString().slice(0, 19).replace("T", " ");
  }
}


module.exports = Url;
