const mongoose = require('mongoose');
const {Schema} = mongoose;

// Local imports
const Fav = require('../activities/fav');


const ModuleSchema = new Schema({
    title: String,
    summary: String,
    courses: [{
        type: Schema.Types.ObjectId,
        ref: 'course'
    }],
    lessons: [{
        type: Schema.Types.ObjectId,
        ref: 'lesson'
    }],
    documents: [{
        type: Schema.Types.ObjectId,
        ref: 'document'
    }],
    favs: [Fav],
    ratings: [{
        type: Schema.Types.ObjectId,
        ref: 'rating'
    }]
});

// // Register virtual types
// ModuleSchema.virtual('numRatings').get(function () {
//     return this.ratings.length
// });


// Register .pre and .post middleware hooks




module.exports = mongoose.model('module', ModuleSchema);