import express from 'express';
const app = express();
import fs from 'fs';
import qs from 'querystring';
import path from 'path';
import sanitizeHtml from 'sanitize-html';
import {HTML, list as _list} from './lib/template.js';

app.get('/', (req, res) => {
    fs.readdir('./data', (err, filelist) => {
        var title = 'Welcome';
        var description = 'Hello, Node.js'
        var list = _list(filelist);
        var html = HTML(title, list,
            `<h2>${title}</h2>${description}`,
            `<a href="/create">create</a>`
        );
        res.send(html);
    });
});

app.get('/page/:pageId', (req, res) => {
    fs.readdir('data', (err, filelist) => {
        var filteredId = path.parse(req.params.pageId).base;
        fs.readFile(`data/${filteredId}`, 'utf8', (err, description) => {
            var title = req.params.pageId;
            var sanitizedTitle = sanitizeHtml(title);
            var sanitizedDescription = sanitizeHtml(description, {
                allowedTags:['h1']
            });
            var list = _list(filelist);
            var html = HTML(sanitizedTitle, list,
                `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,
                `   <a href="/create">create</a>
                    <a href="/update/${sanitizedTitle}">update</a>
                    <form action="delete_process" method="post">
                    <input type="hidden" name="id" value="${sanitizedTitle}">
                    <input type="submit" value="delete"
                    </form>`);
            res.send(html);
        });
    });
});

app.get('/create', (req, res) => {
    fs.readdir('data', (err, fileList) => {
        var title = 'WEB - create';
        var list = _list(fileList);
        var html = HTML(title, list, `
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
            res.writeHead(302, {Location: `/page/${title}`});
            res.end();
        });
    });
});

app.get('/update/:pageId', (req, res) => {
    fs.readdir('data', function(err, filelist) {
        var filteredId = path.parse(req.params.pageId).base;
        fs.readFile(`data/${filteredId}`, 'utf8', (err, description) => {
            var title = req.params.pageId;
            var list = _list(filelist);
            var html = HTML(title, list,
                `<form action="/update" method="post">
                    <input type="hidden" name="id" value="${title}">
                        <p><input type="text" name="title" placeholder="title" value="${title}">
                        <p>
                            <textarea name="description" placeholder="description">${description}</textarea>
                        </p>
                        <p>
                            <input type="submit">
                        </p>
                </form>
                `, `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`
                );
            res.send(html);
        });
    });
});

app.post('/update', (req, res) => {
    var body = '';
    req.on('data', (data) => {
        body = body + data;
    });
    req.on('end', () => {
        var post = qs.parse(body);
        var id = post.id;
        var title = post.title;
        var description = post.description;
        fs.rename(`data/${id}`, `data/${title}`, (err) => {
            fs.writeFile(`data/${title}`, description, 'utf8', (err) => {
                res.writeHead(302, {Location: `/page/${title}`});
                res.end();
            });
        });
    });
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
});