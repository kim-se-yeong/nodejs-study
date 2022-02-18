import express from "express";
const app = express();

app.get('/', (req, res, next) => {
    next(error);    
});

app.get('/user/:id', (req, res, next) => {
    if (isNaN(req.params.id)) {
        res.statusCode = 404;
        next(error);
    } else {
        res.send(`my number is ${req.params.id}`);
    }
});

app.use((err, req, res, next) => {
    if (res.statusCode == 404)
        res.status(404).send('page not found!');
    else
        res.status(500).send('somthing broken!');
});

app.listen('3000', () => console.log('middleware server running!'));