const routes = require('express').Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Product =  require('../schema/Product');
var Stock =  require('../schema/Stock');

// Category Management
routes.post('/api/product', function (req, res) {
    console.log(req.body)
    var data = {
        name : req.body.name,
        desc : req.body.desc,
        category : req.body.categoryId || null,
        facets : req.body.facetIds || [],
        isVariant : req.body.facetIds.length > 0 ? false : true
    }
    var product = new Product(data);
    product.save(function (err) {
        if (err){
            res.json({ message: err.message })
        } else
            {
                var stock = new Stock({variant: product._id, quantity: 0});
                stock.save(function (err) {
                    res.json({ data: product, success: true })
                })
            }
    });
})

routes.get('/api/product', function (req, res) {
    // Product.find().
    // populate('category').
    // populate('facets').
    // exec(function (err, product) {
    //   if (err) return handleError(err);
    //   res.json({ data: product, success: true })
    // });
    Product.aggregate([
        {
            $lookup:
              {
                from: "categories",
                localField: "category",
                foreignField: "_id",
                as: "category"
              }
         },
         {
            $lookup:
              {
                from: "facets",
                localField: "facets",
                foreignField: "_id",
                as: "facets"
              }
         },
         {
            $lookup:
              {
                from: "variants",
                localField: "_id",
                foreignField: "product",
                as: "variants"
              }
         },
         { $unwind : "$category" },
         {
            $project: { 
                facets: 1,
                category: 1,
                variants: 1,
                desc:1,
                name: 1
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
})

routes.delete('/api/product', function (req, res) {
    Product.findById(req.body.id , function (err, product) {
        if (err) {
            res.json({ message: err.message })  
        }
        else if (product) {
            Product.remove({ _id: req.body.id }, function (err) {
                if (err) {
                    res.json({ message: err.message })  
                }
                res.json({ data: 'removed done', success: true })
                // removed!
            });
        } else {
            res.json({ message: "Product not found" })  
        }
    });
})

routes.put('/api/product', function (req, res) {
    Product.findById(req.body.id , function (err, product) {
        if (err) {
            res.json({ message: err.message })  
        }
        else if (product) {
            console.log(req.body)
            product.name = req.body.name || product.name
            product.desc = req.body.desc || product.desc
            product.category = req.body.categoryId || product.category
            product.facets = req.body.facetIds || product.facets
            product.isVariant = req.body.facetIds.length > 0 ? false : true
            product.save(function (err, product) {
                if (err) {
                    res.json({ message: err.message })  
                }
                else {
                    res.json({ data: product, success: true })
                }
            });
        } else {
            res.json({ message: "Product not found" })  
        }
        // removed!
      });
})

module.exports = routes;