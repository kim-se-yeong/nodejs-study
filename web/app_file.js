const bodyParser = require('body-parser');
const fs = require('fs');
const express = require('express');
const app = express();
app.use(bodyParser.urlencoded({extended: false}));

app.set('views', './views_file');
app.set('view engine', 'jade');

app.get('/topic/new', (req, res) => {
    fs.readdir('data', (err, files) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
    res.render('new', {topics:files});
    });
});

app.get(['/topic', '/topic/:id'], (req, res) => {
    fs.readdir('data', (err, files) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        var id = req.params.id;
        if (id) {
            //id값이 있을 때
            fs.readFile('data/' + id, 'utf8', (err, data) => {
                if (err) {
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                }
                res.render('view', {title:id, topics:files, description:data});
            });
        } else {
            //id값이 없을 때
            res.render('view', {topics:files, title:'Welcome', description:'Hello, JavaScript for server'});
        }
    });
});

app.post('/topic', (req, res) => {
    var title = req.body.title;
    var description = req.body.description;
    fs.writeFile('data/' + title, description, (err) => {
        if (err) {
            res.status(500).send('Internal Server Error');
        }
        res.redirect('/topic/' + title);
    });
});

app.listen(3000, () => {
    console.log('listen 3000 port!');
});