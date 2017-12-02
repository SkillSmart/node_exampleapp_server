const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/webserverApp");

module.exports = mongoose;