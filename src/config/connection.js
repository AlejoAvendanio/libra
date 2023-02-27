var mysql = require("mysql")
var conn = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"libra"
})
conn.connect(
    (err)=>{
        if(!err){
            console.log("established connection")
        }else{
            console.log("fail connection")
        }
    }
)

module.exports = conn