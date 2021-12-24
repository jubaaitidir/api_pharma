const mongoose = require("mongoose");
//const { NOMEM } = require('dns');

// Replace the following with your Atlas connection string 
                                                                                                                           
const url = "mongodb+srv://pharma:ipssi2021@clusterpharma.dyrrp.mongodb.net/db_pharma?retryWrites=true&w=majority";
//const client = new MongoClient(url);
var db_pharma = mongoose.connect(url, { useNewUrlParser: true });

module.exports ={
connect : async function()  {
    try {
        await mongoose.connection.on('open', () => {
            console.log("Connected correctly to server");
            //console.log('MAKING A CRUD....');

        });

    } catch (err) {
        console.log(err.stack);
    }

}
}

//run().catch(console.dir);

 