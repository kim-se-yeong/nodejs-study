import express from '../lib/express.js';
const router = express.Router();

router.get('/login', (req, res) => {
    res.render('login', {_title:"WEB - create"});
});

// router.post('/login', (req, res) => {
//     var post = req.body;
//     var email = post.email;
//     var password = post.pwd;
//     if (email === authData.email && password === authData.password) {
//         req.session.is_logined = true;
//         req.session.nickname = authData.nickname;
//         res.redirect('/');
//     } else {
//         res.send('please retry!');
//     }
// });

export default router;