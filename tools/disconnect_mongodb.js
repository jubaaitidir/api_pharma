const mongoose = require("mongoose");


// Replace the following with your Atlas connection string 
                                                                                                                           
const url = "mongodb+srv://pharma:ipssi2021@clusterpharma.dyrrp.mongodb.net/db_pharma?retryWrites=true&w=majority";
//const client = new MongoClient(url);
var db_pharma = mongoose.connect(url, { useNewUrlParser: true });


module.exports={
disconnect : async function () {
    try {
        await mongoose.connection.close('close', () => {
            console.log("disco from the server");
        });

    } catch (err) {
        console.log(err.stack);
    }
  
}
}
//run().catch(console.dir)

