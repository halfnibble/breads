const express = require("express");

// CONFIGURATION
require("dotenv").config();
const PORT = process.env.PORT;
console.log("My port is:", PORT);

const app = express();

// ROUTES
app.get("/", (req, res) => {
    res.send("Welcome to an Awesome App about Breads!");
});

// LISTEN
app.listen(PORT, () => {
    console.log("Server is listening on port", PORT);
});
