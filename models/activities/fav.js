/**When a user faves an object, the information about his favoring is
 * stored in a convenient object, used to later easily retrieve metrics on 
 * the object itself.
 */

const mongoose = require('mongoose');
const {Schema} = mongoose;

const FavSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
});

module.exports = FavSchema;



