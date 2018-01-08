var mongoose = require('mongoose');

var OrderSchema = new mongoose.Schema({
    customerId : {type: mongoose.Schema.Types.ObjectId, ref: 'Customer'},
    totalPrice : Number,
    payedMoney : Number,
    created_at : Date,
    orderDetail: [{type: mongoose.Schema.Types.ObjectId, ref: 'OrderDetail'}]
});

module.exports = mongoose.model('Order', OrderSchema);
