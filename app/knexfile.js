// Update with your config settings.

module.exports = {

    development: {
        client: 'mysql',
        connection: {
            host: process.env.MYSQL_HOST || 'localhost',
            user: process.env.MYSQL_USER || 'root',
            password: process.env.MYSQL_PASSWORD || '*Secure123*',
            database: process.env.MYSQL_DATABASE || 'test_project',
            charset: 'utf8',
            timezone: 'UTC',
            debug: true
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'migrations',
            directory: './lib/migrations',
        },
        seeds: {
            directory: './lib/seeds',
        }
    },

};
