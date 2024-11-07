require('module-alias/register')
const path = require('path');
const { constants } = require('@root/constants');

async function runServer() {
    const {testDBConnection, testCacheConnection} = require('./db');
    if (!await testDBConnection()) {
        process.exit(1);
    }
    if (!await testCacheConnection()) {
        process.exit(1);
    }

    const express = require("express");
    const app = express();
    const morgan = require('morgan');

    app.use(morgan('combined'));

    app.use(express.static(path.join(__dirname, '../dist')));

    const routes = require('./routes');
    app.use('/api/v1', routes);

    const port = constants.PORT;
    app.listen(port, () => {
        console.log(`Server started on http://localhost:${port}`);
    })
}

runServer();