const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const {Schema} = mongoose;

const userSchema = new Schema({
    //username: String,
    email: String,
    password: String
});

userSchema.methods.encryptPassword = (password) =>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};
//aqui se encuentra los metodos de encryptacion y comparacion de contrasenia asi como el seteo de la clase Schema
userSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('users', userSchema);