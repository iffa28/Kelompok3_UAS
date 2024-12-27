const router = require('express').Router();
const registerControllers = require('../controllers').register;
const verifyUser = require('../configs/verify');

router.get('/', verifyUser.isLogout, registerControllers.formRegister);
router.post('/save', verifyUser.isLogout, registerControllers.saveRegister);

module.exports = router;