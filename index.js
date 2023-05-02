const express = require("express")
const { connection } = require("./config/db")
const { userRouter } = require("./routes/user.route")
const { postRouter } = require("./routes/post.route")
const auth = require("./middleware/auth")
const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json())
app.use("/users" , userRouter)

//protected routes
app.use(auth)
app.use("/posts", postRouter)

app.listen(8080, async() => {
     try {
        await connection
        console.log("connected to DB");
     } catch (error) {
        console.log(error);
     }

    console.log("server running on port 8080");
})