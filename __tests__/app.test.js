const request = require("supertest");
const app = require("../src/app");

describe("App", () => {
  const win = {
    0: "GET    /",
    1: "GET    /dumplings",
    2: "POST   /dumplings",
    3: "GET    /dumplings/:name",
    4: "PUT    /dumplings/:id",
    5: "DELETE /dumplings/:id",
    6: "-----------------------",
    7: "GET    /dumplings/presenter",
  };

  it("GET / should respond with all possible endpoints", async () => {
    const { body } = await request(app).get("/").expect(200);
    expect(body).toMatchObject(win);
  });

  it("GET /dumplings should respond with empty array since no dumplings added", async () => {
    const { body } = await request(app).get("/dumplings").expect(200);
    expect(body).toMatchObject([]);
  });

  it("POST /dumplings should respond with the newly added dumpling", async () => {
    const newDumpling = { name: "xxx" };
    const { body } = await request(app)
      .post("/dumplings")
      .send(newDumpling)
      .expect(201);
    expect(body).toMatchObject(newDumpling);
  });

  it("GET /dumplings should show newly added dumpling", async () => {
    const newDumpling = { name: "xxx" };
    const { body } = await request(app).get("/dumplings").expect(200);
    expect(body).toMatchObject([newDumpling]);
  });
});
