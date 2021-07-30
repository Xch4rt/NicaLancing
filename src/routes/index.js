// aqui estan las peticiones http y las rutas
const express = require('express');
const router = express.Router();
const passport = require('passport');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
/*
const productSchema = {
    title: String,
    description: String,
    //imageUrl: String,
    pricing: Number
};
const Product = mongoose.model("Product", productSchema);
*/
const users = true;

//rutas
router.get('/',(req, res, next) =>{
    res.render('index.html',{ title: 'NicaLancing'});
});

router.get('/logedsession',isAuthenticated, (req, res, next) =>{
     res.render('logedsession.html', {title: 'Nica Lancing'});
     
});


/*router.get('/login', (req, res)=>{
    res.render('login.html', {title: 'Login'});
    path.join(__dirname, 'public')
});*/
router.get('/signup', (req, res,next)=>
{
    res.render('signup.html',{title:'Sign Up'});
});
router.post('/signup', passport.authenticate('local-signup',{
    successRedirect: '/logedsession',
    failureRedirect: '/signup',
    passReqToCallback: true
    

}));
router.get('/login', (req, res, next) => {
    res.render('login.html', {title: 'Login'});
  });
  
  
router.post('/login', passport.authenticate('local-signin', {
    successRedirect: '/logedsession',
    failureRedirect: '/signup',
    failureFlash: true
    
}));



  

router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/');
});

router.get('/contact',isAuthenticated, (req, res, next) =>{
    res.render('contact.html', {title: 'Contact' , users:users });
});

//categories
let cat  = [
    {
        tech1: 'Diseño Web',
        tech2: 'Programacion',
        tech3: 'Apps Moviles',
        tech4: 'Pruebas de Usuario'
    },
    {
        design1:'Diseño de logos',
        design2:'Game art',
        design3: 'Ilustraciones',
        design4: 'Diseño UX'
    },
    {
        animation1: 'Edicion de video',
        animation2: 'Anuncios para publicidad',
        animation3: 'Intros y outros',
        animation4: 'Animaciones de personajes'
    },
    {
        business1: 'Asistentes virtuales',
        business2: 'Planes de negocio',
        business3: 'RR HH',
        business4: 'Estudio de mercado'
    }
]
router.get('/programntech',isAuthenticated, (req,res,next)=>{
    res.render('programntech.html', {title: 'Programacion y Tecnologia',categories:cat, users:users });
    console.log('mirame ', req);
});

router.get('/design',isAuthenticated, (req,res,next)=>{
    res.render('design.html', {title: 'Diseño', categories:cat, users:users });
});

router.get('/videonanimation',isAuthenticated, (req,res,next)=>{
    res.render('videonanimation.html', {title: 'Video y animacion', categories:cat, users:users });
});

router.get('/business',isAuthenticated, (req,res,next)=>{
    res.render('business.html', {title: 'Negocios', categories:cat, users:users });
});



router.get('/menu', (req, res) =>{
    res.render('postaService.html', {title:'Formulario'});
});

router.post('/menu', (req,res,next)=>{
    console.log(req.bodyParser);
/*
    var data = {
        title: req.body.title,
        description: req.body.description,
        //image
        pricing: req.body.pricing
    };
    var product = new Product(data);
    product.save(function (err) {
        //console.log(product);
        res.render('/')
    });
*/
    res.render('postaService.html', {title:'Formulario'});
});

// PERFIL

router.get('/Perfil', (req,res,next) =>{
    res.render('Perfil.html');
});


// FOOTER LINKS

router.get('/QA',isAuthenticated,(req,res,next)=>{
    res.render('QA.html',{title:'Preguntas y respuestas', users:users});
});
router.get('/segurity',isAuthenticated,(req,res,next)=>{
    res.render('segurity.html',{title:'Seguridad', users:users});
});
router.get('/howsell',isAuthenticated,(req,res,next)=>{
    res.render('howsell.html',{title:'Como vender?', users:users});
});
router.get('/howtobuy',isAuthenticated,(req,res,next)=>{
    res.render('howtobuy.html',{title:'Como comprar?', users:users});
});

function isAuthenticated(req, res, next)
{
    if(req.isAuthenticated()) {
      return next();
    }
    else
    {
        return next();
        users = false;
    }
    //res.redirect('/');
}

module.exports = router;
