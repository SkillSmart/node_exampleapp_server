const mongoose = require('mongoose');
const {Schema} = mongoose;

// Local Schema& Model Imports
const Document = require('./document');

const LessonSchema = new Schema({
    title: String, 
    summary: String, 
    videoURL: String,
    body: String,
    documents: [Document],

});

// Register Virtual Types

// Register .pre and .post hooks

module.exports = mongoose.model('lesson', LessonSchema);

