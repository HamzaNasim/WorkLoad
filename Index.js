const express = require('express');
var cors = require('cors');
const app = express();
const Sequelize = require('sequelize');
var nodemailer = require('nodemailer');
app.use(cors());

app.use(express.urlencoded({extended : false}));
app.use(express.json());


//Assigning routes

var userRoutes = require('./api/routes/user');
app.use('/users',userRoutes);






app.use((req , res , next) => {

    const error = new Error('Not found');
    error.status = 404;
    next(error);



})

app.use((error , req , res , next) => {

    res.status(error.status || 500);
    res.json({
        error:{

            message : error.message

        }

    });

})



app.listen(3000,()=>console.log('Listenings 3000'));