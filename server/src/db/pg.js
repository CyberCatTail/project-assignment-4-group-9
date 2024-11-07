const { constants } = require('@root/constants');

const { Sequelize } = require('sequelize');

const pg = new Sequelize(constants.DB_URL)

async function testPgConnection() {
    try {
        await pg.authenticate();
        console.log('Connect to postgresql.');
        return true;
    } catch (error) {
        console.error('Unable to connect to postgresql:', error);
        return false;
    }
}

module.exports = {pg, testPgConnection};