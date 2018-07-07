const express = require('express');
const app = express();
const Sequelize = require('sequelize');
const User = require('../../models/user');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');




//Create a user 
router.post('/signup', (req, res) => {

    isExist = true;
    User.find({

        where: { email: req.body.email }

    })

        .then(function (User) {

            if (User) {

                isExist = false;
                res.json({

                    message: "Email already in use",

                });

            }
        });


    bcrypt.hash(req.body.password, 10, (err, hash) => {

        if (err) {
            return res.status(500).json({

                error: err

            });
        }

        else {

            User.sync({ force: false }).then(() => {

                if (isExist === true) {


                    User.create({

                        username: req.body.username,
                        FName: req.body.FName,
                        email: req.body.email,
                        password: hash,
                        ContactNo: req.body.ContactNo,
                        temporaryKey: token = jwt.sign({

                            username: req.body.username,
                            email: req.body.email

                        }, process.env.JWT_KEY,

                            {

                                expiresIn: "24h"

                            }

                        ),

                    })

                    // create reusable transporter object using the default SMTP transport
                    // nodemailer.createTestAccount((err, account) => {
                        
                    //     let transporter = nodemailer.createTransport({
                    //         service: "Gmail",
                    //         auth: {
                    //             user: "workload.cs17@gmail.com",
                    //             pass: "Workload12345", 
                    //         }
                    //     });



                   var client = nodemailer.createTransport({

                       service: 'SendGrid',
                       auth: {
                           user: 'hamzacs',
                           pass: 'iad123456'
                       }
                   });

                        var mailOptions = {
                            from: 'support@workload.com',
                            to: req.body.email,
                            subject: 'WorkLoad Activation Link',
                            text: 'Hello , ' + req.body.FName + ' Thank you for the registering . Please Click on activation link below : http://localhost:3000/service/'+token,
                            html: 'Hello <strong>' + req.body.FName + '</strong> , <br/> <br/> Thank You for Registering at WorkLoad . Please activate your account by clicking the link below : <br/><br/><a href="http://localhost:4200/service/'+token+'">http://localhost:3000/activated</a>'
                        };


                        client.sendMail(mailOptions, function (err, info) {
                            if (err) {
                                console.log('error com');
                                console.log(err);
                            }
                            else {
                                console.log('Message sent: ' + info.response);

                            }
                        });
                    
                    res.json({
                        code : 200,
                        message: "Account Registered Successfully ! Please Check your email for activation",
                        temporaryKey : token

                    });
                }


            }).catch(err => {

                res.status(500).json({

                    error: err

                })

            });


        }
    })
    

});


//Login api

router.post("/login", (req, res) => {

    User.find({

        where: { email: req.body.email , active : true }

    })

        .then(function (User) {

            if (User < 1) {


                return res.json({

                    message: "Invalid email or Account not activated",

                });

            }
      
            bcrypt.compare(req.body.password, User.password, (err, result) => {

                if (err) {

                    return res.json({

                        message: "Invalid email or Password"
                    });


                }

                if (result) {

                    const token = jwt.sign({

                        email: User.email

                    }, process.env.JWT_KEY,

                        {

                            expiresIn: "1h"

                        }

                    );

                    return res.json({
                        message: "Login Successfully ! Redirecting ..... ",
                        code : 200,
                        token: token
                    });

                }

                res.json({

                    message: "Email or password incorrect"
                });


            });



        });



});



///get api for all users

router.get('/', (req, res) => {


    User.all().then(function (User) {

        res.send(User)

    }

    )

});


//get api for user with params

router.get('/username/:username', (req, res) => {


    User.findOne({

        where: { username: req.params.username }

    }).then(function (User) {

        res.send(User)
    }

        )

});





//Mail Testing







//Activation api

router.put('/activated/:tok', (req, res) => {

    User.findOne({

        where: { temporaryKey: req.params.tok }

    })
        .then(function (User) {
        
            var token = req.params.tok;

            jwt.verify(token, process.env.JWT_KEY, function (err, decoded) {

                if (err) {

                    res.json({ success: false, message: 'Activation Link has been expired' });
                }

                else if (!User) {

                    res.json({ success: false, message: 'Activation Link has been expired' });
                }

                else {

                    User.update({

                        temporaryKey : false,
                        active : true
                      
                    }).then(() => { })
                  

                    var client = nodemailer.createTransport({

                        service: 'SendGrid',
                        auth: {
                            user: 'hamzacs',
                            pass: 'iad123456'
                        }
                    });

                        var mailOptions = {
                            from: 'support@workload.com',
                            to: User.email,
                            subject: 'WorkLoad Acount Activated',
                            text: 'Hello , ' + User.FName + 'Your account has been activated successfully ',
                            html: 'Hello <strong>' + User.FName + '</strong> , <br/> <br/> Your account has been activated successfully.'
                        };

                        client.sendMail(mailOptions, function (err, info) {
                            if (err) {
                                console.log('error com');
                                console.log(err);
                            }
                            else {
                                console.log('Message sent: ' + info.response);

                            }
                        });

                        

                        res.json({ success: true, code : 200 ,message: 'Account Activated Successfully! Redirecting .....' });
                    }


            })
        });

})

module.exports = router;