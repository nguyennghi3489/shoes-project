var mongoose = require('mongoose');

var CategorySchema = new mongoose.Schema({
    name: String,
    parentId : {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
});

module.exports = mongoose.model('Category', CategorySchema);
