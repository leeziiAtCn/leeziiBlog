/**
 * Created by think on 2017/5/13.
 */
const express = require("express");
const path = require('path');

let app = express()
app.use(express.static(path.join(__dirname, './dist')));
//设置跨域
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next()
});


app.listen(8899, function (err) {
    if (err) {
        console.log(err);
        return
    }
    let uri = 'http://localhost:' + 8899;
    console.log('Listening at ' + uri + '\n');

});