const express = require('express');
const app = express();

app.get('/', function(req, res) {
    res.send('Hello home page');
});
app.get('/login', function(req, res) {
    res.send('Login please');
});
app.get('/route', function(req, res) {
    res.send('Hello Router, <img src="/route.png">')
})
app.use(express.static('public'));

app.listen(3000, function() {
    console.log('Connected 3000 port!');    
});