/**The Class to house all information about each User on the Plattform
 * The Central identifier for all processes in the System.
 * 
 */
const mongoose = require('mongoose');
const { Schema } = mongoose;
const _ = require('lodash');

const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


// Local imports
const Follow = require('../activities/follow');


const UserSchema = new Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true,
        trim: true,
        validate: (email) => validator.isEmail(email),
        message: `{VALUE} is not a valid email`,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        trim: true
    },
    tokens: [{
        access: {
            type: String,
            required: true,
        },
        token: {
            type: String,
            required: true
        }
    }],
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

// Add class methods
// UserSchema.methods.toJSON = function () {
//     let user = this;
//     let userObject = user.toObject();

//     return _.pick(userObject, ['_id', 'email']);
// };

// Add instance methods
UserSchema.methods.generateAuthToken = async function () {
    let user = this;
    let access = 'auth';
    let token = jwt.sign({ _id: user._id.toHexString(), access }, 'abc123').toString();

    user.tokens.push({ access, token });

    return user.save()
        .then(() => {
            return token;
        });
};

// Add model methods
UserSchema.statics.findByToken = async function (token) {
    let User = this;
    let decoded;

    try {
        decoded = jwt.verify(token, 'abc123');
    } catch (e) {
        Promise.reject();
    }

    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    }).catch(e => res.status(401).send(e));

};

// Add Lifecycle Hooks
UserSchema.pre('save', function (next) {
    let user = this;

    if(user.isModified('password')) {
        // Hash the password and store it on the user 
        // before saving to the database
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;        
                next();
            });
        });
        // Going on to saving the user
        next();
    } else { 
        // Skip and straight go on to saving
        next() 
    }
});

module.exports = mongoose.model('user', UserSchema);