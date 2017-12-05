const _ = require('lodash');
const jwt = require('jsonwebtoken');

// Models
const User = require('../models/auth/user');
const { authenticate } = require('../middleware/authenticate');

module.exports = (app) => {


    // CREATE
    app.post('/api/users/login', async (req, res) => {
        // let {email, password} = req.body;
        let body = _.pick(req.body, ['email', 'password']);
        // res.send(body);
        User.findByCredentials(body.email, body.password)
            .then((user) => {
                return user.generateAuthToken().then((token) => {
                    res.header('x-auth', token).send(user);
                }).catch(e => res.status(400).send());
            });
    });

    app.post('/api/users', (req, res) => {
        let body = _.pick(req.body, [
            'firstName',
            'lastName',
            'email',
            'password'
        ]);
        // console.log(body);
        let user = new User(body);
        // console.log(user);
        user.save()
            .then(() => {
                return user.generateAuthToken();
            }).then((token) => {
                res.header('x-auth', token).send(user);
            }).catch(e => {
                res.status(400).send(e)
            });
    });



    // READ
    app.get('/api/users', async (req, res) => {
        let users = await User.find().catch(e => res.status(400).send(e));
        res.send(users);
    });

    app.get('/api/users/me', authenticate, async (req, res) => {
        res.send(req.user);
    });
    app.get('/api/users/:id', async (req, res) => {
        let user = await User.findById(req.params.id).catch(e => res.status(400).send(e));
        res.send(user);
    });


    // UPDATE

    // DELETE
    app.delete('/api/users', async (req, res) => {
        let status = User.remove().catch(e => res.status(400).send(e));
        res.send(status);
    });
    app.delete('/api/users/:id', async (req, res) => {
        let status = User.findByIdAndRemove(req.params.id).catch(e => res.status(400).send(e));
        res.send(status);
    });
    app.delete('/api/users/me/token', authenticate, (req, res) => {
        req.user.removeToken(req.token).then(() => {
                res.status(200).send();
            }, () => {
                res.status(400).send();
            });
    });
};