var medicineModel = require('../schemas/medicine');

module.exports = {
    getAll(req, res) {
        return new Promise((resolve, reject) => {
            medicineModel.find((err, res) => { resolve(res); });
        })


    },
    getMedicine(id) {
        return new Promise((resolve, reject) => {
         medicineModel.findOne({ id_med: id },(err, res) => { resolve(res); });
        //medicineModel.findOne({ "id_med": id }).populate('cat').then(res => console.log(res));
        
        });
    },
    addMedicine(data_med) {
        const datas = medicineModel.create({
            id_med: data_med.id_med,
            title: data_med.title,
            cat: data_med.cat,
            authorization_holder: data_med.authorization_holder,
            cis_code: data_med.cis_code,
       
        });
        return datas;
    },
    updateMedicine(data_med) {
        const datas = medicineModel.updateOne({ id_med: data_med.id_med }, { title : data_med.title, cat: data_med.cat,authorization_holder: data_med.authorization_holder,cis_code: data_med.cis_code, composition: data_med.composition, generic_groups: data_med.generic_groups});
        return datas;
    },
    deleteMedicine(id) {
        return new Promise((resolve, reject) => {
            medicineModel.deleteOne({ id_med: id }, (err, res) => {
                // if(err) resolve(res);​
                // if(err != null) resolve(res);              
                resolve(res);
            });
        });
    }
}