const express = require("express");
const breads = express.Router();

const Bread = require("../models/bread.js");

// INDEX - READ ALL
breads.get("/", (req, res) => {
    Bread.find().then((foundBreads) => {
        res.render("index", {
            breads: foundBreads,
            title: "Index page",
        });
    });
});

// NEW Bread Form
breads.get("/new", (req, res) => {
    res.render("new", { title: "New bread" });
});

// EDIT Bread Form
breads.get("/:arrayIndex/edit", (req, res) => {
    const arrayIndex = req.params.arrayIndex;
    res.render("edit", {
        bread: Bread[arrayIndex],
        index: arrayIndex,
    });
});

// READ ONE - SHOW
breads.get("/:id", (req, res) => {
    const id = req.params.id;
    Bread.findById(id)
        .then((foundBread) => {
            if (foundBread === null) {
                res.send("404 - Bread not found");
            } else {
                res.render("show", {
                    bread: foundBread,
                });
            }
        })
        .catch((err) => {
            res.send("500 - Server Error");
        });
});

// CREATE
breads.post("/", (req, res) => {
    let newBread = { ...req.body };
    // Default bread image
    if (newBread.image === "") {
        newBread.image = undefined;
    }
    // Process hasGluten checkbox
    if (newBread.hasGluten === "on") {
        newBread.hasGluten = true;
    } else if (newBread.hasGluten === "off") {
        newBread.hasGluten = false;
    } else {
        console.error("Error: hasGluten value is:", newBread.hasGluten);
    }
    Bread.create(newBread);
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
