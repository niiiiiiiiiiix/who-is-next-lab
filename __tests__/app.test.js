const request = require("supertest");
const app = require("../src/app");
const Dumpling = require("../src/models/dumpling.model");
const dbHandlers = require("../test/dbHandler");

describe("dumplings", () => {
  // const win = {
  //   0: "GET    /",
  //   1: "GET    /dumplings",
  //   2: "POST   /dumplings",
  //   3: "GET    /dumplings/:name",
  //   4: "PUT    /dumplings/:id",
  //   5: "DELETE /dumplings/:id",
  //   6: "-----------------------",
  //   7: "GET    /dumplings/presenter",
  // };

  // it("GET / should respond with all possible endpoints", async () => {
  //   const { body } = await request(app).get("/").expect(200);
  //   expect(body).toMatchObject(win);
  // });

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
    it("should respond with the newly added dumpling", async () => {
      const newDumpling = { name: "Fish" };
      const { body } = await request(app)
        .post("/dumplings")
        .send(newDumpling)
        .expect(201);
      expect(body).toMatchObject(newDumpling);
    });
  });

  describe("PUT /dumplings/:id", () => {
    it("should modify dumpling if fields are valid", async () => {
      const dumpling = await Dumpling.findOne({ name: "Prawn" });
      const { body } = await request(app)
        .put(`/dumplings/${dumpling.id}`)
        .send({ name: "Tiger Prawn" })
        .expect(200);
      expect(body).toMatchObject({ name: "Tiger Prawn" });
    });

    it("should throw error if name is empty", async () => {
      const dumpling = await Dumpling.findOne({ name: "Prawn" });
      const response = await request(app)
        .put(`/dumplings/${dumpling.id}`)
        .send({ name: "" });
      expect(response.status).toBe(400);
    });

    it("should throw error if request body is not json ", async () => {
      const dumpling = await Dumpling.findOne({ name: "Prawn" });
      const response = await request(app)
        .put(`/dumplings/${dumpling.id}`)
        .send("notJSON");
      expect(response.status).toBe(400);
    });
  });

  describe("DELETE /dumplings/:id", () => {
    it("should delete dumpling if exist", async () => {
      const dumpling = await Dumpling.findOne({ name: "Prawn" });
      const { body } = await request(app)
        .delete(`/dumplings/${dumpling.id}`)
        .expect(200);
      expect(body).toMatchObject({ name: "Prawn" });
    });

    it("should throw an error if dumpling does not exist", async () => {
      // const dumpling = await Dumpling.findOne({ name: "notDumpling" }); // returns null
      const response = await request(app).delete(
        `/dumplings/603f572adeadad44d8ea23b0`
      );
      expect(response.status).toBe(400);
    });
  });
});
