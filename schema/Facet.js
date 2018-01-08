var mongoose = require('mongoose');

var FacetSchema = new mongoose.Schema({
    name: String,
});

module.exports = mongoose.model('Facet', FacetSchema);
