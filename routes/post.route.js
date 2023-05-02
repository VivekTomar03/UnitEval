const express = require("express")
const { PostModel } = require("../model/post.model")

const postRouter = express.Router()


postRouter.get("/" , async(req,res) => {
    const device = req.query.device
    const device1 = req.query.device1
    const device2 = req.query.device2
      try {
        if(device){
            const data = await PostModel.find({device})
            res.send(data)
        }
    else if(device1 && device2){
        const data = await PostModel.find({$or:[{device:device1}, {device:device2}]})
        res.send(data)
    }
    else {
        const data = await PostModel.find()
        res.send(data)
    }

      } catch (error) {
        res.send({
            err:error.message
        })
      }
})

postRouter.post("/create" , async(req,res) => {
    try {
        const data = new PostModel(req.body)
        await data.save()
        res.send({
            msg:"post created done"
        })
    } catch (error) {
        res.send({
            err:error.message
        })
    }
})

postRouter.patch("/update/:postID" , async(req,res) => {
    const {postID} = req.params
    try {
        // console.log(postID);
        const data = await PostModel.findOne({_id:postID})
        // console.log(data.postID);
        if( req.body.postID != data.postID){
            res.send({
                msg:"you are not authorize "
            })
        }
        else {
            await PostModel.findByIdAndUpdate({_id:postID}, req.body)
            res.send({
                msg:"post updated"
            })
        }
    } catch (error) {
        res.send({
            err:error.message
        })
    }
})


postRouter.delete("/delete/:postID" , async(req,res) => {
    const {postID} = req.params
    try {
        // console.log(postID);
        const data = await PostModel.findOne({_id:postID})
        // console.log(data.postID);
        if( req.body.postID != data.postID){
            res.send({
                msg:"you are not authorize"
            })
        }
        else {
            await PostModel.findByIdAndDelete({_id:postID}, req.body)
            res.send({
                msg:"post deleted"
            })
        }
    } catch (error) {
        res.send({
            err:error.message
        })
    }
})

module.exports = {
    postRouter
}