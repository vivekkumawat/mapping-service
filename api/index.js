module.exports = (req, res) => {
  const { readFileSync } = require("fs");
  const assets = readFileSync("./api/db.json");
  res.json({
    body: JSON.parse(assets),
  });
};
