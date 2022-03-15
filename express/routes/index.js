import express from '../lib/express.js';
const router = express.Router();

import {HTML, list as _list} from '../lib/template.js';

router.get('/', (req, res) => {
    console.log('/', req.user);
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

export default router;