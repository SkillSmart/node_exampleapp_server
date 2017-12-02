const mongoose = require('mongoose');
const {Schema} = mongoose;

const Vote = require('../activities/vote');


const ArticleSchema = new Schema({
    title: String,
    body: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }, 
    meta: {
        likes: Number,
        upvotes: [Vote], 
        downvotes: Number
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'comment'
    }]
});

module.exports = mongoose.model('article', ArticleSchema);