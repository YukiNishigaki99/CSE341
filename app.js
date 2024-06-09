const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const mongodb = require('./db/connect');
const port = process.env.PORT || 8080;
const app = express();

// Passport config
require('passport')(passport)

app
    .use(bodyParser.json())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    })
    .use('/', require('./routes'));
app.use(bodyParser.urlencoded({
    extended: false
}));

mongodb.initDb((err, mongodb) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port);
        console.log(`Connected to DB and listening on ${port}`);
    }
});


// Sessions
app.use(session({
    secret: 'keyboad cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true
    }

}))



// Passport middleware
app
    .use(passport.initialize())
    .use(passport.session());