const { createClient } = require('redis');

const redis = createClient();

redis.on('error', err => console.log('Redis Client Error', err));

async function testRedisConnection() {
    try {
        await redis.connect();
        console.log('Connect to redis.');
        return true;
    } catch (error) {
        console.error('Unable to connect to redis:', error);
        return false;
    }
}

module.exports = {redis, testRedisConnection};