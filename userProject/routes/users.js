const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router
    .route('/register')
    .post(authController.register);

router
    .route('/login')
    .post(authController.login);

router
    .route('/')
    .get(userController.getAllUsers);

router
    .route('/:id')
    .get(userController.getOneUser)
    .put(userController.updateUser)
    .delete(userController.deleteUser);


module.exports = router;