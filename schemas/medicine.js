var mongoose=require('mongoose');
//var categorie=require('./category');
var schema= mongoose.Schema;
const medicineSchema=mongoose.Schema({
    id_med:Number,
    cat:{type: schema.Types.ObjectId,ref:'categorie'}
});
module.exports=mongoose.model('medecine',medicineSchema);