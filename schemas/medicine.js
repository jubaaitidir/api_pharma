var mongoose=require('mongoose');
var categorie=require('./category');
//var schema= mongoose.Schema;
const medicineSchema=mongoose.Schema({
    id_med:Number,
    title:String,
    cat:{type: mongoose.Schema.Types.ObjectId,ref:categorie},
    authorization_holder: String,
    cis_code:String,
    composition:[],
    generic_groups:[]
});
module.exports=mongoose.model('medecine',medicineSchema);