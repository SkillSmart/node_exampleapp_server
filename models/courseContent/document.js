const mongoose = require('mongoose');
const {Schema} = mongoose;

const DocumentSchema = new Schema({
    _creator: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    title: String,
    author: String,
    body: String,
    language: String,

});


module.exports = mongoose.model('document', DocumentSchema);