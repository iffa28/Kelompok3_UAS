const router = require('express').Router();
const adminController = require('../controllers').Admin;
const reportController = require('../controllers').report;
const verifyUser = require('../configs/verify');

router.get('/', verifyUser.isLogin, adminController.home_admin);
router.post('/save', verifyUser.isLogin, adminController.saveBuku);
router.get('/report', verifyUser.isLogin, reportController.getReport);
router.get('/edit/:id_buku', verifyUser.isLogin, adminController.editBuku);
router.post('/update/:id_buku', verifyUser.isLogin, adminController.updateBuku);
router.post('/delete/:id_buku', verifyUser.isLogin, adminController.deleteBuku);

router.get('/logout', verifyUser.isLogin, adminController.logout);

module.exports = router;