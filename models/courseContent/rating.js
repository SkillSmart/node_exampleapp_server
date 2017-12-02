const mongoose = require('mongoose');
const {Schema} = mongoose;

// Local Schema & Model imports

const RatingSchema = new Schema({
    rating: {
        type: Number,
        min: 0,
        max: 5,
        required: true
    },
    feedbackBody: {
        type: String, 
        min: 15,
        max: 2000,
    }, 
    user: {
        type: Schema.Types.ObjectId,
        model: 'user'
    }
});

// Register virtual types


// Register middleware .pre and .post hooks

module.exports = RatingSchema;