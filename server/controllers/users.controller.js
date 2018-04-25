const User = require('../models/users.model');
const jwt = require('jsonwebtoken');
const decode = require('../helpers/decode-password');

module.exports = {
    signUp: function(req , res){
        let new_user =
        { 
            name: req.body.name,
            email: req.body.email,        
            role: req.body.role,
            password: req.body.password
        }

        User.create(new_user).
        then((user)=>{
            let token = jwt.sign({ role: user.role, email: user.email }, process.env.SECRET);
            res.status(200).json({
                message:'User successfuly registered',
                token: token
            });
        })
        .catch((err)=>{
            if(err.code === 11000){
                res.status(400).json({
                    message:'Please Use another email'
                });
            }else{
                res.status(500).json({
                    message:'Server error'
                });
            }            
        });
    },
    
    signIn: function(req, res){
        let logged_user =
          {
            email: req.body.email,
            password: req.body.password
          }
    
          User.findOne({ email: logged_user.email})
          .then((user)=>{     
            if(decode.verify(logged_user.password, user.password)){

              let token = jwt.sign({ role: user.role, email: user.email }, process.env.SECRET);

              res.status(200).json({
                message:'Succeed login',
                token : token,
                status: 'success',
                role: user.role
              });
            } else {
              res.status(400).json({
                message:'Email/password is invalid',
                status: 'fail'
              });
            }
    
          })
          .catch((err)=>{
            res.status(500).json({
              message:'Server error',
              err: err
            });
          });
      }
}