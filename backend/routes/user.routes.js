const express = require('express');
const router = express.Router();
const {body} = require('express-validator');

const UserController = require('../controller/user.controller');
const authMiddleware = require("../middleware/authmiddleware");



router.post('/register',[
    body('email').isEmail().withMessage('Invalid email'),
    body('fullname.firstname').isLength({min:3}).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long'),
],UserController.register)


router.post("/login",[

    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long'),
],
    UserController.login
)


router.post("/logout",authMiddleware.authUser,UserController.logout);
router.get("/profile",authMiddleware.authUser,UserController.profile);


module.exports = router;