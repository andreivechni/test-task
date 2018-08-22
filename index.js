const PORT = 3000;
const HOST = 'localhost';

const express = require('express');
const app = express();

const auth = require('./routes/auth');
const hello = require('./routes/hello');
const check = require('./middleware/tokenCheck');

console.log('http://localhost:3000/auth');

app.set('views', './views');
app.set('view engine', 'pug');

app.use('/auth', auth);
app.use(check);
app.use('/hello', hello);

app.listen(PORT, () => console.log(`App is listening on http://${HOST}:${PORT}/`));