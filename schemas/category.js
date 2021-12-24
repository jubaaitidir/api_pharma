const mongoose = require('mongoose');
const categorySchema = mongoose.Schema({
    id_cat:Number,
    nom: String

})

module.exports = mongoose.model('category', categorySchema);