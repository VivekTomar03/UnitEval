const express = require("express")
const { connection } = require("./Config/db")
const { userRouter } = require("./Routes/userRoutes")
const { emiRouter } = require("./Routes/emilRouter")
 


const app = express()
app.use(express.json())
 app.use("/user", userRouter)


 app.use("/emi" , emiRouter)
app.listen(8080, async()=> {
    try {
       await connection
       console.log("you are now connected to mongo db") 
    } catch (error) {
        console.log(error, "error from index line 14")
    }
    console.log("server is running at port 8080")
})