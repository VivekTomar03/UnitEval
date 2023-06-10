const express = require("express")
const bcrypt = require('bcrypt');
const { UserModal } = require("../Model/userModal");
const jwt = require('jsonwebtoken');
const userRouter = express.Router()

userRouter.post("/add" , async(req,res) => {
    const {name, email,password} = req.body
    try {
        bcrypt.hash(password, 5, async(err, hash)=>  {
             if(err){
                res.send("something wrong while hashing line 10")
             }
             else {
                const user = new UserModal({name,email, password:hash})
                await user.save()
                res.send({
                    message:"user created successfully"
                })

             }
        });
    } catch (error) {
        res.send({
            message:"something went wrong while creating user line 24",
            err:error.message
        })
    }
})


userRouter.post("/login" , async(req,res) => {
    const {email, password} = req.body
    try {
        const data = await UserModal.findOne({email})
       if(data){
         console.log(data)
         const token = jwt.sign({ userID: data._id }, 'vivek');
         console.log(token)
         bcrypt.compare(password, data.password, (err, result)=> {
            if(result){
                res.send({
                    message:"user login successfully",
                    token
                })
            }
            else {
                 res.send({
                    message:"something wrong while login line 47",
                    error:err
                 })
            }
        });
       }

    } catch (error) {
        res.send({
            message:"something wrong while login line 56",
            err:error.message
         })
    }
 })
module.exports = {
    userRouter
}