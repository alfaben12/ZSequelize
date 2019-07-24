const express = require('express')
const app = express()
const port = 3000;
const con = require('./config/db.js');
const dotenv = require('dotenv');
const MemberRouter = require('./routes/MemberRouter');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', MemberRouter);

app.listen(port, () => console.log(`Example app listening on port ` + process.env.RUN_PORT));