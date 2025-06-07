const express = require("express");
const router = express.Router();
const User = require('../model/index');
const {registerHandler,loginHandler} = require("../controller/index")


router.get('/', (req, res) =>{
    res.status(200);
    res.send("Hello!")
})

router.post('/register',registerHandler)
router.post('/login',loginHandler)

module.exports = router;