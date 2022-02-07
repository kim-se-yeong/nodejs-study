const express = require('express');
const app = express();
const fs = require('fs');
const qs = require('querystring');
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

app.get('/create', (req, res) => {
    fs.readdir('data', (err, fileList) => {
        var title = 'WEB - create';
        var list = template.list(fileList);
        var html = template.HTML(title, list, `
            <form action="/create" method="post">
                <p><input type="text" name="title" placeholder="title"></p>
                <p>
                    <textarea name="description" placeholder="description"></textarea>
                </p>
                <p>
                    <input type="submit">
                </p>
            </form>
        `, '');
        res.send(html);
    });
});

app.post('/create', (req, res) => {
    var body = '';
    req.on('data', (data) => {
        body = body + data;
    });
    req.on('end', () => {
        var post = qs.parse(body);
        var title = post.title;
        var description = post.description;
        fs.writeFile(`data/${title}`, description, 'utf8', (err) => {
            res.writeHead(302, {Location: `/?id=${title}`});
            res.end();
        });
    });
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
});