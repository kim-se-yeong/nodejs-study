import http from 'http';
http.createServer((req, res) => {
    res.writeHead(200, {
        'Set-Cookie':[
            'yummy_cookie=choco',
            'tasty_cookie=straberry',
            `Permanent=cookies; Max-Age=${60*60*24*30}`,
            'Secure=Secure; Secure', //Send only for https request
            'HttpOnly=HttpOnly; HttpOnly', //Can't access 'Document.cookie' API in Javascript
            'Path=Path; Path=/cookie',
            //'Domain=Domain; Domain=?'
        ]
    });
    res.end('Cookie!!');

}).listen(3000, () => { console.log('cookie server running!')});