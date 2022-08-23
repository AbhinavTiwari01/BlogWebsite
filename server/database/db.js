import mongoose from 'mongoose';


const Connection = async (username, password) => {

    const URL= `mongodb://${username}:${password}@crud-app-shard-00-00.0ihah.mongodb.net:27017,crud-app-shard-00-01.0ihah.mongodb.net:27017,crud-app-shard-00-02.0ihah.mongodb.net:27017/PROJECT1?ssl=true&replicaSet=atlas-12hxyj-shard-0&authSource=admin&retryWrites=true&w=majority`;

    try{

       await mongoose.connect(URL, {useUnifiedTopology : true, useNewUrlParser : true });
       console.log("Database Connected Successfully")


    }catch(err){
        console.log("Error while connecting with the database", err)
    }

}

export default Connection;
