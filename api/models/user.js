const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    surname: {type: String, required: true},
    email: {type: String, required: true, unique: true, match: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/},
    password: {type: String, required: true},
    role: {type: String, enum: ['admin', 'customer', 'networker'], default: 'networker', immutable: true},
    schedule: {type: mongoose.Schema.Types.ObjectId, ref: 'Schedule'},
    customers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    products_bought: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
    products_suggestions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}]
});

module.exports = mongoose.model('User', userSchema);