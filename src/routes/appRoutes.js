const router = require('express').Router();
const homeController = require('../controllers').home_admin;
const homeUserController = require('../controllers').peminjaman;
const bukuController = require('../controllers').buku;
const verifyUser = require('../configs/verify');
const pinjamRoutes = require('./Route_Pinjam');

router.get('/', verifyUser.isLogin, homeController.home_admin);
router.get('/peminjaman', verifyUser.isLogin, homeUserController.peminjaman);
router.get('/buku', verifyUser.isLogin, bukuController.getBuku);


router.use('/peminjaman', pinjamRoutes)
module.exports = router;