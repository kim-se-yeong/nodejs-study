// import express from 'express';
import express from '@lib/express.js';
const app = express();
import fs from 'fs';
import helmet from 'helmet';
import compression from 'compression';
import topicRouter from './routes/topic.js';
import indexRouter from './routes/index.js';
import authRouter from './routes/auth.js'
import session from 'express-session';
import passport from 'passport';
import passportlocal from 'passport-local';
const localstrategy = passportlocal.Strategy;

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

//parse application/x-www-form-urlencoded
app.use(express.static( __dirname + '/public'));
app.use(helmet());
app.use(express.urlencoded({extended: false}));
app.use(compression());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}))

var authData = {
    email:'kimseyeong97@gmail.com',
    password: '111',
    nickname: 'ksy'
}

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    console.log('serializeUser', user);
    done(null, user.email);
})

passport.deserializeUser(function(id, done) {
    console.log('deserialize', id);
    done(null, authData);
})

passport.use(new localstrategy(
    {
        usernameField: 'email',
        passwordField: 'pwd'
    },
    function (username, password, done) {
        if (username === authData.email) {
            if (password === authData.password) {
                return done(null, authData);
            } else {
                return done(null, false, {
                    message: 'Incorrect password.'
                })
            }
        } else {
            return done(null, false, {
                message: 'Incorrect username.'
            })
        }
    }
))

app.post('/auth/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/auth/login'
}));

app.get('*', (req, res, next) => {
    fs.readdir(__dirname + '/data', (err, filelist) => {
        console.log('fileList ', filelist)
        req.list = filelist;
        next();
    });
});

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/topic', topicRouter);

app.use((req, res, next) => {
    res.status(404).send('Sorry cant find that!');
});

app.use((err, req, res, next) => {
    res.status(500).send('Somthing broke!');
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
});