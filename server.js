const express = require('express');
const path = require('path');
const session = require('express-session');
const exphbs = require('express-handlebars');

const app = express();

// Middleware to parse JSON and url-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(session({
    secret: 'webbank-secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Setting up Handlebars as the view engine
app.engine('hbs', exphbs.engine({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials')
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (like CSS, images)
app.use(express.static(path.join(__dirname, 'public')));

// Root route
app.get('/', (req, res) => {
    res.render('layouts/banking', { title: 'WebBank App' });
});
// Root route
app.get('/deposit', (req, res) => {
    res.render('layouts/deposit', { title: 'Deposit' });
});
// Root route
app.get('/balance', (req, res) => {
    res.render('layouts/balance', { title: 'Balance' });
});
// Root route
app.get('/withdrawal', (req, res) => {
    res.render('layouts/withdrawal', { title: 'Withdrawal' });
});
// Root route
app.get('/openaccount', (req, res) => {
    res.render('layouts/openAccount', { title: 'Open account' });
});
// Root route
app.get('/banking', (req, res) => {
    res.render('layouts/banking', { title: 'WebBank App' });
});
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
