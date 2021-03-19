// Controller
'use strict';
const catModel = require('../models/catModel');

const cats = catModel.cats;

const cat_list_get = (req, res) => {
    console.log('get all cats from controllers', req.query);
    if (req.query.sort == 'age') {
        const catsSort = cats.slice().sort((catA, catB) => catA.age - catB.age)
        res.json(catsSort);
        return;
    }
    res.json(cats);
};

module.exports = {
  cat_list_get,
};