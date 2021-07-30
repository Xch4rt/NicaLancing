// aqui esta la logica donde encripto las contrasenias y las paso al server para que se guarden en la database

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

passport.serializeUser((user, done)=>{
    done(null, user.id);
});

passport.deserializeUser(async (id, done)=>{
    const user = await User.findById(id);
    done(null, user);
});

passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback:true
}, async (req, email, password, done) =>{
    const newUser = new User();
    newUser.email = email;
    newUser.password = newUser.encryptPassword(password);

    await newUser.save();

    done(null, newUser);
}));


passport.use('local-signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done)=>{
    const user = await User.findOne({email: email});
    console.log(user);
    if (!user)
    {
        return done(null, false, req.flash('signinMessage', 'Incorrect demail'));
    }
    if (!user.comparePassword(password)){
        return done(null, false, req.flash('signinMessage', 'Incorrect Password'));
    }
    return done(null, user);
}));
