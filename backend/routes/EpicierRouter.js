var express = require('express');
var router = express.Router();
const EpicierCtrl = require('../controllers/EpicierCtrl')



router.post('/Register', EpicierCtrl.register);
router.post('/Login', EpicierCtrl.login);
router.get('/getEpicier/:id', EpicierCtrl.getEpicier);
router.patch('/validate/:id', EpicierCtrl.validEpicier);
router.get('/EpicierInvalid', EpicierCtrl.getEpicierInvalid)
router.get('/CountEpicier', EpicierCtrl.CountEpicier)
router.patch('/update/:id', EpicierCtrl.UpdateEpicier);
router.delete('/deleteEpicier/:id', EpicierCtrl.deleteEpicier)
router.get('/logout', EpicierCtrl.LogOut)


module.exports = router;