const express = require('express');

const userController = require('../controller/userController');

const router = express.Router();

router.get('/', userController.getAllUser);

router.get('/:uid', userController.getUserById);

router.post('/signup', userController.signup);

router.post('/register', userController.register);

router.post('/login', userController.login);

router.patch('/update/provider/:uid', userController.updateProvider);

router.patch('/update/client/:uid', userController.updateClient);

// router.delete('/:uid', userController.deleteUser);

module.exports = router;
