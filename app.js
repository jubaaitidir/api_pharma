//var http = require("http");
var express=require("express");
var cors=require('cors');
const bodyParser = require("body-parser");

var connect_db=require('./tools/connect_mongodb');
var disconnect_db=require('./tools/disconnect_mongodb');
const medicineModel=require('./schemas/medicine');
const categorieModel=require('./schemas/category');

var app=express();

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use(cors({

    origin:"*"
}))

app.get('/index.html',(req,res)=>{
    res.writeHead(200,{"Content-Type":"text/html"});
    res.write("<h1>Bienvenue dans pharma api</h1>");
    res.end();
})

app.get('/',(req,res)=>{
    res.writeHead(200,{"Content-Type":"text/html"});
    res.write("<h1>Bienvenue dans pharma api</h1>");
    res.end();
})
.use('/medicine/:id/',(req,res,next)=>{

    var id=req.params.id;
    id=parseInt(id);
    is_number=Number.isInteger(id);
    if(!is_number){
        res.writeHead(404,{"Content-Type":"text/html"});
        res.end("<h2>Page not found, (id should be an Number)</h2>");
    }
    if(is_number) next();

})
.get('/medicine/:id/',(req,res)=>{
    var id=req.params.id;
    res.writeHead(200,{"Content-Type":"text/html"});
    res.end("<h2> Welcome to Page "+id+"</h2>");
});



//create a medicine

app.post('/medicine/',async(req,res)=>{
    const {id_med}=req.body;
    

    connect_db.connect().catch(console.dir);

    const datas= await medicineModel.create({
        id_med
    });
    disconnect_db.disconnect().catch(console.dir);

    //console.log(id);
    res.status(201).json(datas);

});
// .post('/create/:id',(req,res)=>{
//     var id=req.params.id;
//     //connect_db.run().catch(console.dir);
//     //console.log('.... CRUD FUNCTION...');
//     //disconnect_db.run().catch(console.dir);
//     res.writeHead(201,{"Content-Type":"text/html"});
//     res.end("<h2> The medicine with the "+id+" is created succefully ! </h2>");
// })
// .use((req,res,next)=>{
//     console.log('im at the good not found for post medicine');
//     res.setHeader('Content-Type','text/plain');
//     res.status(404).send(" Page Not Found     ! ");
// })


//create categorie

app.post('/categorie/',async(req,res)=>{
    const {id_cat, nom}=req.body;
    console.log('id categorie :'+id_cat);

    connect_db.connect().catch(console.dir);
    const datas= await categorieModel.create({
        id_cat,
        nom
    });
    disconnect_db.disconnect().catch(console.dir);

    //console.log(id);
    res.status(201).json(datas);

});
app.listen(3010);