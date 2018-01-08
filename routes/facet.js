const routes = require('express').Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Facet =  require('../schema/Facet');

// Facet Management
routes.post('/api/facet', function (req, res) {
    var data = {
        name : req.body.name
    }
    var facet = new Facet(data);
    facet.save(function (err) {
        if (err){
            res.json({ message: err.message })
        } else
            res.json({ data: facet, success: true })
    });
})

routes.delete('/api/facet', function (req, res) {
    Facet.findById(req.body.id , function (err, facet) {
        if (err) {
            res.json({ message: err.message })  
        }
        else if (facet) {
            Facet.remove({ _id: req.body.id }, function (err) {
                if (err) {
                    res.json({ message: err.message })  
                }
                res.json({ data: 'removed done', success: true })
                // removed!
            });
        } else {
            res.json({ message: "Facet not found" })  
        }
    });
})

routes.put('/api/facet', function (req, res) {
    Facet.findById(req.body.id , function (err, facet) {
        if (err) {
            res.json({ message: err.message })  
        }
        else if (facet) {
            facet.name = req.body.name || facet.name
            facet.save(function (err, facet) {
                if (err) {
                    res.json({ message: err.message })  
                }
                res.json({ data: facet, success: true })
            });
        } else {
            res.json({ message: "Facet not found" })  
        }
        // removed!
      });
})

routes.get('/api/facet', function (req, res) {

    Facet.aggregate([
        {
            $lookup:
              {
                from: "facetoptions",
                localField: "_id",
                foreignField: "facetId",
                as: "options"
              }
         },
         {
            $project: { 
                options: 1,
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

    // Facet.find(function (err, facet) {
    //     if (err) {
    //         res.json({ message: err.message })  
    //     }
    //     res.json({ data: facet, success: true })
    //     // removed!
    //   });
})

module.exports = routes;