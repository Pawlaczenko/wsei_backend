const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

//dla zalogowanego użytkownika
router
    .route('/changePassword')
    .patch(authController.protect, authController.changePassword)

router
    .route('/updateSignedUser')
    .patch(authController.protect, userController.updateSignedUser);

router
    .route('/deleteSignedUser')
    .delete(authController.protect, userController.deleteSignedUser);

//auth //
router
    .route('/register')
    .post(authController.register);

router
    .route('/login')
    .post(authController.login);

router
    .route('/logout')
    .get(authController.protect, authController.logout);


//admin//
router
    .route('/')
    .get(authController.protect, authController.restrict('admin'), userController.getAllUsers);

router
    .route('/:id')
    .get(authController.protect, authController.restrict('admin'),userController.getOneUser)
    .put(authController.protect, authController.restrict('admin'),userController.updateUser)
    .delete(authController.protect, authController.restrict('admin'),userController.deleteUser);

//zewnętrzny route
router
    .route('/getUser/:token')
    .get(authController.getUser);


module.exports = router;