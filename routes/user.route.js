const express = require("express")
const { UserModel } = require("../model/user.model")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRouter = express.Router()

userRouter.post("/register" , async(req,res) => {
    const {name, email, password, gender} = req.body
  
    try {
        bcrypt.hash(password, 5, async(err, hash)=> {
            if(err){
                res.send({
                    error:err.message,
                    msg:"unable to hash"
                })
            }
            else {
                const data = new UserModel({email, password:hash, name, gender})
                await data.save()
                res.send({
                   msg:"user created"
                })
            }
        });

       
    } catch (error) {
        res.send({
            err:error.message,
            msg:"unable to register"
        })
    }
})

userRouter.post("/login"  , async(req,res) => {
    const {email,password} = req.body
    try {
         const data = await UserModel.findOne({email})

         if(data){
           const token = jwt.sign({ postID: data._id , owner:data.name }, 'vivek');
            bcrypt.compare(password, data.password, (err, result)=>  {
               if(result){
                  res.send({
                    msg:"user login done",
                    token
                  })
               }
            });
         }
         else {
            res.send({
                error:err.message
            })
         }
       
    } catch (error) {
        res.send({
            err:error.message
        })
    }
})


module.exports = {
    userRouter
}