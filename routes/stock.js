const routes = require('express').Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Stock =  require('../schema/Stock');

// Price Management
routes.post('/api/importStockToVariant', function (req, res) {
    var data = {
        variant : req.body.variant,
        quantity : req.body.quantity
    }
    var price = new Price(data);
    price.save(function (err) {
        if (err){
            res.json({ message: err.message })
        } else
            res.json({ data: price, success: true })
    });
})



// routes.delete('/api/price', function (req, res) {
//     Price.findById(req.body.id , function (err, price) {
//         if (err) {
//             res.json({ message: err.message })  
//         }
//         else if (price) {
//             Price.remove({ _id: req.body.id }, function (err) {
//                 if (err) {
//                     res.json({ message: err.message })  
//                 }
//                 res.json({ data: 'removed done', success: true })
//                 // removed!
//             });
//         } else {
//             res.json({ message: "Price not found" })  
//         }
//     });
// })

// routes.put('/api/price', function (req, res) {
//     Price.findById(req.body.id , function (err, price) {
//         if (err) {
//             res.json({ message: err.message })  
//         }
//         else if (price) {
//             price.price = req.body.price || price.price
//             price.sales = req.body.sale || price.sales
//             price.save(function (err, price) {
//                 if (err) {
//                     res.json({ message: err.message })  
//                 }
//                 res.json({ data: price, success: true })
//             });
//         } else {
//             res.json({ message: "Price not found" })  
//         }
//         // removed!
//       });
// })

routes.get('/api/stock', function (req, res) {
    Stock.aggregate([
        {
            $lookup:
              {
                from: "products",
                localField: "variant",
                foreignField: "_id",
                as: "item"
              }
         },
        
         {
            $lookup:
              {
                from: "variants",
                localField: "variant",
                foreignField: "_id",
                as: "item_1"
              }
         },
         {
            $project: { 
                item: {
                    $filter: {
                    input: "$item",
                    as: "item",
                    cond: { $or:  [  
                        { $eq: [ "$$item.hasVariants", true ] }
                    ] }
                    }
                },
                item_1: 1,
                quantity: 1
            }
        },
        { "$sort": { "quantity": -1 } },
  ], function (err, result) {
      if (err) {
          next(err);
      } else {
        res.json({ data: result, success: true })
      }
  });
    
    // Stock.find(function (err, stock) {
    //     if (err) {
    //         res.json({ message: err.message })  
    //     }
    //     res.json({ data: stock, success: true })
    //     // removed!
    //   });
})

module.exports = routes;