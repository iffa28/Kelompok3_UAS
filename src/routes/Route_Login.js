const router = require('express').Router();
const loginControllers = require('../controllers').login;
const verifyUser = require('../configs/verify');

router.get('/', verifyUser.isLogout, loginControllers.login);
router.get('/logout', loginControllers.logout);

router.post('/auth', loginControllers.loginAuth);

module.exports = router;