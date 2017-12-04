const mongoose = require('mongoose');
const {Schema} = mongoose;


const QuizItemSchema = new Schema({
    question: String,
    answers: [String],
    answerType: String,
    value: Number,
});

module.exports = mongoose.model('quizItem', QuizItemSchema);