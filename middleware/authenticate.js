const User = require('../models/auth/user');

let authenticate = (req, res, next) => {
    let token = req.header('x-auth');

    User.findByToken(token)
        .then((user) => {
            if (!user) {
                Promise.reject();
            }
            req.user = user;
            req.token = token;
            next();
        }).catch(e => res.status(401).send());
};

module.exports = {authenticate};

