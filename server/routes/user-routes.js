const express = require('express');

const userController = require('../controller/user-controller');

const router = express.Router();

router.get('/', userController.getAllUser);

router.get('/:uid', userController.getUserById);

module.exports = router;
