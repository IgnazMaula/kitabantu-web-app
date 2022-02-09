const express = require('express');

const fileUpload = require('../middleware/file-upload');
const userController = require('../controller/userController');

const router = express.Router();

router.get('/', userController.getAllUser);

router.get('/:uid', userController.getUserById);

router.post('/signup', userController.signup);

router.post('/register', userController.register);

router.post('/login', userController.login);

router.patch('/update/provider/:uid', userController.updateProvider);

router.patch('/update/client/:uid', userController.updateClient);

router.patch('/update/profile-picture/:uid', fileUpload.single('image'), userController.updateProfilePicture);

// router.delete('/:uid', userController.deleteUser);

module.exports = router;
