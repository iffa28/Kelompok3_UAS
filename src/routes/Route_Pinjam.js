const router = require('express').Router();
const pinjamController = require('../controllers').peminjaman;
const verifyUser = require('../configs/verify');

router.post('/save', verifyUser.isLogin, pinjamController.savePinjam);

module.exports = router;