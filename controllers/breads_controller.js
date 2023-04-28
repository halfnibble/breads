const express = require("express");
const breads = express.Router();

const Bread = require("../models/bread.js");

// INDEX - READ ALL
breads.get("/", (req, res) => {
    // res.send(Bread);
    res.render("index", {
        breads: Bread,
    });
});

breads.get("/new", (req, res) => {
    res.render("new");
});

// EDIT
breads.get("/:arrayIndex/edit", (req, res) => {
    const arrayIndex = req.params.arrayIndex;
    res.render("edit", {
        bread: Bread[arrayIndex],
        index: arrayIndex,
    });
});

// READ ONE - SHOW
breads.get("/:arrayIndex", (req, res) => {
    const arrayIndex = req.params.arrayIndex;
    if (Bread[arrayIndex]) {
        res.render("show", {
            bread: Bread[arrayIndex],
            index: arrayIndex,
        }); // Bread[0], Bread[1], Bread[2], ...
    } else {
        res.send("404");
    }
});

// CREATE
breads.post("/", (req, res) => {
    let newBread = { ...req.body };
    // Default bread image
    if (newBread.image === "") {
        newBread.image =
            "https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80";
    }
    // Process hasGluten checkbox
    if (newBread.hasGluten === "on") {
        newBread.hasGluten = true;
    } else if (newBread.hasGluten === "off") {
        newBread.hasGluten = false;
    } else {
        console.error("Error: hasGluten value is:", newBread.hasGluten);
    }
    Bread.push(newBread);
    res.redirect("/breads");
});

// UPDATE
breads.put("/:arrayIndex", (req, res) => {
    const arrayIndex = req.params.arrayIndex;
    let updatedBread = { ...req.body };
    // Default bread image
    if (updatedBread.image === "") {
        updatedBread.image =
            "https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80";
    }
    // Process hasGluten checkbox
    if (updatedBread.hasGluten === "on") {
        updatedBread.hasGluten = true;
    } else if (updatedBread.hasGluten === "off") {
        updatedBread.hasGluten = false;
    } else {
        console.error("Error: hasGluten value is:", updatedBread.hasGluten);
    }
    Bread[arrayIndex] = updatedBread;
    res.redirect(`/breads/${arrayIndex}`);
});

// DELETE
breads.delete("/:arrayIndex", (req, res) => {
    const arrayIndex = req.params.arrayIndex;
    Bread.splice(arrayIndex, 1);
    res.status(303).redirect("/breads");
});

// EXPORT
module.exports = breads;
