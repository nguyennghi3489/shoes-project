const routes = require('express').Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var FacetOption =  require('../schema/FacetOption');

// Facet Management
routes.post('/api/facetOption', function (req, res) {
    if (!req.body.facetId) {
        res.json({ message: "FacetId not found" })  
    }
    else {
        var data = {
            name : req.body.name,
            facetId : req.body.facetId || null
        }
        var facetOption = new FacetOption(data);
        facetOption.save(function (err) {
            if (err){
                res.json({ message: err.message })
            } else
                res.json({ data: facetOption, success: true })
        });
    }
})

routes.delete('/api/facetOption', function (req, res) {
    FacetOption.findById(req.body.id , function (err, facetOption) {
        if (err) {
            res.json({ message: err.message })  
        }
        else if (facetOption) {
            FacetOption.remove({ _id: req.body.id }, function (err) {
                if (err) {
                    res.json({ message: err.message })  
                }
                res.json({ data: 'removed done', success: true })
                // removed!
            });
        } else {
            res.json({ message: "FacetOption not found" })  
        }
    });
})

routes.put('/api/facetOption', function (req, res) {
    FacetOption.findById(req.body.id , function (err, facetOption) {
        if (err) {
            res.json({ message: err.message })  
        }
        else if (facetOption) {
            facetOption.name = req.body.name || facetOption.name
            facetOption.save(function (err, facetOption) {
                if (err) {
                    res.json({ message: err.message })  
                }
                res.json({ data: facetOption, success: true })
            });
        } else {
            res.json({ message: "FacetOption not found" })  
        }
        // removed!
      });
})

routes.get('/api/facetOption', function (req, res) {
    FacetOption.find(function (err, facetOption) {
        if (err) {
            res.json({ message: err.message })  
        }
        console.log(facetOption)
        res.json({ data: facetOption, success: true })
        // removed!
      });
})

routes.get('/api/facetOption/:id', function (req, res) {
    console.log(req.params.id)
    FacetOption.find({facetId: req.params.id}).
    populate('facetId').
    exec(function (err, facetOption) {
      if (err){
        res.json({ message: err.message })
      } else {
        res.json({ data: facetOption, success: true })
      }
    });
})

module.exports = routes;