'use strict';
const catModel = require('../models/catModel');
const {validationResult} = require('express-validator');
const resize = require('../utils/resize');

const cats = catModel.cats;


const cat_list_get = async (req, res) => {
    console.log('get all cats from controllers', req.query);
    if (req.query.sort === 'age') {
        const catsSort = await catModel.getAllCatsSort('age');
        res.json(catsSort);
        return;
    } else if (req.query.sort === 'name') {
        const catsSort = await catModel.getAllCatsSort('name');
        res.json(catsSort);
        return;
    }
    
    const cats = await catModel.getAllCats();
    res.json(cats);   
}

const cat_get_by_id = (req, res) => {
    console.log('get one cat by id', req.params);
    res.json(cats.find(cat => cat.id === req.params.id))
};

const cat_post_new_cat = async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // create thumbnail
    await resize.makeThumbnail(
        req.file.path,
        'thumbnails/' + req.file.filename,
        {width: 160, height: 160},
    );

    const params = [
        req.body.name,
        req.body.age,
        req.body.weight,
        req.body.owner,
        req.file.filename,
    ];
    
    const response = await catModel.insertCat(params);
    res.json(response);
};  

const cat_update_cat = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    console.log('update cat', req.body);
    const cat = req.body;
    const catid = await catModel.updateCat(cat);
    cat.id = catid;
    res.json(cat);
};

const cat_delete_cat = async (req, res) => {
    console.log('delete cat', req.params.id);
    const id = req.params.id;
    const succes = await catModel.deleteCat(id);
    res.json(succes);
};

module.exports = {
  cat_list_get,
  cat_get_by_id,
  cat_post_new_cat,
  cat_update_cat,
  cat_delete_cat,
};