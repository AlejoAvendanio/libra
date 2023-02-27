const express = require("express")
const {register, postLogin} = require("../controllers/users.controllers")
const tokenValidation = require("../lib/validateToken") 
const router = express.Router();



router.post("/postUser",register)
router.post("/loginUser",postLogin)



module.exports = router