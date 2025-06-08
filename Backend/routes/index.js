const express = require("express");
const router = express.Router();
const User = require('../model/index');
const {registerHandler,loginHandler} = require("../controller/index")
const verifyToken = require("../middleware/jwt")

router.get('/', (req, res) =>{
    res.status(200);
    res.send("Hello!")
})

router.post('/register',registerHandler)
router.post('/login',loginHandler)

router.use(verifyToken)
router.post('/protected',()=>{
    res.status(200).send("Hello, you are authenticated!");
})

module.exports = router;