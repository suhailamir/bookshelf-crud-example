const bookshelf = require('./../database');
const User = require('./../models/user');
const moment = require('moment');
const crypto = require('crypto');


// Logging ====================
const log = require('debug');
const logStream = log('APP:HTTP:MIDDLEWARE:USERS');

// Contents ===================
module.exports = {
    getUsers,
    saveUser,
    updateUser,
    findById,
    findByEmail,
    deleteUser
};

function getUsers(req, res, next) {

    var order = req.query.order || "ASC";
    var orderBy = req.query.orderBy || "first_name";

    User
        .forge()
        .orderBy(orderBy, order)
        .fetchPage({
            pageSize: req.query.pageSize || 10,
            page: req.query.pageSize || 0
        })
        .then(function(results) {
            res.data = results;
            return next();
        })
        .catch(function(err) {
            res.data = err;
            return next();
        });
}

function saveUser(req, res, next) {


    User
        .where('email', req.params.email)
        .fetch()
        .then((user) => {
            if (user && !user.get('deleted_at')) {
                res.data = { message: 'User already exists' };
                return next();

            } else if (user && user.get('deleted_at')) {
                user.save({ first_name: req.params.first_name, last_name: req.params.last_name, deleted_at: null, status: "active", updated_at: moment.utc().format('YYYY-MM-DD HH:mm:ss') }, { method: "update" })
                    .then(function(user) {
                        res.data = user;
                        return next();
                    }).catch(function(err) {
                        res.data = err;
                        return next();
                    });
            } else {
                new User({
                        first_name: req.params.first_name,
                        email: req.params.email,
                        last_name: req.params.last_name,
                        password: req.params.password,
                        status: "active"
                    }).save(null, { method: 'insert' })
                    .then(function(user) {
                        res.data = user;
                        return next();
                    }).catch(function(err) {
                        console.log('err :', err);
                        res.data = err;
                        return next();
                    });


            }

        });



}

function updateUser(req, res, next) {



    User
        .where('id', req.params.id)
        .fetch()
        .then((user) => {
            if (user) {

                user.save({ first_name: req.params.first_name, last_name: req.params.last_name, deleted_at: null, status: "active", updated_at: moment.utc().format('YYYY-MM-DD HH:mm:ss') }, { method: "update" })
                    .then(function(user) {
                        res.data = user;
                        return next();
                    }).catch(function(err) {
                        res.data = err;
                        return next();
                    });


            } else {
                res.data = { message: 'User not found' };
                return next();
            }

        });








}

function deleteUser(req, res, next) {



    User
        .where('id', req.params.id)
        .fetch()
        .then((user) => {
               if (user) {

                user.save({ deleted_at: moment.utc().format('YYYY-MM-DD HH:mm:ss'), status: 'disabled' }, { method: "update" })
                    .then(function(user) {
                         res.data = user;
                        return next();
                    }).catch(function(err) {
                        res.status(500);
                        return next();
                    });


            } else {
                res.data = { message: 'User not found' };
                return next();
            }



        });
}

function findById(req, res, next) {



    User
        .where('id', req.params.id)
        .fetch()
        .then(function(user) {
            console.log('user :', user);
            res.data = user;
            return next();
        }).catch(function(err) {
            console.log('err :', err)
            res.status(500);
            return next();
        });








}

function findByEmail(req, res, next) {

    console.log(req.params)

    User
        .where('email', req.params.email)
        .fetch()
        .then((user) => {
            if (user) {
                comparePassword(req.params.password, user.get('password'), function(response) {
                    if (response.status) {
                        res.data = user;
                        return next();

                    } else {
                        res.data = response.msg;
                        return next();

                    }
                })

            } else {
                res.data = { message: 'user not found' };
                return next();
            }


        }).catch(function(err) {
            res.data = err;
            return next();
        });
}











function comparePassword(password, hashedPassword, callback) {
    if (!password) throw new Error('USER_MISSING_CREDENTIALS');


    // pbkdf2 is prefixd PBKDF2:sha512:[i]:salt:password
    const parsed = hashedPassword.split(':');
    const hash = {
        iterations: parsed[2],
        salt: parsed[3],
        hash: parsed[4],
    };

    crypto.pbkdf2(password, hash.salt, parseInt(hash.iterations), 60, 'sha512', (err, key) => {
        if (err) callback({ status: false, msg: err });
        if (hash.hash !== key.toString('hex')) {
            callback({ status: false, msg: 'AUTH_PASSWORD_INCORRECT' });
        } else {
            callback({ status: true, msg: 'AUTH_PASSWORD_CORRECT' });
        }
    });



}
