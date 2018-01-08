var mongoose = require('mongoose');

var OrderDetailSchema = new mongoose.Schema({
    variantId : {type: mongoose.Schema.Types.ObjectId, ref: 'Facet'},
    price : Number,
    quantity : Number,
    total : Number
});

module.exports = mongoose.model('OrderDetail', OrderDetailSchema);
