const bookshelf = require('./../database');
const uuid = require('uuid');
const crypto = require('crypto');

module.exports = bookshelf.Model.extend({
    tableName: 'users',
    initialize: function() {
        this.on('creating', this.setId, this);
        this.on('creating', this.formatEmail, this);
        this.on('creating', this.hashPassword, this);


    },
    hashPassword: function() {
    	console.log('hashing');
        if (!this.get('password')) {
            return;
        }
        return new Promise((resolve, reject) => {
            const salt = crypto.randomBytes(10).toString('base64');

            crypto.pbkdf2(new Buffer(this.get('password'), 'binary'), salt, 100, 60, 'sha512', (err, key) => {
                if (err) reject(err);

                // function:algorithm:iterations:salt:key(hex)
                const hashedPassword = `PBKDF2:sha512:100:${salt}:${key.toString('hex')}`;
                this.set({ 'password': hashedPassword });
                resolve(hashedPassword);
            });
        });
    },
    formatEmail: function() {
    	console.log('formating email');

        if (!this.get('email')) {
            return;
        }
        return this.set({ email: this.get('email').toLowerCase().trim() });
    },
    setId: function() {
    	console.log('seting id');

        return this.set({ id: 'US-' + uuid.v1() });
    }
});



// function comparePassword(password, hashedPassword) {
//     if (!password) throw new Error('USER_MISSING_CREDENTIALS');

//     return new Promise((resolve, reject) => {
//         // pbkdf2 is prefixd PBKDF2:sha512:[i]:salt:password
//         const parsed = hashedPassword.split(':');
//         const hash = {
//             iterations: parsed[2],
//             salt: parsed[3],
//             hash: parsed[4],
//         };

//         crypto.pbkdf2(password, hash.salt, parseInt(hash.iterations), 60, 'sha512', (err, key) => {
//             if (err) return reject(err);
//             if (hash.hash !== key.toString('hex')) return reject('AUTH_PASSWORD_INCORRECT');

//             return resolve(true);
//         });
//     });
// }
