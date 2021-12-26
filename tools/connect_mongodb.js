const mongoose = require("mongoose");
//const { NOMEM } = require('dns');

// Replace the following with your Atlas connection string 

const url = "mongodb+srv://pharma:ipssi2021@clusterpharma.dyrrp.mongodb.net/db_pharma?retryWrites=true&w=majority";
//const client = new MongoClient(url);
//var myConnection;
mongoose.connect(url, { useNewUrlParser: true });

module.exports = {
    connect: async ()=> {
        try {
            //var db_pharma = mongoose.connect(url, { useNewUrlParser: true });
            //await
            await mongoose.connection.on(() => {
                console.log("Connected correctly to server");
                //console.log('MAKING A CRUD....');

            });

        } catch (err) {
            console.log(err.stack);
        }

    },


    disconnect: async function () {
        try {
            await mongoose.connection.close().then(()=>console.log("disconnection ..."));

            //await 
            // mongoose.connection.close('close', () => {
            //     console.log("disco from the server");
            // });

        } catch (err) {
            console.log(err.stack);
        }

    }
}

//run().catch(console.dir);

