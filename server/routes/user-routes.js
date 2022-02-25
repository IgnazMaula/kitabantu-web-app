const express = require('express');

const fileUpload = require('../middleware/file-upload');
const userController = require('../controller/userController');

const router = express.Router();

router.get('/', userController.getAllUser);

router.get('/provider-and-client', userController.getProviderAndClient);

router.get('/:uid', userController.getUserById);

router.get('/bookmarks/:uid', userController.getBookmark);

router.post('/signup', userController.signup);

router.post('/register', userController.register);

router.post('/login', userController.login);

router.patch('/update/provider/:uid', userController.updateProvider);

router.patch('/update/client/:uid', userController.updateClient);

router.patch('/update/profile-picture/:uid', fileUpload.single('image'), userController.updateProfilePicture);

router.patch('/update/client-status/:uid', userController.updateUserActive);

router.patch('/update/add-bookmarks/:uid', userController.addBookmark);

router.patch('/update/remove-bookmarks/:uid', userController.removeBookmark);

// router.delete('/:uid', userController.deleteUser);

module.exports = router;
