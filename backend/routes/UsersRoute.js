var express = require('express');
var router = express.Router();
const userCtrl = require('../controllers/ClientCtrl')



router.post('/UserRegister', userCtrl.register);

// router.patch('/update', authSeller, SellerCtrl.resetPassword);

router.post('/UserLogin', userCtrl.login);
// router.get('/getAllSeller', SellerCtrl.getAllSeller);

// router.patch('/valid/:id', SellerCtrl.validSeller);

// router.get('/logout', SellerCtrl.sellerSignout)


module.exports = router;