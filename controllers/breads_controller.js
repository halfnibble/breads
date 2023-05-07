const express = require("express");
const breads = express.Router();

const Bread = require("../models/bread.js");
const Baker = require("../models/baker.js");

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
    Baker.find().then((foundBakers) => {
        res.render("new", { title: "New bread", bakers: foundBakers });
    });
});

// EDIT Bread Form
breads.get("/:id/edit", (req, res) => {
    const id = req.params.id;

    Baker.find().then((foundBakers) => {
        Bread.findById(id).then((foundBread) => {
            res.render("edit", {
                bread: foundBread,
                bakers: foundBakers,
            });
        });
    });
});

// READ ONE - SHOW
breads.get("/:id", (req, res) => {
    const id = req.params.id;
    Bread.findById(id)
        .populate("baker")
        .then((foundBread) => {
            if (foundBread === null) {
                res.send("404 - Bread not found");
            } else {
                console.log(foundBread.getBakedBy());
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
breads.put("/:id", (req, res) => {
    const id = req.params.id;
    let updateBread = { ...req.body };
    // Default bread image
    if (updateBread.image === "") {
        updateBread.image =
            "https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80";
    }
    // Process hasGluten checkbox
    if (updateBread.hasGluten === "on") {
        updateBread.hasGluten = true;
    } else {
        updateBread.hasGluten = false;
    }
    Bread.findByIdAndUpdate(id, updateBread, { new: true }).then((updatedBread) => {
        console.log(updatedBread);
        res.redirect(`/breads/${id}`);
    });
});

// DELETE
breads.delete("/:id", (req, res) => {
    const id = req.params.id;
    Bread.findByIdAndDelete(id).then((deletedBread) => {
        res.status(303).redirect("/breads");
    });
});

// EXPORT
module.exports = breads;
