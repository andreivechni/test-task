const PORT = 3000;
const HOST = 'vast-springs-36717.herokuapp.com';

const express = require('express');
const app = express();

const auth = require('./routes/auth');
const hello = require('./routes/hello');
const check = require('./middleware/tokenCheck');

console.log('vast-springs-36717.herokuapp.com');

app.set('views', './views');
app.set('view engine', 'pug');

app.use('/auth', auth);
app.use(check);
app.use('/hello', hello);

app.listen(PORT, () => console.log(`App is listening on http://${HOST}:${PORT}/`));