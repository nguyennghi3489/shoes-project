const express = require('express')
const app = express()
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Category =  require('./schema/Category');
var bodyParser = require('body-parser');
var cors = require('cors');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
// New from master aa
// Config file
var MONGO_URI = 'mongodb://localhost:27017/shoesDatabase';  
// Connect to MongoDB and create/use database called todoAppTest
mongoose.connect(MONGO_URI);

const routes = require('./routes');
// Add headers
app.use(cors());
//  Connect all our routes to our application
app.use('/', routes);


// Create a productCategory Schema
// var ProductCategorySchema = new mongoose.Schema({
//     name: String
// });

// // Create a product Schema
// var ProductSchema = new mongoose.Schema({
//     name: String,
//     category: [{ type: Schema.Types.ObjectId, ref: 'Category' }]
// });
// // Create a model based on the schema
// var Category = mongoose.model('Category', ProductCategorySchema);
// // Create a model based on the schema
// var Product = mongoose.model('Product', ProductSchema);

// Category Management
// app.post('/api/category', function (req, res) {
//     var data = {
//         name : req.body.name,
//         parentId : req.body.parentId || null
//     }
//     var category = new Category(data);
//     category.save(function (err) {
//         if (err){
//             res.json({ message: err.message })
//         } else
//             res.json({ data: category, success: true })
//     });
// })

// app.delete('/api/category', function (req, res) {
//     Category.remove({ _id: req.body.id }, function (err) {
//         if (err) {
//             res.json({ message: err.message })  
//         }
//         res.json({ data: 'removed done', success: true })
//         // removed!
//       });
// })

// app.put('/api/category', function (req, res) {
//     Category.findById(req.body.id , function (err, category) {
//         if (err) {
//             res.json({ message: err.message })  
//         }
//         if (category) {
//             category.name = req.body.name || category.name
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

// app.get('/api/category', function (req, res) {
//     Category.find(function (err, category) {
//         if (err) {
//             res.json({ message: err.message })  
//         }
//         res.json({ data: category, success: true })
//         // removed!
//       });
// })

// app.get('/api', function (req, res) {
//     res.json({ message: "hello world" })
// })

const port = process.env.PORT || 3001;
app.listen(port, function () {
    console.log('Server listening on port' + port)
})