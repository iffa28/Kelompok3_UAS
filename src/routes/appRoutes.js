const router = require('express').Router();
const homeController = require('../controllers').home_admin;
const homeUserController = require('../controllers').home_user;
const bukuController = require('../controllers').buku;
const verifyUser = require('../configs/verify');

router.get('/', verifyUser.isLogin, homeController.home_admin);
router.get('/home_user', verifyUser.isLogin, homeUserController.home_user);
router.get('/buku', verifyUser.isLogin, bukuController.getBuku);

module.exports = router;