const express = require('express');
const router = express.Router();
const { loginUser, logoutUser, userAuthentication, signUpUser, createUser } = require('../controllers/auth');

router.get('/signup', signUpUser)
router.get('/login', loginUser)
router.get('/logout', logoutUser)
router.post('/authenticate-user', userAuthentication)
router.post('/create-user', createUser)

module.exports = router