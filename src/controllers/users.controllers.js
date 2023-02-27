const conn = require("../config/connection")
const jwt = require("jsonwebtoken")

const register = (req,res)=>{
    const {name,lastName,date,password,email} = req.body
    const querySearchUserSQL = `SELECT * FROM users WHERE email = '${email}'`
    const queryIntroSQL = `INSERT INTO users ( name, last_name, date, password, email) VALUES ("${name}", "${lastName}", "${date}", "${password}", "${email}")`
    
    try{
        if(name.length || lastName.length || date.length || password.length || email.length){
        conn.query(querySearchUserSQL,function(err,result){
            if(err) throw err
            if(!result.length){
                conn.query(queryIntroSQL)
                res.send(true)
            }else{
                res.send("this email is used")
            }
        })}else{
            res.send("missing data")
        }
    }catch(e){
        res.status(400).send(e)
    }
}

const postLogin = async (req, res)=>{
    const {email, password } = req.body
    const querySearchUserSQL = `SELECT * FROM users WHERE email = '${email}'`
    try{
        conn.query(querySearchUserSQL,async function(err,result){
            const {name,id,email} = result[0]
            console.log(name)
        const passwordCorrect = result[0].password === password
        if(!(result[0] && passwordCorrect)){
            res.status(401).json({
                error:"invalid user or password"
            })
        }else{
            const userForToken = {
                id,
                name,
                email
            }
            const token = jwt.sign(userForToken, process.env.SECRET || "tokentest")
            res.header("token", token).json({
                name,
                email,
                token
            })
        }
        })
    }catch(e){
        res.status(400).send(e)
    }
    
}

module.exports = {
    register,
    postLogin    
}