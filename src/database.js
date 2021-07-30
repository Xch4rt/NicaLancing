const mongoose = require('mongoose');
const {mongodb} = require('./keys');
// conecto con la base de datos, OJO PARA CORRERLA NECESITARIAN TODO LO QUE ESTA EN EL package.json y aparte mongoDB
mongoose.connect(mongodb.URI, {useUnifiedTopology: true, useNewUrlParser: true})
    .then(db => console.log('Database is connected'))
    .catch(err => console.error(err));