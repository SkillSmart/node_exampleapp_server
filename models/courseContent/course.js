const mongoose = require('mongoose');
const {Schema} = mongoose;

// Local Schema & Model imports


const CourseSchema = new Schema({
    title: String,
    summary: String,
    modules: [{
        type: Schema.Types.ObjectId,
        model: 'module'
    }],
    lessons: [{
        type: Schema.Types.ObjectId,
        model: 'lesson'
    }],
    basePrice: Number, 
    favs: {
        type: Number, 
        default: 0
    },
    ratings: [{
        type: Schema.Types.ObjectId,
        model: 'rating'
    }]
});

// Register virtual types

// Register .pre and .post middleware hooks

// Export the Model
model.exports = mongoose.model('course', CourseSchema);