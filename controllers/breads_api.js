const express = require("express");
const breads = express.Router();

const Bread = require("../models/bread.js");

// CREATE
breads.post("/", (req, res) => {
    let newBread = { ...req.body };
    // Default bread image
    if (newBread.image === "") {
        newBread.image = undefined;
    }
    Bread.create(newBread)
        .then((createdBread) => {
            res.status(201).send({
                id: createdBread._id,
                name: createdBread.name,
                hasGluten: createdBread.hasGluten,
                image: createdBread.image,
                baker: createdBread.baker,
            });
        })
        .catch((err) => {
            res.status(400).send("400 - Bad Request");
        });
});

// READ - LIST
breads.get("/", (req, res) => {
    Bread.find().then((foundBreads) => {
        res.send(
            foundBreads.map((bread) => {
                return {
                    id: bread._id,
                    name: bread.name,
                    hasGluten: bread.hasGluten,
                    image: bread.image,
                    baker: bread.baker,
                };
            })
        );
    });
});

// READ - DETAIL
breads.get("/:id", (req, res) => {
    const id = req.params.id;
    Bread.findById(id)
        .then((foundBread) => {
            if (foundBread === null) {
                res.status(404).send("404 - Bread not found");
            } else {
                return {
                    id: foundBread._id,
                    name: foundBread.name,
                    hasGluten: foundBread.hasGluten,
                    image: foundBread.image,
                    baker: foundBread.baker,
                };
            }
        })
        .catch((err) => {
            res.status(500).send("500 - Server Error");
        });
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

    Bread.findByIdAndUpdate(id, updateBread, { new: true })
        .then((updatedBread) => {
            res.status(200).send({
                id: updatedBread._id,
                name: updatedBread.name,
                hasGluten: updatedBread.hasGluten,
                image: updatedBread.image,
                baker: updatedBread.baker,
            });
        })
        .catch((err) => {
            res.status(400).send("400 - Bad Request");
        });
});

// DELETE
breads.delete("/:id", (req, res) => {
    const id = req.params.id;
    Bread.findByIdAndDelete(id)
        .then((deletedBread) => {
            res.status(200).send({
                id: deletedBread._id,
                name: deletedBread.name,
                hasGluten: deletedBread.hasGluten,
                image: deletedBread.image,
                baker: deletedBread.baker,
            });
        })
        .catch((err) => {
            res.status(400).send("400 - Bad Request");
        });
});

// EXPORT
module.exports = breads;
