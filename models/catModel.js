// Model (usually gets data from database, in this case data is hard coded)
'use strict';

const pool = require('../database/db');
const promisePool = pool.promise();

const getAllCats = async () => {
  try {
    // TODO: do the LEFT (or INNER) JOIN to get owner name too.
    const [rows] = await promisePool.execute('SELECT wop_cat.*, wop_user.name AS ownername FROM wop_cat INNER JOIN wop_user ON owner = wop_user.user_id');
    console.log('something back from db?', rows);
    return rows;
  } catch (e) {
    console.error('error', e.message);
  }
};

const getAllCatsSort = async (order) => {
  try {
    // TODO: do the LEFT (or INNER) JOIN to get owner name too.
    const [rows] = await promisePool.execute(`SELECT wop_cat.*, wop_user.name AS ownername FROM wop_cat INNER JOIN wop_user ON owner = wop_user.user_id ORDER BY ${order}`);
    return rows;
  } catch (e) {
    console.error('error', e.message);
  }
};

const getCat = async (id) => {
  try {
    // TODO: do the LEFT (or INNER) JOIN to get owner name too.
    console.log('catModel getCat', id);
    
    const [rows] = await promisePool.execute('SELECT wop_cat.*, wop_user.name AS ownername FROM wop_cat INNER JOIN wop_user ON owner = wop_user.user_id WHERE cat_id = ?', [id]);
    return rows[0];
  } catch (e) {
    console.error('catModel:', e.message);
  }
};

const insertCat = async (params) => {
  try {
    const [rows] = await promisePool.execute('INSERT INTO wop_cat (name, age, weight, owner, filename, coords) VALUES (?, ?, ?, ?, ?, ?);', params);
    console.log('catModel insert:', rows);
    return rows.insertId;
  } catch (e) {
    console.error('catModel insertCat:', e);
    return 0;
  }
};

const updateCat = async (cat) => {
  const [row] = await promisePool.execute('UPDATE wop_cat SET `name`=?, `age`=?, `weight`=?, `owner`=? WHERE cat_id=?', [cat.name, cat.age, cat.weight, cat.owner, cat.id]);
  console.log('update row', row);
  return row.insertId;
};

const deleteCat = async (id) => {
  const [row] = await promisePool.execute('DELETE FROM wop_cat WHERE cat_id=?', [id]);
  console.log('update row', row);
  return row.insertId;
};

module.exports = {
  getAllCats,
  getAllCatsSort,
  getCat,
  insertCat,
  updateCat,
  deleteCat,
};
