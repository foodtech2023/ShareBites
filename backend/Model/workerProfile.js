// Import Mongoose
const mongoose = require('mongoose');
// Import Validator
const validator = require('validator');

// Create Worker Profile Schema
const workerProfileSchema = mongoose.Schema({
    worker_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Worker"
    },
    image: {
        data: Buffer,
        contentType: String,
    }
})

// Crate Worker Profile Collection
const WorkerProfile = mongoose.model("workerprofiles", workerProfileSchema);

// Exports Worker Profile Module
module.exports = WorkerProfile;