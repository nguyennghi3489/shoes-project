var mongoose = require('mongoose');

var PriceSchema = new mongoose.Schema({
    price: Number,
    sales: Number
    // store : Number
});

module.exports = mongoose.model('Price', PriceSchema);
