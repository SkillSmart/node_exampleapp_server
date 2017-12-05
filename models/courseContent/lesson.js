const mongoose = require('mongoose');
const {Schema} = mongoose;

// Local Schema& Model Imports
const Document = require('./document');
const Rating = require('./rating');

const LessonSchema = new Schema({
    title: String, 
    summary: String, 
    videoURL: String,
    body: String,
    documents: [{
        type: Schema.Types.ObjectId,
        ref: 'document'
    }],
    meta: {
        favs: { type: Number, default: 0, min:0},
        ratings: [Rating]
    },
    _creator: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
});

// Register Virtual Types

// Register .pre and .post hooks

module.exports = mongoose.model('lesson', LessonSchema);

