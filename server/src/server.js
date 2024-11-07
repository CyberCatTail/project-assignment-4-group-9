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

    app.use(express.static(path.join(__dirname, '../dist')));

    // test demo
    app.get("/api/v1", (req, res) => {
        res.type('text/plain');
        res.send("hello word");
    });


    const port = constants.PORT;
    app.listen(port, () => {
        console.log(`Server started on http://localhost:${port}`);
    })
}

runServer();