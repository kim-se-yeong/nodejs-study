const express = require('express');
const app = express();
const fs = require('fs');
const template = require('./lib/template.js');

app.get('/', (req, res) => {
    fs.readdir('./data', (err, filelist) => {
        var title = 'Welcome';
        var description = 'Hello, Node.js'
        var list = template.list(filelist);
        var html = template.HTML(title, list,
            `<h2>${title}</h2>${description}`,
            `<a href="/create">create</a>`
        );
        res.send(html);
    });
});

app.get('/page/:pageId', (req, res) => {
    res.send(req.params.pageId);
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
});