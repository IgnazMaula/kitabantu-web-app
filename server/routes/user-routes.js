const express = require('express');

const userController = require('../controller/userController');

const router = express.Router();

router.get('/', userController.getAllUser);

router.get('/:uid', userController.getUserById);

router.post('/', userController.createUser);

router.patch('/:uid', userController.updateUser);

router.delete('/:uid', userController.deleteUser);

module.exports = router;
