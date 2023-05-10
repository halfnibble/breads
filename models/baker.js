const mongoose = require("mongoose");
const { Schema } = mongoose;
const Bread = require("./bread.js");

const bakerSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            enum: ["Rachel", "Monica", "Joey", "Chandler", "Ross", "Phoebe"],
        },
        startDate: { type: Date, required: true },
        bio: { type: String },
    },
    { toJSON: { virtuals: true } }
);

// VIRTUAlS
bakerSchema.virtual("breads", {
    ref: "Bread",
    localField: "_id",
    foreignField: "baker",
});

// HOOKS
bakerSchema.post("findOneAndDelete", (deletedBaker) => {
    console.log(deletedBaker);
    Bread.deleteMany({ baker: deletedBaker._id }).then((deleteStatus) => {
        console.log(deleteStatus);
    });
});

const Baker = mongoose.model("Baker", bakerSchema);
module.exports = Baker;
