import express from 'express';
const app = express();
import fs from 'fs';
import path from 'path';
import sanitizeHtml from 'sanitize-html';
import {HTML, list as _list} from './lib/template.js';
import compression from 'compression';

app.set('views', './views');
app.set('view engine', 'pug');

//parse application/x-www-form-urlencoded
app.use(express.urlencoded({extended: false}));
app.use(compression());
app.get('*', (req, res, next) => {
    fs.readdir('./data', (err, filelist) => {
        req.list = filelist;
        next();
    });
});

app.get('/', (req, res) => {
    var title = 'Welcome';
    var description = 'Hello, Node.js'
    var list = _list(req.list);
    var html = HTML(title, list,
        `<h2>${title}</h2>${description}`,
        `<a href="/create">create</a>`
    );
    res.send(html);
});

app.get('/page/:pageId', (req, res) => {
    var filteredId = path.parse(req.params.pageId).base;
    fs.readFile(`./data/${filteredId}`, 'utf8', (err, description) => {
        var title = req.params.pageId;
        var sanitizedTitle = sanitizeHtml(title);
        var sanitizedDescription = sanitizeHtml(description, {
            allowedTags:['h1']
        });
        res.render('detail', {_title:sanitizedTitle,
            _description:sanitizedDescription, _list:req.list});
    });
});

app.get('/create', (req, res) => {
    res.render('create', {_title:"WEB - create", _list:req.list});
});

app.post('/create', (req, res) => {
    var title = req.body.title;
    var description = req.body.description;
    fs.writeFile(`./data/${title}`, description, 'utf-8', (err) => {
        res.redirect(`/page/${title}`);
    })
});

app.get('/update/:pageId', (req, res) => {
    var filteredId = req.params.pageId;
    fs.readFile(`./data/${filteredId}`, 'utf8', (err, description) => {
        res.render('update', {_title:req.params.pageId,
            _description:description, _list:req.list});
    });
});

app.post('/update', (req, res) => {
    var id = req.body.id;
    var title = req.body.title;
    var description = req.body.description;
    fs.rename(`./data/${id}`, `data/${title}`, (err) => {
        fs.writeFile(`./data/${title}`, description, 'utf8', (err) => {
            res.redirect(`/page/${title}`);
        });
    });
});

app.post('/delete', (req, res) => {
    var id = req.body.id;
    fs.unlink(`./data/${id}`, (err) => {
        res.redirect('/');
    })
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
});