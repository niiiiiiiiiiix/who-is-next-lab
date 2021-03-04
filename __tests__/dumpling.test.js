const request = require("supertest");
const app = require("../src/app");
const Dumpling = require("../src/models/dumpling.model");
const dbHandlers = require("../test/dbHandler");
const createJWTToken = require("../src/config/jwt");

describe("dumplings", () => {
  let token;

  const dumplingsData = [
    {
      name: "Prawn",
    },
    {
      name: "Pork",
    },
  ];

  beforeAll(async () => {
    await dbHandlers.connect();
    token = createJWTToken("user.username");
  });

  beforeEach(async () => {
    await Dumpling.create(dumplingsData);
  });
  afterEach(async () => await dbHandlers.clearDatabase());
  afterAll(async () => await dbHandlers.closeDatabase());

  describe("GET /dumplings", () => {
    it("should retrieve list of dumplings", async () => {
      const { body } = await request(app).get("/dumplings").expect(200);
      expect(body.length).toEqual(2);
    });
  });

  describe("GET /dumplings/presenter", () => {
    it("should return a random dumpling", async () => {
      const { body } = await request(app)
        .get("/dumplings/presenter")
        .expect(200);
      console.log(Object.keys(body));
      expect(Object.keys(body).length).toEqual(3);
    });
  });

  describe("GET /dumplings/:name", () => {
    it("should retrieve dumpling with requested name", async () => {
      const { body } = await request(app).get("/dumplings/Prawn").expect(200);
      expect(body.name).toEqual("Prawn");
    });
  });

  describe("POST /dumplings", () => {
    it("should respond with the newly added dumpling if fields are valid and authorised", async () => {
      const newDumpling = { name: "Fish" };
      const response = await request(app)
        .post("/dumplings")
        .send(newDumpling)
        .set("Cookie", `token=${token}`);
      expect(response.status).toBe(201);
      expect(response.body).toMatchObject(newDumpling);
    });
    it("should throw error if authorised but name is empty", async () => {
      const response = await request(app)
        .post("/dumplings")
        .send({ name: "" })
        .set("Cookie", `token=${token}`);
      expect(response.status).toBe(400);
    });

    it("should throw error if authorised but name is too short", async () => {
      const response = await request(app)
        .post("/dumplings/")
        .send({ name: "AB" })
        .set("Cookie", `token=${token}`);
      console.log(response.status);
      expect(response.status).toBe(400);
    });
    it("should throw error if request body is not json ", async () => {
      const response = await request(app)
        .post("/dumplings/")
        .send("notJSON")
        .set("Cookie", `token=${token}`);
      expect(response.status).toBe(400);
    });
    it("should throw error if unauthorised", async () => {
      const newDumpling = { name: "Snail" };
      const response = await request(app).post("/dumplings/").send(newDumpling);
      expect(response.status).toBe(401);
    });
  });

  describe("PUT /dumplings/:id", () => {
    it("should modify dumpling if fields are valid and authorised", async () => {
      const dumpling = await Dumpling.findOne({ name: "Prawn" });
      const response = await request(app)
        .put(`/dumplings/${dumpling.id}`)
        .send({ name: "Tiger Prawn" })
        .set("Cookie", `token=${token}`);
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({ name: "Tiger Prawn" });
    });

    it("should throw error if authorised but name is empty", async () => {
      const dumpling = await Dumpling.findOne({ name: "Prawn" });
      const response = await request(app)
        .put(`/dumplings/${dumpling.id}`)
        .send({ name: "" })
        .set("Cookie", `token=${token}`);
      expect(response.status).toBe(400);
    });

    it("should throw error if authorised but name is too short", async () => {
      const dumpling = await Dumpling.findOne({ name: "Prawn" });
      const response = await request(app)
        .put(`/dumplings/${dumpling.id}`)
        .send({ name: "AB" })
        .set("Cookie", `token=${token}`);
      expect(response.status).toBe(400);
    });

    it("should throw an error if authorised but dumpling does not exist", async () => {
      const response = await request(app)
        .put(`/dumplings/603f572adeadad44d8ea23b0`)
        .send({ name: "Cheese" })
        .set("Cookie", `token=${token}`);
      expect(response.status).toBe(400);
    });

    it("should throw error if authorised but request body is not json ", async () => {
      const dumpling = await Dumpling.findOne({ name: "Prawn" });
      const response = await request(app)
        .put(`/dumplings/${dumpling.id}`)
        .send("notJSON")
        .set("Cookie", `token=${token}`);
      expect(response.status).toBe(400);
    });

    it("should throw error if unauthorised", async () => {
      const dumpling = await Dumpling.findOne({ name: "Prawn" });
      const response = await request(app)
        .put(`/dumplings/${dumpling.id}`)
        .send({ name: "Tiger Prawn" });
      expect(response.status).toBe(401);
    });
  });

  describe("DELETE /dumplings/:id", () => {
    it("should delete dumpling if exist", async () => {
      const dumpling = await Dumpling.findOne({ name: "Prawn" });
      const response = await request(app)
        .delete(`/dumplings/${dumpling.id}`)
        .set("Cookie", `token=${token}`);
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({ name: "Prawn" });
    });

    it("should throw an error if authorised but dumpling does not exist", async () => {
      // const dumpling = await Dumpling.findOne({ name: "notDumpling" }); // returns null
      const response = await request(app)
        .delete(`/dumplings/603f572adeadad44d8ea23b0`)
        .set("Cookie", `token=${token}`);
      expect(response.status).toBe(400);
    });

    it("should throw error if unauthorised", async () => {
      const dumpling = await Dumpling.findOne({ name: "Pork" });
      const response = await request(app).delete(`/dumplings/${dumpling.id}`);
      expect(response.status).toBe(401);
    });
  });
});
