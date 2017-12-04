const mongoose = require('mongoose');
const {Schema} = mongoose;

// Local Schema & Model imports


const CourseSchema = new Schema({
    title: String,
    summary: String,
    description: String,
    modules: [{
        type: Schema.Types.ObjectId,
        ref: 'module'
    }],
    lessons: [{
        type: Schema.Types.ObjectId,
        ref: 'lesson'
    }],
    basePrice: Number, 
    favs: {
        type: Number, 
        default: 0
    },
    ratings: [{
        type: Schema.Types.ObjectId,
        ref: 'rating'
    }]
});

// Register virtual types

// Register .pre and .post middleware hooks

// Export the Model
module.exports = mongoose.model('course', CourseSchema);