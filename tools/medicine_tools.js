var medicineModel= require('../schemas/medicine');

module.exports = {
    getAll(req, res) {
        return new Promise((resolve, reject) => {
            medicineModel.find((err, res) => { resolve(res); });
        })
    },
    getMedicine(id) {
        return new Promise((resolve, reject) => {
            medicineModel.find({ id_med: id }, (err, res) => { resolve(res); });
        });
    },
    addMedicine(data_med) {
        const datas=medicineModel.create({ id_med: data_med.id_med, cat: data_med.cat});
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
    },
}