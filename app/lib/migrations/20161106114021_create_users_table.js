exports.up = function (knex, Promise) {
    return knex.schema.createTable('users', function (table) {
        table.string('id',40).primary().notNull();
        table.enu('status', ['active', 'disabled']).nullable();
        table.string('first_name').nullable();
        table.string('last_name').nullable();
        table.string('email').unique().notNull();
        table.string('password').nullable();
        table.timestamp('deleted_at').nullable().defaultTo(null);
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });

};

exports.down = function (knex, Promise) {

    return knex.schema.dropTable('users');

};   
