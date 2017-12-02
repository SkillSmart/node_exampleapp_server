const mongoose = require('mongoose');
const {Schema} = mongoose;

// local imports
const QuizItem = require('./quizItem');

const QuizSchema = new Schema({
    title: String,
    items: [{
        type: Schema.Types.ObjectId,
        ref: 'quizItem'
    }],
    passmark: {
        type: Number, 
        default: 60,
        max: 100,
        min: 0
    }
});

module.exports = mongoose.model('quiz', QuizSchema);