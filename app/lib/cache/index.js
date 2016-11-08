const Redis = require('redis');

const redisClient = Redis.createClient(process.env.REDIS_PORT || 6379, process.env.REDIS_HOST);

if(process.env.REDIS_PASSWORD){
	redisClient.auth(process.env.REDIS_PASSWORD);
}

module.exports = redisClient;
