class Url {
  constructor(originUrl) {
    this.redirectCount = 0;
    this.originUrl = originUrl;
    this.shortUrlId = Date.now();
    this.createDate = new Date().toISOString().slice(0, 19).replace("T", " ");
  }
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
