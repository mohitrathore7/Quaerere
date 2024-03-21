const mongoose = require("mongoose");

// Define a sub-schema for the objects in the 'data' array
const dataItemSchema = new mongoose.Schema({
    title: String,
    url: String,
    publishedDate: Date,
    author: String,
    id: String,
    score: Number,
});

const saveDataScheme = mongoose.Schema(
    {
        data: [dataItemSchema], // Use the sub-schema here
        email: { type: String, unique: true, required: true },
    },
    { timestamps: true } // Correct the typo in 'timestamps'
);

const SaveData = mongoose.model("SaveData", saveDataScheme);

module.exports = SaveData;
