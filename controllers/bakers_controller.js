const express = require("express");
const Baker = require("../models/baker.js");
const bakerSeedData = require("../models/baker_seed.js");

const bakers = express.Router();

// ONE-TIME BAKER SEED DATA
bakers.get("/data/seed", (req, res) => {
    // Uncomment to insert seed bakers data:
    // Baker.insertMany(bakerSeedData).then(res.redirect("/breads"));
    res.redirect("/breads");
});

module.exports = bakers;
