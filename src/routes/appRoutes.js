const router = require('express').Router();
const homeController = require('../controllers').home;
const bukuController = require('../controllers').buku;
const verifyUser = require('../configs/verify');

router.get('/', verifyUser.isLogin, homeController.home);
router.get('/buku', verifyUser.isLogin, bukuController.getBuku);

module.exports = router;