const mongoose = require('mongoose')

mongoose.connect('mongodb://0.0.0.0:27017/pedulidiri')

const db = mongoose.connection

module.exports = db