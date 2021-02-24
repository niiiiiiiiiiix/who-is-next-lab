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
    expect(body).toEqual(win);
  });
});
