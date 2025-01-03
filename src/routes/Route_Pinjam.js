const router = require('express').Router();
const pinjamController = require('../controllers').peminjaman;
const verifyUser = require('../configs/verify');

router.get('/', verifyUser.isLogin, pinjamController.peminjaman);
router.post('/save', verifyUser.isLogin, pinjamController.savePinjam);

module.exports = router;