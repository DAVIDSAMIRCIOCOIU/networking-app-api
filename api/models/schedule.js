const mongoose = require("mongoose");

const scheduleSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model('Schedule', scheduleSchema);