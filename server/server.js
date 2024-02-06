const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const colors = require('colors');
const connectDB = require('./config/connectDB');
const userRoute = require('./routes/userRoute');
const transactionRoute = require('./routes/transactionRoute');
//config dotenv
dotenv.config();

connectDB();

const app = express();


//middlewares
// const corsOptions = {
//     origin: 'https://expense-tracker-sanjay.netlify.app/',
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//   };
const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  };

app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res)=>{
    res.send('Welcome')
    ;
})
                                             
app.use('/api/v1/users', userRoute);
app.use('/api/v1/transactions', transactionRoute);


//port 
const PORT  = process.env.PORT || 8080;

//listen server
app.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}`)
})




