const router = require('express').Router();
const bukuController = require('../controllers').buku;
const verifyUser = require('../configs/verify');


router.get('/', verifyUser.isLogin, bukuController.getBuku);
router.get('/addBuku', verifyUser.isLogin, bukuController.formBuku);
router.post('/save', verifyUser.isLogin, bukuController.saveBuku);
router.get('/edit/:id_buku', verifyUser.isLogin, bukuController.editBuku);
router.post('/update/:id_buku', verifyUser.isLogin, bukuController.updateBuku);
router.get('/hapus/:id_buku', verifyUser.isLogin, bukuController.deleteBuku);

module.exports = router;