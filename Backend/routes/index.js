const express = require("express");
const router = express.Router();
const User = require('../model/index');
const {registerHandler,loginHandler} = require("../controller/index")
const verifyToken = require("../middleware/jwt")
const {invoiceHandler , customerHandler} = require("../controller/sales")
const {billHandler , vendorHandler} = require("../controller/purchases")
router.get('/', (req, res) =>{
    res.status(200);
    res.send("Hello!")
})

router.post('/register',registerHandler)
router.post('/login',loginHandler)

// router.use(verifyToken)
router.post('/protected',(req ,res)=>{
    res.status(200).send("Hello, you are authenticated!");
})

// router.post('/dashboard',dashboardHandler);
router.post('/sales/customer',customerHandler);
router.post('/sales/invoice', invoiceHandler);
router.post('/purchases/bill', billHandler);
router.post('/purchases/vendor', vendorHandler);
// router.post('/banking/accounts', accountsHandler);
// router.post('/banking/transactions', transactionsHandler);
// router.get('/banking/balance',balanceHandler);

module.exports = router;
