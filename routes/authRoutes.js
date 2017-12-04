const _ = require('lodash');

// Models
const User = require('../models/auth/user');


module.exports = (app) => {


    // CREATE
    app.post('/api/users', async (req, res) => {
        let body = _.pick(req.body, [
            'firstName', 
            'lastName',
            'email',
            'password'
        ]);
        let user = new User(body);
        user.save()
        .then(() => {
            return user.generateAuthToken();
        }).then((token) => {
            res.header('x-auth', token).send(user);
        }).catch(e=>{
            res.status(400).send(e)
        });
        // let user = await User.create(body).catch(e=> res.status(400).send(e));
        // let token = await user.generateAuthToken();
        // res.header('x-auth', token).send(user).catch(e => res.status(400).send(e));
        // res.send(user);
    });

    // READ
    app.get('/api/users', async (req, res) => {
        let users = await User.find().catch(e => res.status(400).send(e));
        res.send(users);
    });
    app.get('/api/users/:id', async (req, res) => {
        let user = await User.findById(req.params.id).catch(e=> res.status(400).send(e));
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
    })
}