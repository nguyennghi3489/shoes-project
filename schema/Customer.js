var mongoose = require('mongoose');

var CustomerSchema = new mongoose.Schema({
    name: String,
    phone: String,
    desc: String,
    type: { type: Number, default: 0 }
});

module.exports = mongoose.model('Customer', CustomerSchema);
