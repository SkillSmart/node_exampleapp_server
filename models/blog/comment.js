/** Comment: A small textual reply or statement to a Blog Post in
 * in the Bloging application
 * */

const mongoose = require('mongoose');
const {Schema} = mongoose;


const CommentSchema = new Schema({
    title: String,
    body: String, 
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    target: {
        type: Schema.Types.ObjectId,
        ref: 'article'
    }
});

module.exports = mongoose.model('comment', CommentSchema);