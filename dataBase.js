const fs = require("fs");
class Url {
  constructor(originalUrl, shortUrl) {
    this.originalUrl = originalUrl;
    this.date = dateSql();
    this.count = 0;
    this.shortUrl = shortUrl;
  }
}

function dateSql() {
  let date = new Date();
  date =
    date.toISOString().split("T")[0] + " " + date.toTimeString().split(" ")[0];
  return date;
}

class DataBase {
  constructor() {
    this.urls = [];
  }
  addUrl(originalUrl, shortUrl) {
    this.urls.push(new Url(originalUrl, shortUrl));
  }
  deleteUrl(originalUrl) {
    for (let i = 0; i < this.urls.length; i++) {
      if (this.urls[i].originalUrl === originalUrl) {
        this.urls.splice(i, 1);
      }
    }
  }
}

module.exports = DataBase;
module.exports = Url;
