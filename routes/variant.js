const routes = require('express').Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Variant =  require('../schema/Variant');
var Stock =  require('../schema/Stock');

routes.post('/api/variant', function (req, res) {
    var data = {
        name : req.body.name,
        desc : req.body.desc,
        product : req.body.productId || null,
        facetOptions : req.body.facetOptionIds || []
    }
    var variant = new Variant(data);
    variant.save(function (err) {
        if (err){
            res.json({ message: err.message })
        } else
            var stock = new Stock({variant: variant._id, quantity: 0});
            stock.save(function (err) {
                res.json({ data: variant, success: true })
            })
    });
})


routes.get('/api/variant/:id', function (req, res) {
    console.log(req.params.id)
    Variant.find({product: req.params.id}).
    populate('product').
    populate('facetOptions').
    exec(function (err, variant) {
      if (err){
        res.json({ message: err.message })
      } else {
        res.json({ data: variant, success: true })
      }
    });
})

routes.get('/api/variant', function (req, res) {
    console.log(req.params.id)
    Variant.aggregate([
        {
            $lookup:
              {
                from: "products",
                localField: "product",
                foreignField: "_id",
                as: "product"
              }
         },
         { $unwind : {
            path: "$product",
            preserveNullAndEmptyArrays: true
         } },
         {
            $lookup:
              {
                from: "categories",
                localField: "product.category",
                foreignField: "_id",
                as: "category"
              }
         },
         {
            $lookup:
              {
                from: "facetoptions",
                localField: "facetOptions",
                foreignField: "_id",
                as: "facetOptions"
              }
         },
         {
            $lookup:
              {
                from: "stocks",
                localField: "_id",
                foreignField: "variant",
                as: "stock"
              }
         },
         { $unwind : "$category" },
         { $unwind : "$stock" },
         { $unwind : "$facetOptions" },
         {
            $project: { 
                name: 1,
                category: 1,
                desc: 1,
                product: 1,
                facetOptions: 1,
                "stock.quantity": 1
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

routes.delete('/api/variant', function (req, res) {
    Variant.findById(req.body.id , function (err, variant) {
        if (err) {
            res.json({ message: err.message })  
        }
        else if (variant) {
            Variant.remove({ _id: req.body.id }, function (err) {
                if (err) {
                    res.json({ message: err.message })  
                }
                res.json({ data: 'removed done', success: true })
                // removed!
            });
        } else {
            res.json({ message: "Variant not found" })  
        }
    });
})

routes.put('/api/variant', function (req, res) {
    Variant.findById(req.body.id , function (err, variant) {
        if (err) {
            res.json({ message: err.message })  
        }
        else if (variant) {
            variant.name = req.body.name || variant.name
            variant.desc = req.body.desc || variant.desc
            variant.facetOptions = req.body.facetOptionIds || variant.facetOptionIds
            variant.save(function (err, variant) {
                if (err) {
                    res.json({ message: err.message })  
                }
                else {
                    res.json({ data: variant, success: true })
                }
            });
        } else {
            res.json({ message: "Variant not found" })  
        }
        // removed!
      });
})
module.exports = routes;