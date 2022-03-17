import express from '@lib/express.js'
const router = express.Router();

import fs from 'fs';
import path from 'path';
import sanitizeHtml from 'sanitize-html';
import {list as _list} from '@lib/template.js';
import data_path from '@lib/filePath.js'

router.get('/create', (req, res) => {
    res.render('create', {_title:"WEB - create", _list:req.list});
});

router.get('/:pageId', (req, res, next) => {
    var filteredId = path.parse(req.params.pageId).base;
    fs.readFile(path.join(data_path, filteredId), 'utf8', (err, description) => {
        if (err) next(err);

        var title = req.params.pageId;
        var sanitizedTitle = sanitizeHtml(title);
        var sanitizedDescription = sanitizeHtml(description, {
            allowedTags:['h1']
        });
        res.render('detail', {_title:sanitizedTitle,
            _description:sanitizedDescription, _list:req.list});
    });
});

router.post('/create', (req, res) => {
    var title = req.body.title;
    var description = req.body.description;
    fs.writeFile(path.join(data_path, title), description, 'utf-8', (err) => {
        res.redirect(`/topic/${title}`);
    })
});

router.get('/update/:pageId', (req, res, next) => {
    var filteredId = req.params.pageId;
    fs.readFile(path.join(data_path, filteredId), 'utf8', (err, description) => {
        if (err) next(err);
        res.render('update', {_title:req.params.pageId,
            _description:description, _list:req.list});
    });
});

router.post('/update', (req, res) => {
    var id = req.body.id;
    var title = req.body.title;
    var description = req.body.description;
    fs.rename(path.join(data_path, id), path.join(data_path, title), (err) => {
        fs.writeFile(path.join(data_path, title), description, 'utf8', (err) => {
            res.redirect(`/topic/${title}`);
        });
    });
});

router.post('/delete', (req, res) => {
    var id = req.body.id;
    fs.unlink(path.join(data_path, id), (err) => {
        res.redirect('/');
    })
});

export default router;