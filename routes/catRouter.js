//'use strict'; module is strict by default
const express = require('express');
const router = express.Router();
const catController = require('../controllers/catController');

router.route('/')
    .get(catController.cat_list_get)

    .post((req, res) => {
        console.log('post cat');
        res.send('post cat')
    })

router.route('/:id')
    .get(catController.cat_get_by_id)
    .get((req, res) => {
        console.log('get one cat by id', req.params)
        res.send(`Hello Cat with id ${req.params.id}!`);
    })

    .put((req, res) => {
        console.log('put cat', req.params);
        res.send('put cat')
    })

    .delete((req, res) => {
        console.log('delete cat', req.params);
        res.send('delete cat')
    })

module.exports = router;