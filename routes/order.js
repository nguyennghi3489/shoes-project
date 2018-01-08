const routes = require('express').Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Order =  require('../schema/Order');
var ExportOrder =  require('../schema/Export');
var Stock =  require('../schema/Stock');
var OrderDetail =  require('../schema/OrderDetail');

// Price Management
routes.post('/api/order', function (req, res) {
    const orderDetailList = req.body.product.map(item => new OrderDetail({
        variantId : item._id,
        price : item.price,
        quantity : item.unit,
        total : item.price * item.unit
    }))
    const orderDetailTotal = orderDetailList.reduce((a,b)=>{
        return {
            total : b.total + a.total,
        }
    },{total:0})
    var order = new Order({
        customerId : req.body.customer,
        totalPrice : orderDetailTotal.total || 0,
        payedMoney : 0,
        orderDetail: orderDetailList,
        created_at: new Date()
    });
    order.save(function (err) {
        if (err){
            res.json({ message: err.message })
        } else
            res.json({ data: order, success: true })
            orderDetailList.forEach((item)=>{
                Stock.update({variant: item.variantId}, {$inc: {quantity: item.quantity}},function(){
                });
                console.log(item.variantId)
                console.log(item.quantity)
            })
    });
})

// Price Management
routes.post('/api/export', function (req, res) {
    const orderDetailList = req.body.product.map(item => new OrderDetail({
        variantId : item._id,
        price : item.price,
        quantity : item.unit,
        total : item.price * item.unit
    }))
    const orderDetailTotal = orderDetailList.reduce((a,b)=>{
        return {
            total : b.total + a.total,
        }
    },{total:0})
    var order = new ExportOrder({
        customerId : req.body.customer,
        totalPrice : orderDetailTotal.total || 0,
        payedMoney : 0,
        orderDetail: orderDetailList,
        created_at: new Date()
    });
    order.save(function (err) {
        if (err){
            res.json({ message: err.message })
        } else
            res.json({ data: order, success: true })
            orderDetailList.forEach((item)=>{
                Stock.update({variant: item.variantId}, {$inc: {quantity: -item.quantity}},function(){
                });
                console.log(item.variantId)
                console.log(item.quantity)
            })
    });
})

module.exports = routes;