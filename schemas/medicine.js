var mongoose=require('mongoose');
var categorie=require('./category');

const medicineSchema=mongoose.Schema({
    id_med:Number,
    cat:{type: mongoose.Schema.Types.ObjectId,ref:categorie}
});
module.exports=mongoose.model('medecine',medicineSchema);