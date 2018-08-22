const PORT = process.env.PORT;
const HOST = 'vast-springs-36717.herokuapp.com';

const express = require('express');
const app = express();

const auth = require('./routes/auth');
const hello = require('./routes/hello');
const check = require('./middleware/tokenCheck');


app.set('views', './views');
app.set('view engine', 'pug');

app.use('/', auth);
app.use(check);
app.use('/hello', hello);

app.listen(PORT, () => console.log(`App is listening on http://${HOST}:${PORT}/`));