const express = require("express");
const breads = express.Router();

const Bread = require("../models/bread.js");

// INDEX - READ ALL
breads.get("/", (req, res) => {
    res.send(Bread);
});

// READ ONE?
breads.get("/:arrayIndex", (req, res) => {
    const arrayIndex = req.params.arrayIndex;
    res.send(Bread[arrayIndex]);
});

// EXPORT
module.exports = breads;
