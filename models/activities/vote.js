const mongoose = require('mongoose');
const {Schema} = mongoose;


const VoteSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    value: {
        type: Number, 
        min: -5,
        max: 5
    }
});


module.exports = VoteSchema;