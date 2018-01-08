var mongoose = require('mongoose');

var StockSchema = new mongoose.Schema({
    variant : {type: mongoose.Schema.Types.ObjectId, ref: 'Variant'},
    quantity: Number
});

module.exports = mongoose.model('Stock', StockSchema);
