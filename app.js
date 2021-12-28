//var http = require("http");
var express = require("express");
var cors = require('cors');


const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const MongoClient = require('mongodb').MongoClient;

var tools_medicine = require('./tools/medicine_tools');



const url = "mongodb+srv://pharma:ipssi2021@clusterpharma.dyrrp.mongodb.net/db_pharma?retryWrites=true&w=majority";

mongoose.connect(url, { useNewUrlParser: true });

const medicineModel = require('./schemas/medicine');
const categorieModel = require('./schemas/category');
const medicine_tools = require("./tools/medicine_tools");
const category_tools = require("./tools/category_tools");




var app = express();

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(cors({
    origin: "*"
}))

function disconnect(client) {
    client.close().then(() => console.log("disconnection.......")).catch(err => console.log(err));

}

app.get('/index.html', async (req, res) => {

    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<h1>Bienvenue dans pharma api</h1>");
    res.end();
})

app.get('/', (req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<h1>Bienvenue dans pharma api</h1>");
    res.end();
});


/**
 * CRUD MEDICINE
 */

app.get('/medicine/', async (req, res) => {


    res.setHeader('Content-Type', 'application/json');

    const datas = await tools_medicine.getAll();

    res.status(200).json(datas);

})
    .use('/medicine/:id/', (req, res, next) => {

        var id_med = req.params.id;

        id = parseInt(id_med);
        is_number = Number.isInteger(id);
        if ((id_med.length == 0) || (!is_number)) {
            res.writeHead(404, { "Content-Type": "text/html" });
            res.end("<h2>Page not found, (id should be an Number)</h2>");
        }
        if (is_number) next();

    })
    .get('/medicine/:id/', async (req, res) => {
        var id = req.params.id;
        res.setHeader("Content-Type", "application/json");


        const client = await new MongoClient(url, { useNewUrlParser: true });

        client.connect(async () => {

            const datas = await tools_medicine.getMedicine(id);

            if (!datas) {
                res.status(200).json({ 'error': 'no medicine with this id' });
            }
            res.status(200).json(datas);
        });
        disconnect(client);
    });





app.post('/medicine/', async (req, res) => {
    const { id_med, title, cat, authorization_holder, cis_code } = req.body;


    const data_med = { id_med, title, cat, authorization_holder, cis_code }
    var datas;
    var add_data;
    const client = await new MongoClient(url, { useNewUrlParser: true });
    client.connect(async () => {

        datas = await medicine_tools.getMedicine(id_med);


        if (datas) {
            res.status(200).end(JSON.stringify({ 'error': 'medicine with this id is already exist' }));
        } else {
            add_data = await tools_medicine.addMedicine(data_med);
            
            res.status(201).json(add_data);
        }
    });

    disconnect(client);

});



app.delete('/medicine/:id', async (req, res) => {

    var id = req.params.id;
    res.setHeader("Content-Type", "application/json; charset=utf-8");

    var removed_medicine;
    const client = new MongoClient(url, { useNewUrlParser: true });
    await client.connect(() => {
        //const collection = client.db("db_pharma").collection("medecines");



        medicineModel.find({ id_med: id }, function (err, medicine) {

            removed_medicine = { 'number_of_delete': medicine.length }

            if (medicine.length > 0) {
                medicine.map((el) => {
                    el.remove();

                });
                res.status(200).end(JSON.stringify(removed_medicine));
            } else {
                res.status(200).end(JSON.stringify({ 'number_of_delete': 'no medicine found with this id' }))
            }
        });



    });
    disconnect(client);
});

app.put('/medicine/', async (req, res) => {

    const { id_med, title, cat, authorization_holder, cis_code, composition, generic_groups } = req.body;


    const data_med = { id_med: id_med, title: title, cat: cat, authorization_holder: authorization_holder, cis_code: cis_code, composition: composition, generic_groups: generic_groups }
    var datas;
    var add_data;
    const client = await new MongoClient(url, { useNewUrlParser: true });
    client.connect(async () => {

        datas = await medicine_tools.getMedicine(id_med);


        if (!datas) {
            res.status(200).end(JSON.stringify({ 'error': ' no medicine with this id ' }));
        } else {
            //console.log(datas)
            add_data = await medicine_tools.updateMedicine(data_med);

            res.status(201).json(add_data);
        }
    });

    disconnect(client);
})


/**
 * CRUD CATEGORY
 */

app.get('/category/', async (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    const datas = await category_tools.getAll();

    res.status(200).json(datas);

})
    .use('/category/:id/', (req, res, next) => {

        var id_cat = req.params.id;

        id = parseInt(id_cat);
        is_number = Number.isInteger(id);
        if ((id_cat.length == 0) || (!is_number)) {
            res.writeHead(404, { "Content-Type": "text/html" });
            res.end("<h2>Page not found, (id should be an Number)</h2>");
        }
        if (is_number) next();

    })
    .get('/category/:id/', async (req, res) => {
        var id = req.params.id;
        res.setHeader("Content-Type", "application/json");

        const client = await new MongoClient(url, { useNewUrlParser: true });

        client.connect(async () => {

            const datas = await category_tools.getCategory(id);

            if (datas) {
                res.status(200).json(datas);
            } else {
                res.status(200).json({ 'error': 'no category with this id' });
            }
        });
        disconnect(client);
    });





app.post('/category/', async (req, res) => {
    const { id_cat, nom, cis_code } = req.body;

    const data_cat = { id_cat: id_cat, nom: nom, cis_code: cis_code }
    var datas;
    var add_data;
    const client = await new MongoClient(url, { useNewUrlParser: true });
    client.connect(async () => {

        datas = await category_tools.getCategory(id_cat);

        if (datas) {
            res.status(200).end(JSON.stringify({ 'error': 'category with this id is already exist' }));
        } else {
            add_data = await category_tools.addCategory(data_cat);

            res.status(201).json(add_data);
        }
    });

    disconnect(client);


});

app.put('/category/', async (req, res) => {
    const { id_cat, nom, cis_code } = req.body;


    const data_cat = { id_cat: id_cat, nom: nom, cis_code: cis_code }
    var datas;
    var add_data;
    const client = await new MongoClient(url, { useNewUrlParser: true });
    client.connect(async () => {

        datas = await category_tools.getCategory(id_cat);


        if (!datas) {
            res.status(200).end(JSON.stringify({ 'error': ' no category with this id ' }));
        } else {

            add_data = await category_tools.updateCategory(data_cat);

            res.status(201).json(add_data);
        }
    });

    disconnect(client);


})


app.delete('/category/:id', async (req, res) => {

    var id = req.params.id;
    res.setHeader("Content-Type", "application/json; charset=utf-8");

    var removed_category;
    const client = new MongoClient(url, { useNewUrlParser: true });
    await client.connect(() => {


        categorieModel.find({ id_cat: id }, function (err, list_category) {

            removed_category = { 'number_of_delete': list_category.length }

            if (list_category.length > 0) {
                list_category.map((el) => {
                    el.remove();

                });
                res.status(200).end(JSON.stringify(removed_category));
            } else {
                res.status(200).end(JSON.stringify({ 'number_of_delete': 'no category found with this id' }))
            }
        });
    });
    disconnect(client);
});



module.exports = app;