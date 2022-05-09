const handler = require("./handler");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.get("/download", async (req, res) => {
  const response = await handler.download({ url: req.query.url });

  return res.json(response);
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
