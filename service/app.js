/**
 * Created by think on 2017/5/13.
 */
const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');
const {port} = require("./conf/port")

let app = express()

let user = require("./routes/user")

//设置跨域
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next()
});

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, './../fe/dist')));
app.use('/test', (req, res) => {
    res.sendFile(__dirname+'/test/test.html')
})

app.use('/user', user)



app.listen(port, function (err) {
    if (err) {
        console.log(err);
        return
    }
    let uri = 'http://localhost:' + port;
    console.log('Listening at ' + uri + '\n');

});