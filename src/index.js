require("./utils/db");

const app = require("./app");

// index.js
const PORT = process.env.PORT || 3001;
// const server = app.listen(process.env.PORT || PORT, () => {
//   console.log(`Express app started on http://localhost:${PORT}`);
// });

const server = app.listen(PORT, () => {
  console.log(`Express app started on http://localhost:${PORT}`);
});
