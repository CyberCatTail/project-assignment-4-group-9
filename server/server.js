const express = require("express");
const app = express();

// test demo
app.get("/api", (req, res) => {
    res.type('text/plain');
    res.send("hello word");
});


const port = 8080;
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
})