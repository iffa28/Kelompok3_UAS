const router = require('express').Router();
const bukuController = require('../controllers').buku;
const verifyUser = require('../configs/verify');


router.get('/', verifyUser.isLogin, bukuController.getBuku);
router.get('/buku/addBuku', verifyUser.isLogin, bukuController.formBuku);
router.post('/buku/save', verifyUser.isLogin, bukuController.saveBuku);


module.exports = router;