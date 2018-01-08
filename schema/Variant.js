var mongoose = require('mongoose');

var VariantSchema = new mongoose.Schema({
    name: String,
    desc: String,
    product : {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
    facetOptions : [{type: mongoose.Schema.Types.ObjectId, ref: 'FacetOption'}],
    price : {type: mongoose.Schema.Types.ObjectId, ref: 'Price'}
});

module.exports = mongoose.model('Variant', VariantSchema);
