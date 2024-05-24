const express = require('express');
// const { check } = require('express-validator');
const authController = require('../controllers/authController');
const router = express.Router();

router.post(
  '/register',
  
  authController.register
);

router.post(
  '/login',
  
  authController.login
);

router.post('/logout', authController.logout);

module.exports = router;
