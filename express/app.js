import express from 'express';
const app = express();
app.locals.pretty = true;

//template 있는 디렉토리
app.set('views', __dirname + '/views');
// 사용할 template engine
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));

app.get('/template', function(req, res) {
    res.render('temp', {time:Date(), _title:'Jade'});
});

app.get('/', function(req, res) {
    res.send('Hello home page');
});
app.get('/login', function(req, res) {
    res.send('Login please');
});
app.get('/route', function(req, res) {
    res.send('Hello Router, <img src="/route.png">')
})

//동적
app.get('/dynamic', function(req, res) {
    var lis = '';
    for (var i = 0; i < 5; i++) {
        lis = lis + '<li>coding</li>';
    }

    var time = Date();
    
    var output = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title></title>
    </head>
    <body>
        Hello, Dynamic!
        <ul>
            ${lis}
        </ul>
        ${time}
    </body>
    </html>`;
    res.send(output);
})

//use query string
app.get('/topic', function(req, res) {
    var topics = [
        'Javascript is...',
        'Nodejs is...',
        'Express is...'
    ];
    var output = `
        <a href="/topic?id=0">Javascript</a><br>
        <a href="/topic?id=1">Nodejs</a><br>
        <a href="/topic?id=2">Express</a><br><br>
        ${topics[req.query.id]}
    `
    res.send(output);
});

// semantic url
app.get('/topic/:id', function(req, res) {
    res.send(req.params.id);
});

app.listen(3000, function() {
    console.log('Connected 3000 port!');    
});