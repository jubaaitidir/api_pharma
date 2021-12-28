var categoryModel= require('../schemas/category');

module.exports = {
    getAll(req, res) {
        return new Promise((resolve, reject) => {
            categoryModel.find((err, res) => { resolve(res); });
        })

    },
    getCategory(id) {
      
        const datas= categoryModel.findOne({ id_cat: id });
        return datas;
        
    },
    addCategory(data_cat) {
        const datas= categoryModel.create({ id_cat: data_cat.id_cat, nom: data_cat.nom, cis_code: data_cat.cis_code});
        return datas;
    },   
    updateCategory(data_cat) {
        const datas= categoryModel.updateOne({id_cat: data_cat.id_cat},{ nom: data_cat.nom, cis_code: data_cat.cis_code});
        return datas;
    },
    deleteCategory(id) {
        return new Promise((resolve, reject) => {
            categoryModel.deleteOne({ id_cat: id }, (err, res) => {
                // if(err) resolve(res);​
                // if(err != null) resolve(res);              
                resolve(res);
            });
        });
    }
}