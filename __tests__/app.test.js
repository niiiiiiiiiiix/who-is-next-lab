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

  // // describe("GET /dumplings", () => {
  // //   it("should show newly added dumpling", async () => {
  // //     const newDumpling = { name: "xxx" };
  // //     const { body } = await request(app).get("/dumplings").expect(200);
  // //     expect(body).toMatchObject([newDumpling]);
  // //   });
  // // });

  // describe("PUT /dumplings/:id", () => {
  //   it("should modify dumpling if fields are valid", async () => {
  //     const changeDumpling = { name: "xxx edited" };
  //     const { body } = await request(app)
  //       .put("/dumplings/1")
  //       .send(changeDumpling)
  //       .expect(200);
  //     expect(body).toMatchObject(changeDumpling);
  //   });

  //   it("should throw error if name is empty", async () => {});
  //   it("should throw error if request body is not json ", async () => {});
  // });

  // describe("DELETE /dumplings/:id", () => {
  //   it("should delete dumpling if exist", async () => {
  //     const deleteDumpling = { name: "xxx edited" };
  //     const { body } = await request(app).delete("/dumplings/1").expect(200);
  //     expect(body).toMatchObject(deleteDumpling);
  //   });
  //   it("should throw an error if dumpling does not exist", async () => {});
  // });

  // // it("POST /dumplings should respond with the one newly added dumpling", async () => {
  // //   const newDumpling1 = { name: "xxx" };
  // //   const { body } = await request(app)
  // //     .post("/dumplings")
  // //     .send(newDumpling1)
  // //     .expect(201);
  // //   expect(body).toMatchObject(newDumpling1);
  // // });

  // // it("POST /dumplings should respond with the second newly added dumpling", async () => {
  // //   const newDumpling2 = { name: "yyy" };
  // //   const { body } = await request(app)
  // //     .post("/dumplings")
  // //     .send(newDumpling2)
  // //     .expect(201);
  // //   expect(body).toMatchObject(newDumpling2);
  // // });

  // // it("GET /dumplings should now respond with an array of two objects", async () => {
  // //   const { body } = await request(app).get("/dumplings");
  // //   expect(body).toEqual([
  // //     {
  // //       id: 1,
  // //       name: "xxx",
  // //     },
  // //     {
  // //       id: 2,
  // //       name: "yyy",
  // //     },
  // //   ]);
  // // });
});
