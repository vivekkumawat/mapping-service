module.exports = (req, res) => {
  if (req.method === "POST") {
    const { readFileSync, writeFileSync } = require("fs");
    const { assets } = JSON.parse(readFileSync("./api/db.json"));
    const { id, lat, long } = req.body;
    const updatedAsset = assets
      .filter((asset) => asset.id === id)
      .map((asset) => {
        return {
          ...asset,
          lat,
          long,
        };
      });
    const filteredAssets = assets.filter((asset) => asset.id !== id);
    const data = [...filteredAssets, ...updatedAsset];
    writeFileSync("./api/db.json", JSON.stringify({ assets: data }), "utf8");
    res.json({
      body: assets,
    });
  } else {
    res.status(405).send({ message: "Wrong request method" });
  }
};
