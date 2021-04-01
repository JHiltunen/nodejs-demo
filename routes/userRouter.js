//'use strict'; module is strict by default 😉
const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const userController = require('../controllers/userController');

router.route('/')
  .get(userController.user_list_get)
  .post( // email must be an email
    body('name').isLength({ min: 3 }).trim().escape().blacklist(';'),
    body('email').isEmail().normalizeEmail(),
    // password must be at least 5 chars long
    body('password').isLength({ min: 8 }).matches('(?=.*[A-Z]).{8,})').escape().blacklist(';'),
    userController.user_post_new_user);

router.route('/:id')
  .get(userController.user_get_by_id)
  .delete((req, res) => {
    console.log('delete user', req.params);
    res.send('delete user');
  });

module.exports = router;
