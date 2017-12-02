const mongoose = require('mongoose');
const {Schema} = mongoose;

const CreatorSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    // TODO: Additional Attributes
});

module.exports = mongoose.model('creator', CreatorSchema);