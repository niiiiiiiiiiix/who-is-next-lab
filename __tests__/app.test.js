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

  it("GET /dumplings/:name should show dumpling with name specified", async () => {
    const eDumpling = { name: "xxx" };
    const { body } = await request(app).get("/dumplings/xxx").expect(200);
    expect(body).toMatchObject(eDumpling);
  });

  it("PUT /dumplings/:id should update dumpling name", async () => {
    const changeDumpling = { name: "xxx edited" };
    const { body } = await request(app)
      .put("/dumplings/1")
      .send(changeDumpling)
      .expect(200);
    expect(body).toMatchObject(changeDumpling);
  });

  it("DELETE /dumplings/:id should delete entry and display the deleted entry", async () => {
    const deleteDumpling = { name: "xxx edited" };
    const { body } = await request(app).delete("/dumplings/1").expect(200);
    expect(body).toMatchObject(deleteDumpling);
  });

  it("POST /dumplings should respond with the one newly added dumpling", async () => {
    const newDumpling1 = { name: "xxx" };
    const { body } = await request(app)
      .post("/dumplings")
      .send(newDumpling1)
      .expect(201);
    expect(body).toMatchObject(newDumpling1);
  });

  it("POST /dumplings should respond with the second newly added dumpling", async () => {
    const newDumpling2 = { name: "yyy" };
    const { body } = await request(app)
      .post("/dumplings")
      .send(newDumpling2)
      .expect(201);
    expect(body).toMatchObject(newDumpling2);
  });

  it("GET /dumplings should now respond with an array of two objects", async () => {
    const { body } = await request(app).get("/dumplings");
    expect(body).toEqual([
      {
        id: 1,
        name: "xxx",
      },
      {
        id: 2,
        name: "yyy",
      },
    ]);
  });

  it("GET /dumplings/presenter should respond with a random dumpling", async () => {
    const { body } = await request(app).get("/dumplings/presenter");
    expect(Object.keys(body).length).toEqual(2);
    //toHaveProperty
  });
});
