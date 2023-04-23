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

// Bread ROUTES
const breadsController = require("./controllers/breads_controller.js");
app.use("/breads", breadsController);

/*

Express:
localhost:3003/ -> "Welcome to an Awesome App about Breads!"
localhost:3003/breads {/} -> breadsController ? -> "This is the index at /breads"

*/

// LISTEN
app.listen(PORT, () => {
    console.log("Server is listening on port", PORT);
});
