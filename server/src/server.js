require('module-alias/register')
const path = require('path');
const fs = require('fs');
const constants = require('@root/constants');

async function runServer() {
    const {cache, testDBConnection, testCacheConnection} = require('./db');
    if (!await testDBConnection()) {
        process.exit(1);
    }
    if (!await testCacheConnection()) {
        process.exit(1);
    }

    const https = require('https');
    var key = fs.readFileSync(__dirname + '/../.certs/localhost.key');
    var cert = fs.readFileSync(__dirname + '/../.certs/localhost.crt');
    var options = {
        key: key,
        cert: cert
    };

    const express = require("express");
    const app = express();
    const morgan = require('morgan');

    app.use(morgan('combined'));

    app.use(express.json());
    app.use(express.static(path.join(__dirname, '../dist')));

    const routes = require('./routes');
    app.use('/api/v1', routes);

    const port = constants.PORT;
    const server = https.createServer(options, app);
    console.log('begin server')
    server.listen(port, () => {
        console.log(`Server started on https://localhost:${port}`);
    });
}

runServer();