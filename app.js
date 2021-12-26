//var http = require("http");
var express = require("express");
var cors = require('cors');

var tools_medicine = require('./tools/medicine_tools');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const MongoClient = require('mongodb').MongoClient;

var connect_db = require('./tools/connect_mongodb');
var disconnect_db = require('./tools/disconnect_mongodb');

const url = "mongodb+srv://pharma:ipssi2021@clusterpharma.dyrrp.mongodb.net/db_pharma?retryWrites=true&w=majority";
//const client = new MongoClient(url);
//var myConnection;
//mongoose.connect(url, { useNewUrlParser: true });


const medicineModel = require('./schemas/medicine');
const categorieModel = require('./schemas/category');




var app = express();

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(cors({

    origin: "*"
}))

app.get('/index.html', async (req, res) => {
    //res.writeHead(200,{ "Content-Type": "text/plain" });
    res.setHeader('Content-Type', 'application/json');
    //res.write("<h1>Bienvenue dans pharma api</h1>");
    //res.end();
    const datas = await tools_medicine.getAll();
    //console.log(datas[0]);
    //res.write(JSON.stringify(datas));
    res.status(200).end(JSON.stringify(datas));
})

app.get('/', (req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<h1>Bienvenue dans pharma api</h1>");
    res.end();
})
    .use('/medicine/:id/', (req, res, next) => {

        var id = req.params.id;
        id = parseInt(id);
        is_number = Number.isInteger(id);
        if (!is_number) {
            res.writeHead(404, { "Content-Type": "text/html" });
            res.end("<h2>Page not found, (id should be an Number)</h2>");
        }
        if (is_number) next();

    })
    .get('/medicine/:id/', async (req, res) => {
        var id = req.params.id;
        res.setHeader("Content-Type", "application/json");
        //res.end("<h2> Welcome to Page " + id + "</h2>");
        const datas = await tools_medicine.getMedicine(id);
        res.status(200).end(JSON.stringify(datas));
    });



//create a medicine

app.post('/medicine/', async (req, res) => {
    const { id_med, cat } = req.body;
    //var id = req.params.id;
    const data_med = { id_med: id_med, cat: cat }
    var datas;
    const client = await new MongoClient(url, { useNewUrlParser: true });
    client.connect(async () => {
        //const collection = client.db("db_pharma").collection("medecines");

        datas = await tools_medicine.addMedicine(data_med);
        console.log('im in connect' + datas);
        res.status(201).json(datas);
    });
    //do stuff
    // const datas = await medicineModel.create({
    //     id_med, cat
    // });

    disconnect(client);




});
function disconnect(client) {
    client.close().then(() => console.log("disconnection.......")).catch(err => console.log(err));

}

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
            if (removed_medicine) {
                medicine.map((el) => {
                    el.remove();
                    console.log('remove element');
                });
                res.status(200).end(JSON.stringify(removed_medicine));
            }else{
                console.log(err);
            }
        });



    });
    disconnect(client);




});


//create categorie

app.post('/categorie/', async (req, res) => {
    const { id_cat, nom } = req.body;
    console.log('id categorie :' + id_cat);

    connect_db.connect().catch(console.dir);
    const datas = await categorieModel.create({
        id_cat,
        nom
    });
    res.status(201).json(datas);
    disconnect_db.disconnect().catch(console.dir);

    //console.log(id);


});
app.listen(3010);