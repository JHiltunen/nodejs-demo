//'use strict'; module is strict by default
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log('get cat')
    res.send('Hello Cat!');
})

router.put('/', (req, res) => {
    console.log('put cat');
    res.send('put cat')
})

router.post('/', (req, res) => {
    console.log('post cat');
    res.send('post cat')
})

router.delete('/', (req, res) => {
    console.log('delete cat');
    res.send('delete cat')
})

module.exports = router;