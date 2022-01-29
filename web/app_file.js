const bodyParser = require('body-parser');
const fs = require('fs');
const express = require('express');
const app = express();
app.use(bodyParser.urlencoded({extended: false}));

app.set('views', './views_file');
app.set('view engine', 'jade');

app.get('/topic/new', (req, res) => {
    res.render('new');
});

app.post('/topic', (req, res) => {
    var title = req.body.title;
    var description = req.body.description;
    fs.writeFile('./data/' + title, description, (err) => {
        if (err) {
            res.status(500).send('Internal Server Error');
        }
        res.send('Success!');
    });
});

app.listen(3000, () => {
    console.log('listen 3000 port!');
});