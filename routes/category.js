const routes = require('express').Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Category =  require('../schema/Category');

// Category Management
routes.post('/api/category', function (req, res) {
    var data = {
        name : req.body.name,
        parentId : req.body.parentId || null
    }
    var category = new Category(data);
    category.save(function (err) {
        if (err){
            res.json({ message: err.message })
        } else
            res.json({ data: category, message:'Add Category Successfully', success: true })
    });
})

routes.delete('/api/category', function (req, res) {
    Category.findById(req.body.id , function (err, category) {
        if (err) {
            res.json({ message: err.message })  
        }
        else if (category) {
            Category.remove({ _id: req.body.id }, function (err) {
                if (err) {
                    res.json({ message: err.message })  
                }
                res.json({ data: 'removed done', success: true })
                // removed!
            });
        } else {
            res.json({ message: "Category not found" })  
        }
        // removed!
    });
})

routes.put('/api/category', function (req, res) {
    Category.findById(req.body.id , function (err, category) {
        if (err) {
            res.json({ message: err.message })
        }
        else if (category) {
            category.name = req.body.name || category.name
            category.parentId = req.body.parentId || category.parentId
            category.save(function (err, category) {
                if (err) {
                    res.json({ message: err.message })  
                }
                res.json({ data: category, success: true })
            });
        } else {
            res.json({ message: "Category not found" })  
        }
        // removed!
      });
})

routes.get('/api/category', function (req, res) {
    Category.find().populate('parentId').
    exec(function (err, category) {
      if (err){
        res.json({ message: err.message })
      } else {
        res.json({ data: category, success: true })
      }
    });
})

module.exports = routes;