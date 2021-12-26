//var http = require("http");
var express = require("express");
var cors = require('cors');


const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const MongoClient = require('mongodb').MongoClient;

var tools_medicine = require('./tools/medicine_tools');
var connect_db = require('./tools/connect_mongodb');


const url = "mongodb+srv://pharma:ipssi2021@clusterpharma.dyrrp.mongodb.net/db_pharma?retryWrites=true&w=majority";



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
        // console.log(id.length);    
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
        //res.end("<h2> Welcome to Page " + id + "</h2>");

        const client = await new MongoClient(url, { useNewUrlParser: true });

        client.connect(async () => {
            
            const datas = await tools_medicine.getMedicine(id);
            if (datas) {
                res.status(200).json(datas);
            } else {
                res.status(200).json({ 'error': 'no medicine with this id' });
            }
        });
    });





app.post('/medicine/', async (req, res) => {
    const { id_med, cat } = req.body;
    //var id = req.params.id;

    const data_med = { id_med: id_med, cat: cat }
    var datas;
    var add_data;
    const client = await new MongoClient(url, { useNewUrlParser: true });
    client.connect(async () => {
        //const collection = client.db("db_pharma").collection("medecines");
        //console.log(medicine_tools.getMedicine(id_med))
        datas = await medicine_tools.getMedicine(id_med);
        console.log(datas);

        if (datas) {
            res.status(200).end(JSON.stringify({ 'error': 'medicine with this id is already exist' }));
        } else {
            add_data = await tools_medicine.addMedicine(data_med);
            console.log('im in connect' + datas);
            res.status(201).json(add_data);
        }
    });

    disconnect(client);

});



app.delete('/medicine/:id', async (req, res) => {
    //const {id_med} = req.body;
    var id = req.params.id;
    res.setHeader("Content-Type", "application/json");
    console.log(id);
    var removed_medicine;
    const client = new MongoClient(url, { useNewUrlParser: true });
    await client.connect(() => {
        //const collection = client.db("db_pharma").collection("medecines");



        medicineModel.find({ id_med: id }, function (err, medicine) {
            console.log(medicine.length);
            removed_medicine = { 'number_of_delete': medicine.length }
            console.log(removed_medicine)
            if (medicine.length > 0) {
                medicine.map((el) => {
                    el.remove();
                    console.log('remove element');
                });
                res.status(200).end(JSON.stringify(removed_medicine));
            } else {
                res.status(200).end(JSON.stringify({ 'number_of_delete': 'no medicine found with this id' }))
            }
        });



    });
    disconnect(client);
});


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
        // console.log(id.length);    
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
        //res.end("<h2> Welcome to Page " + id + "</h2>");

        const datas = await category_tools.getCategory(id);
        if (datas) {
            res.status(200).json(datas);
        } else {
            res.status(200).json({ 'error': 'no category with this id' });
        }
    });





app.post('/category/', async (req, res) => {
    const { id_cat, nom } = req.body;

    const data_cat = { id_cat: id_cat, nom: nom }
    var datas;
    var add_data;
    const client = await new MongoClient(url, { useNewUrlParser: true });
    client.connect(async () => {

        datas = await category_tools.getCategory(id_cat);
        console.log(datas);

        if (datas) {
            res.status(200).end(JSON.stringify({ 'error': 'category with this id is already exist' }));
        } else {
            add_data = await category_tools.addCategory(data_cat);
            //console.log('im in connect' + datas);
            res.status(201).json(add_data);
        }
    });

    disconnect(client);


});


app.delete('/category/:id', async (req, res) => {
    //const {id_med} = req.body;
    var id = req.params.id;
    res.setHeader("Content-Type", "application/json");
    console.log(id);
    var removed_category;
    const client = new MongoClient(url, { useNewUrlParser: true });
    await client.connect(() => {
        //const collection = client.db("db_pharma").collection("medecines");

        categorieModel.find({ id_cat: id }, function (err, list_category) {
            console.log(list_category.length);
            removed_category = {'number_of_delete': list_category.length}
            console.log(removed_category)
            if (list_category.length > 0) {
                list_category.map((el) => {
                    el.remove();
                    console.log('remove element');
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