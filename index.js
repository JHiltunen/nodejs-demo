'use strict';
const express = require('express');
const cors = require('cors');
const catRoute = require('./routes/catRouter');
const userRoute = require('./routes/userRouter');
const passport = require('./utils/pass');
const authRoute = require('./routes/authRoute');
const app = express();
const port = 3000;

app.use(cors());

app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));
app.use(express.static('uploads'));

// routes
app.use('/auth', authRoute);
app.use('/cat', passport.authenticate('jwt', {session: false}), catRoute);
app.use('/user', passport.authenticate('jwt', {session: false}), userRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
