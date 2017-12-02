const mongoose = require('mongoose');
const {Schema} = mongoose;

const DocumentSchema = new Schema({
    title: String,
    author: String,
    body: String,
    language: String,
});


module.exports = DocumentSchema;