const express = require('express');
const app = express();
const { initDB } = require('./database');

initDB();

// Logger Middleware
const logger = function (req, res, next) {
    const { method, url } = req;
    const date = new Date().toLocaleString();
    console.log(`${date}: ${method} ${url}`);
    next();
};

// Routes
const globalRouter = require('./routes/global');
//const blogRouter = require('./routes/blog');

// Middlewares
app.use(logger);
app.use(express.json()); 

app.use((req, res, next) => {
    console.log('Middleware 1');
    next();
});

app.use((req, res, next) => {
    console.log('Middleware 2');
    next();
});

app.use('/', globalRouter);
//app.use('/blog', blogRouter);

// Route de test
app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

// Configuration du serveur
const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;

app.listen(port, hostname, () => {
    console.log(`Serveur démarré sur http://${hostname}:${port}`);
});