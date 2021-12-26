const mongoose = require('mongoose');
const categorySchema = mongoose.Schema({
    id_cat:Number,
    nom: String,
    cis_code:String

})

module.exports = mongoose.model('category', categorySchema);