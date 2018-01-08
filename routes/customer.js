const routes = require('express').Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Customer =  require('../schema/Customer');
var Order =  require('../schema/Order');

// Category Management
routes.post('/api/customer', function (req, res) {
  console.log(req.body)
    var data = {
        name : req.body.name,
        phone : req.body.phone || null,
        desc : req.body.desc || null,
        type : req.body.type
    }
    var customer = new Customer(data);
    customer.save(function (err) {
        if (err){
            res.json({ message: err.message })
        } else
            res.json({ data: customer, message:'Add Customer Successfully', success: true })
    });
})

// routes.delete('/api/category', function (req, res) {
//     Category.findById(req.body.id , function (err, category) {
//         if (err) {
//             res.json({ message: err.message })  
//         }
//         else if (category) {
//             Category.remove({ _id: req.body.id }, function (err) {
//                 if (err) {
//                     res.json({ message: err.message })  
//                 }
//                 res.json({ data: 'removed done', success: true })
//                 // removed!
//             });
//         } else {
//             res.json({ message: "Category not found" })  
//         }
//         // removed!
//     });
// })

// routes.put('/api/category', function (req, res) {
//     Category.findById(req.body.id , function (err, category) {
//         if (err) {
//             res.json({ message: err.message })
//         }
//         else if (category) {
//             category.name = req.body.name || category.name
//             category.parentId = req.body.parentId || category.parentId
//             category.save(function (err, category) {
//                 if (err) {
//                     res.json({ message: err.message })  
//                 }
//                 res.json({ data: category, success: true })
//             });
//         } else {
//             res.json({ message: "Category not found" })  
//         }
//         // removed!
//       });
// })

routes.get('/api/customer', function (req, res) {
    Customer.find().exec(function (err, customer) {
      if (err){
        res.json({ message: err.message })
      } else {
        res.json({ data: customer, success: true })
      }
    });
})

routes.post('/api/customerByName', function (req, res) {
    Customer.find({name: new RegExp(req.body.name, "i")})
    .exec(function (err, customer) {
      if (err){
        res.json({ message: err.message })
      } else {
        res.json({ data: customer, success: true })
      }
    });
})

routes.get('/api/getCustomerProfit/:id', function (req, res) {
  console.log(req.params.id)
    Order.aggregate([
      { $match: { customerId : mongoose.Types.ObjectId(req.params.id) } },
      {
          $group: {
            _id: '$customerId',
            totalPrice: { $sum: '$totalPrice'}, 
            payedMoney: { $sum: '$payedMoney'}, 
          }
      }
  ], function (err, result) {
      if (err) {
          next(err);
      } else {
        res.json({ data: result, success: true })
      }
  });
})

routes.get('/api/getCustomerOrders/:id', function (req, res) {
    Order.find({customerId: req.params.id}).
    exec(function (err, category) {
      if (err){
        res.json({ message: err.message })
      } else {
        res.json({ data: category, success: true })
      }
    });
})


module.exports = routes;