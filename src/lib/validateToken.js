const jwt = require("jsonwebtoken")


const tokenValidation = (req, res, next)=>{
    const token = req.header("token")
    if(!token) return res.status(401).json("Access denied")
    const payload = jwt.verify(token,process.env.SECRET || "tokentest") 
    req.user = {
        email : payload.email,
        name: payload.name,
        _id: payload._id 
    }
    next()
}
module.exports = {
    tokenValidation
}