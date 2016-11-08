const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: process.env.MYSQL_HOST || 'localhost',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || '*Secure123*',
        database: process.env.MYSQL_DATABASE || 'test_project',
        charset: 'utf8'
    }
});

const bookshelf = require('bookshelf')(knex);
bookshelf.plugin('pagination');
bookshelf.plugin(require('bookshelf-crud'));

module.exports = bookshelf;
