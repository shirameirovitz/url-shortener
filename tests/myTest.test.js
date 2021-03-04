const app = require("../app");
const request = require("supertest");
const fs = require("fs");
const { items } = require("../dataBase");

describe("POST route", () => {
  it("should post a new short id successfully", async () => {
    const response = await request(app)
      .post("/api/shorturl/new")
      .type("form")
      .send({ url: "https://www.youtube.com/" });

    expect(response.status).toBe(200);
  });
  it("should return an error for invalid url", async () => {
    const response = await request(app)
      .post("/api/shorturl/new")
      .type("form")
      .send({ url: "6" });

    expect(response.status).toBe(400);
  });
});

describe("GET route", () => {
  const expectedItem = [
    {
      originalUrl: "https://github.com/",
      shortUrl: "qj8VT-kKy",
      count: 3,
      date: "2021-03-04 10:08:17",
    },
  ];
  it("should return a OriginalUrl by a short Id", async () => {
    const response = await request(app).get("/qj8VT-kKy");

    // is the status code 200
    expect(response.status).toBe(302);
  });
  it("should an error with status 404 for not found url", async () => {
    const response = await request(app).get("/1111");

    //is the status 404
    expect(response.status).toBe(404);
  });
});
