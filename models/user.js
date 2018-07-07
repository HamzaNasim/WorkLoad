const Sequelize = require('sequelize');
const db = require('../db');

// const user = db.define('hamza', {

//     name:{
//         type:Sequelize.STRING
//     },
//     email:{
//         type:Sequelize.STRING
//     }

// });


//Create Item Table Structure
const Item = db.define('UsersRegistered', {
   
                id: {
                        type: Sequelize.INTEGER,
                        primaryKey: true,
                        autoIncrement: true
                },
                username : {
                        type: Sequelize.STRING
                },
                  FName: {
                        type: Sequelize.STRING
                },
                email: {
                        type: Sequelize.STRING,
                        
                },
                password: {
                        type: Sequelize.STRING
                },
                 ContactNo : {
                        type: Sequelize.STRING
                },

                active : {

                        type : Sequelize.BOOLEAN,
                        require : true ,
                       defaultValue : false
                },

                temporaryKey  : {
                        
                       type : Sequelize.STRING,
                        require : true ,

                }   
  
});



module.exports = Item;