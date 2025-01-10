const router = require('express').Router();
const homeController = require('../controllers').home;
const verifyUser = require('../configs/verify');
const pinjamRoutes = require('./Route_Pinjam');

router.get('/', verifyUser.isLogout, homeController.home);

//router.use('/peminjaman', pinjamRoutes);
module.exports = router;