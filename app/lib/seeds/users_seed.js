const casual = require('casual');
const uuid= require('uuid');

exports.seed = function(knex, Promise) {
    var userData = [];
    for (var i = 0; i < 1000; i++) {
        userData.push({
        	id:'US-'+uuid.v1(),
        	first_name: casual.first_name,
            email: casual.email,
            last_name: casual.last_name,
            password:'123456',
            status: 'active'
        });
    }


    return Promise.all([
        knex('users').insert(userData)
    ]);
};
