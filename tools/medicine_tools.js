var medicineModel= require('../schemas/medicine');

module.exports = {
    getAll(req, res) {
        return new Promise((resolve, reject) => {
            medicineModel.find((err, res) => { resolve(res); });
        })


    },
    getMedicine(id) {
       // return new Promise((resolve, reject) => {
        const datas= medicineModel.findOne({ id_med: id });
        return datas;
        //});
    },
    addMedicine(data_med) {
        const datas= medicineModel.create({ id_med: data_med.id_med, cat: data_med.cat});
        return datas;
    },
    updateMedicine(data_med) {
        const datas= medicineModel.updateOne({id_med: data_med.id_med},{ cat: data_med.cat});
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