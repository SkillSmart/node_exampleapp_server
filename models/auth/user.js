/**The Class to house all information about each User on the Plattform
 * The Central identifier for all processes in the System.
 * 
 */
const mongoose = require('mongoose');
const {Schema} = mongoose;

const Follow = require('../activities/follow');

const UserSchema = new Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String
    },
    email : {
        type: String, 
        required: true, 
        trim: true,
        validate: email => email.length > 10,
    }, 
    // Section stores information about activities
    // that store information to be displayed back to the User
    meta: {
        likes: {
            type: Number, 
            default: 0,
            min: 0
        },
        favedCourses: [{
            type: Schema.Types.ObjectId,
            ref: 'course'
        }],
        favedLesson: [{
            type: Schema.Types.ObjectId,
            ref: 'lesson'
        }],
        favedArticles: [{
            type: Schema.Types.ObjectId,
            ref: 'article'
        }], 
        favedDocuments: [{
            type: Schema.Types.ObjectId,
            ref: 'document'
        }]
    },
    // Section about Social Interaction on the Plattform
    follows: [Follow],
    followers: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }]
});


module.exports = mongoose.model('user', UserSchema);