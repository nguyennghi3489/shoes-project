const routes = require('express').Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Price =  require('../schema/Price');

// Price Management
routes.post('/api/price', function (req, res) {
    var data = {
        price : req.body.price,
        sales : req.body.sales || null
    }
    var price = new Price(data);
    price.save(function (err) {
        if (err){
            res.json({ message: err.message })
        } else
            res.json({ data: price, success: true })
    });
})

routes.delete('/api/price', function (req, res) {
    Price.findById(req.body.id , function (err, price) {
        if (err) {
            res.json({ message: err.message })  
        }
        else if (price) {
            Price.remove({ _id: req.body.id }, function (err) {
                if (err) {
                    res.json({ message: err.message })  
                }
                res.json({ data: 'removed done', success: true })
                // removed!
            });
        } else {
            res.json({ message: "Price not found" })  
        }
    });
})

routes.put('/api/price', function (req, res) {
    Price.findById(req.body.id , function (err, price) {
        if (err) {
            res.json({ message: err.message })  
        }
        else if (price) {
            price.price = req.body.price || price.price
            price.sales = req.body.sale || price.sales
            price.save(function (err, price) {
                if (err) {
                    res.json({ message: err.message })  
                }
                res.json({ data: price, success: true })
            });
        } else {
            res.json({ message: "Price not found" })  
        }
        // removed!
      });
})

routes.get('/api/price', function (req, res) {
    Price.find(function (err, price) {
        if (err) {
            res.json({ message: err.message })  
        }
        res.json({ data: price, success: true })
        // removed!
      });
})

module.exports = routes;