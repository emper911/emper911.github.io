const express = require('express');
var bodyParser = require('body-parser');
const app = express()

app.listen(3000, () => console.log("Listening on port 3000"));


app.get('/', function(req, res) {
    res.sendFile('public/index.html', function (err) {
        if (err){
            console.log(err);
        }
    });

});
