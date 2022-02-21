// import express from 'express';
import express from './lib/express.js';
const app = express();
import fs from 'fs';
import {HTML, list as _list} from './lib/template.js';
import compression from 'compression';
import topicRouter from './routes/topic.js';

app.set('views', './views');
app.set('view engine', 'pug');

//parse application/x-www-form-urlencoded
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.use(compression());
app.get('*', (req, res, next) => {
    fs.readdir('./data', (err, filelist) => {
        req.list = filelist;
        next();
    });
});

app.use('/topic', topicRouter);

app.get('/', (req, res) => {
    var title = 'Welcome';
    var description = 'Hello, Node.js'
    var list = _list(req.list);
    var html = HTML(title, list,
        `<h2>${title}</h2>${description}
        <img src="/hello.png" style="width:100px; display:block">`,
        `<a href="/create">create</a>`,
    );
    res.send(html);
});

app.use((req, res, next) => {
    res.status(404).send('Sorry cant find that!');
});

app.use((err, req, res, next) => {
    res.status(500).send('Somthing broke!');
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
});