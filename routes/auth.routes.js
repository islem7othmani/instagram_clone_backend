const {register, emailVerification} = require('../controllers/auth.controllers');
const router = require('express').Router();

router.post("/register",register);
router.post("/verifyEmail",emailVerification);


module.exports = router ; 