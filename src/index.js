const express = require('express');
const path = require('path');
const flash = require('connect-flash');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const engine = require('ejs-mate');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const { mongodb } = require('./keys');



const app = express();
require('./database');
require('./passport/local-auth.js');
//settings
app.set('port', 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('ejs', engine);
app.set('view engine', 'ejs');

app.engine('html', require('ejs').renderFile); /*--> esto es por si necesito trabajar mejor en html pero renderizarlos en ejs*/


//middlewares
//app.use(expressLayouts);
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret:'bestpasswordintheworld',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use((req, res, next) => {
    app.locals.signinMessage = req.flash('signinMessage');
    app.locals.signupMessage = req.flash('signupMessage');
    app.locals.user = req.user;
    console.log(app.locals)
    next();
  });

app.use(express.static("."));

//rutas
app.use(require('./routes/index'));

app.get('*',(req,res,next)=>{
    res.render(__dirname + '\\views\\partials\\errorpage.html');
});




//static files
app.use(express.static(path.join(__dirname, '/public')));
// server
app.listen(app.get('port'), ()=>{
    console.log("Servidor encendido", app.get('port'));
});


// aqui esta el servidor 

