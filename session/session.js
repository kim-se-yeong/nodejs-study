import express from 'express'
import session from 'express-session'
const FileStore = require('session-file-store')(session);

var app = express()

app.use(session({
    secret: 'keyboard cat', //required
    resave: false, //session 데이터가 변경되기 전까지 저장소에 저장하지 않는다.
    saveUninitialized: true, //session 이 필요하기 전까지는 세션을 구동시키지 않는다.
    store: new FileStore()
}))

app.get('/', (req, res, next) => {
    if (req.session.num === undefined) {
        req.session.num = 1;
    } else {
        req.session.num = req.session.num + 1;
    }
    res.send(`Views : ${req.session.num}`);
})

app.get('/destroy', (req, res, next) => {
    if (req.session) {
        req.session.destroy(() => {
            res.redirect('/');
        })
    } else {
        res.send('no session to destroy');
    }
})

app.listen(3000, () => { console.log('session server listen!') });