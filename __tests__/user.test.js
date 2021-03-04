const request = require("supertest");
const app = require("../src/app");
const bcrypt = require("bcryptjs");
const dbHandlers = require("../test/dbHandler");

describe("users", () => {
  beforeAll(async () => await dbHandlers.connect());
  afterEach(async () => await dbHandlers.clearDatabase());
  afterAll(async () => await dbHandlers.closeDatabase());

  describe("POST /dumplings/users", () => {
    it("should create one new user", async () => {
      const user = { username: "admin123", password: "admin123" };
      const response = await request(app)
        .post("/dumplings/users")
        .send(user)
        .expect(201);
      // console.log(response.body);
      // console.log(user.password);
      // https://www.npmjs.com/package/bcrypt
      expect(response.body.username).toEqual(user.username);
      expect(
        await bcrypt.compare(user.password, response.body.password)
      ).toEqual(true);
    });
  });
});
