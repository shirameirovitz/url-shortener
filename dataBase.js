const fs = require("fs");

class Url {
  constructor(originalUrl, shortUrl) {
    this.originalUrl = originalUrl;
    this.shortUrl = shortUrl;
    this.count = 0;
    this.date = new Date().toISOString().slice(0, 19).replace("T", " ");
  }
}

class DataBase {
  constructor() {
    this.urls = [];
  }
  addUrl(currentUrl) {
    for (let i = 0; i < this.urls.length; i++) {
      if (this.urls[i].originalUrl === currentUrl) {
        this.urls[i].count += 1;
        return this.urls[i].shortUrl;
      }
    }
    let newUrl = this.urls.push(new Url(currentUrl, shortUrl));
    return newUrl.shortUrl;
  }
  deleteUrl(originalUrl) {
    for (let i = 0; i < this.urls.length; i++) {
      if (this.urls[i].originalUrl === originalUrl) {
        this.urls.splice(i, 1);
      }
    }
  }
  findOriginalUrl(shortUrl) {
    for (let i = 0; i < this.urls.length; i++) {
      if (this.urls[i].shortUrl === shortUrl) {
        return this.urls[i].originalUrl;
      }
    }
  }
}

module.exports = { DataBase, Url };
