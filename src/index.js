const express = require("express")
const cors = require("cors")
const users = require("./routes/users.routers")
const PORT = process.env.PORT || 3001
const app = express()
app.use(express.json())
//use routes


app.use(cors());


app.use("/user",users)


//server
app.listen(PORT,()=>{
    console.log(`server on port ${PORT}`)
});