// Controller
'use strict';
const userModel = require('../models/userModel');

const users = userModel.users;

const user_list_get = async (req, res) => {
    console.log('get all users from controllers', req.query);
    if (req.query.sort === 'name') {
        const usersSort = await userModel.getAllUsersSort('name');
        res.json(usersSort);
        return;
    }
    
    const users = await userModel.getAllUsers();
    res.json(users);   
}

const user_get_by_id = (req, res) => {
    console.log('get one user by id', req.params);
    res.json(users.find(user => user.id === req.params.id))
};

const user_post_new_user = async (req, res) => {
    console.log('post user', req.body);
    const user = req.body;
    const userid = await userModel.insertUser(user);
    user.id = userid;
    res.json(user);
};  

module.exports = {
  user_list_get,
  user_get_by_id,
  user_post_new_user,
};