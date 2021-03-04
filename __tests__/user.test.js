const request = require("supertest");
const app = require("../src/app");
const bcrypt = require("bcryptjs");
const dbHandlers = require("../test/dbHandler");

describe("users", () => {
  beforeAll(async () => await dbHandlers.connect());

  afterAll(async () => {
    await dbHandlers.clearDatabase();
    await dbHandlers.closeDatabase();
  });

  describe("POST /users", () => {
    it("should create one new user", async () => {
      const user = { username: "admin123", password: "admin123" };
      const response = await request(app).post("/users").send(user);
      // console.log(response.body);
      // console.log(user.password);
      // https://www.npmjs.com/package/bcrypt
      expect(response.status).toEqual(201);
      expect(response.body.username).toEqual(user.username);
      expect(
        await bcrypt.compare(user.password, response.body.password)
      ).toEqual(true);
    });
    it("should not allow a duplicate username to be created", async () => {
      const user = { username: "admin123", password: "admin123" };
      const response = await request(app).post("/users").send(user);
      expect(response.status).toEqual(406);
    });
    it("should not allow a username with special characters", async () => {
      const user = { username: "admin123!", password: "admin123" };
      const response = await request(app).post("/users").send(user);
      expect(response.status).toEqual(406);
    });
    it("should not allow a username under 8 characters", async () => {
      const user = { username: "admin1", password: "admin123" };
      const response = await request(app).post("/users").send(user);
      expect(response.status).toEqual(406);
    });
  });
});
