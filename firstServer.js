var http=require("http");
var express=require("express");
var app=express();

// var server=http.createServer(function(req,res){
//     res.writeHead(200);
//     res.end("Hello <strong> world </strong>");

// });


app.get('/',(req,res)=>{
    res.writeHead(200,{"Content-Type":"text/html"});
    res.write("<h1>Bienvenue dans pharma api</h1>");
    res.end();
});

app.get('/index.html',(req,res)=>{
    res.writeHead(200,{"Content-Type":"text/html"});
    res.write("<h1>Bienvenue dans pharma api</h1>");
    res.end();
});

app.listen(3010);