var mongoose = require('mongoose');

var FacetOptionSchema = new mongoose.Schema({
    name: String,
    facetId : {type: mongoose.Schema.Types.ObjectId, ref: 'Facet'},
});

module.exports = mongoose.model('FacetOption', FacetOptionSchema);
