const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://fariskiki:fariskiki@cluster0.kywyk.mongodb.net/pedulidiri')

const db = mongoose.connection

module.exports = db