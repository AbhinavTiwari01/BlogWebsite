import express from 'express';
import Connection from './database/db.js';
import dotenv from 'dotenv';
import Router from './Routing/routes.js'
import cors from 'cors';
import bodyParser from 'body-parser';


const app = express();

app.use(cors());

app.use(bodyParser.json({extended : true}));

app.use(bodyParser.urlencoded({extended : true}));


app.use('/', Router);

dotenv.config();

const username= process.env.DB_USERNAME
const password= process.env.DB_PASSWORD;

Connection(username, password);



app.listen(8080, ()=>{
    console.log("Server is running on port 8080");
})