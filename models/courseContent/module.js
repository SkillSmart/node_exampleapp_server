const mongoose = require('mongoose');
const {Schema} = mongoose;

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
    documents: [Document],
    favs: {
        type: Number, 
        default: 0
    },
    ratings = [{
        type: Schema.Types.ObjectId,
        ref: 'rating'
    }]
});

// Register virtual types
ModuleSchema.virtual('numRatings').get(function () {
    return this.ratings.length
});
Module.Schema.virtual('avgRating').get(function() {
    // To be defined 
});
UserSchema.virtual('postCount').get(function () {
    return this.posts.length;
});

// Register .pre and .post middleware hooks




module.exports = mongoose.model('model', ModuleSchema);