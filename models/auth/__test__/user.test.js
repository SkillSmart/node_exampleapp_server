const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../../../server');
const User = require('../user');


// Store Ids here, to make them accessible
let user1Id = new ObjectID();
let user2Id = new ObjectID();

beforeEach(() => {
    // Create two test users for the system (Authenticated, unauthenticated)
    let user1 = new User({
        _id: user1id,
        email: 'test@test.com',
        password: 'userOnePass',
        tokens: [{
            access: 'auth',
            token: jwt.sign({ _id: user1Id.toHexString(), access: 'auth' }, 'abc123').toString()
        }]
    });
    let user2 = new User({
        _id: user2id,
        email: 'test@test.com',
        password: 'userTwoPass',
    });

    // Wipe the existing database
    User.remove({}).then(() => {
        // Create Users and save them manually, so the pre.save hook executes
        // and the password is hashed appropriately
        user1 = user1.save();
        user2 = user2.save();

        // Wait for both promises to complete before finishing
        return Promise.all([user1, user2])
    }).then(() => done());
});

describe('User Authentication', function () {

    test('should return a User Profile when authenticated', (done) => {
        request(app)
            .get('/api/users/me')
            .set('x-auth', user1.tokens.token)
            .expect(200)
            .expect(res => {
                expect(res.body._id).toBe(user1._id);
                expect(res.body.email).toBe(user1.email);
            })
            .end(done);
    });

    test('should return 401 when not authenticated', (done) => {
        request(app)
        .get('/api/users/me')
        .expect(401)
        .end(done);
    })


});