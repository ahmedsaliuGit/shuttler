const supertest = require("supertest");
const server = require("../app");

describe("Sample test", () => {
  it("should show true === true", () => {
    expect(true).toBe(true);
  });
});

describe("Server request", () => {
  it("should show a hello message", async () => {
    const res = await supertest(server).get("/");
    expect(res.status).toBe(200);
    expect(res.text).toEqual("Hello, we are making the world better!");
  });

  it("should return object of distance in metre and kilometre", async () => {
    const res = await supertest(server)
      .post("/api/distance")
      .send({
        coordinates: [
          { latitude: 6.5015, longitude: 3.3581 },
          { latitude: 6.488, longitude: 3.3817 },
          { latitude: 6.5781, longitude: 3.3869 },
        ],
      });

    expect(res.status).toBe(200);
    expect(res.body.status).toBe("Ok");
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toStrictEqual([
      {
        metre: 3012,
        kilometre: 3.012,
      },
      {
        metre: 9103,
        kilometre: 9.103,
      },
    ]);
  });
});
