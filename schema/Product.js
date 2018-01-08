var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
    name: String,
    desc: String,
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
    facets : [{type: mongoose.Schema.Types.ObjectId, ref: 'Facet'}],
    isVariant : Boolean
});

module.exports = mongoose.model('Product', ProductSchema);
