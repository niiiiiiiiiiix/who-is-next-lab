const request = require("supertest");
const app = require("../src/app");
const bcrypt = require("bcryptjs");
const dbHandlers = require("../test/dbHandler");

describe("users", () => {
  beforeAll(async () => {
    await dbHandlers.connect();
  });
  afterEach(async () => await dbHandlers.clearDatabase());
  afterAll(async () => await dbHandlers.closeDatabase());

  describe("POST /dumplings/users", () => {
    it("should create one new user", async () => {
      const user = { username: "admin123", password: "admin123" };
      const { body } = await request(app)
        .post("/dumplings/users")
        .send(user)
        .expect(201);
      expect(body).toMatchObject(user);
      expect(await bcrypt.compare(user.password, body.password)).toEqual(true);
    });
  });
});
