const {pg, testPgConnection} = require('./pg');
const {redis, testRedisConnection} = require('./redis');

const db = pg;
const testDBConnection = testPgConnection;
const cache = redis;
const testCacheConnection = testRedisConnection;

module.exports = {db, testDBConnection, cache, testCacheConnection};