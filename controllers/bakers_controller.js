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

// INDEX - READ ALL
bakers.get("/", (req, res) => {
    Baker.find()
        .populate("breads")
        .then((foundBakers) => {
            res.send(foundBakers);
        });
});

// DETAIL - SHOW PAGE
bakers.get("/:id", (req, res) => {
    const id = req.params.id;
    Baker.findById(id)
        .populate("breads")
        .then((foundBaker) => {
            res.render("bakerShow", { baker: foundBaker });
        });
});

module.exports = bakers;
