require('./db')
const express = require('express');
const app = express();

const mongoose = require('mongoose');
const detail = mongoose.model('detail');

// app.post('/Calendar')


module.exports = app;