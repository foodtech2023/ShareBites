// Import Mongoose
const mongoose = require('mongoose');
// Import Validator
const validator = require('validator');

// Create Worker Schema
const workerSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email ID !!");
            }
        }
    },
    password: {
        type: String,
        required: true,
    },
    person: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    address: {
        type: String
    },
    loc: {
        type: String
    },
    isBusy: {
        type: Boolean
    }
})

// Crate Worker Collection
const Worker = mongoose.model("workers", workerSchema);

// Exports Worker Module
module.exports = Worker;