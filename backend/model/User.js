const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Role = require('../model/Role')
const bcrypt = require('bcrypt')
const UserSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Role',
        required : true
    },
})

UserSchema.statics.register = async function(name,email,password,role){
    let userExist = await this.findOne({email})
    if(userExist){
        throw new Error("Email already register")
    }
    
    let salt = await bcrypt.genSalt()
    let hashValue = await bcrypt.hash(password, salt)

    if (!role) {
        try {
            const defaultRole = await Role.findOne({ role: 'user' });
            if (defaultRole) {
                role = defaultRole._id;
            } else {
                throw new Error('Default role not found');
            }
        } catch (e) {
            console.log(e.message);
        }
    }

    let user = await this.create({
        name,
        email,
        password : hashValue,
        role
    })
    return user;
}

UserSchema.statics.login = async function(email,password){
    let user = await this.findOne({email})
    if(!user){
        throw new Error('Email does not register')
    }
    let isCorrect = await bcrypt.compare(password,user.password)
    if(!isCorrect){
        throw new Error("Wrong Password. Please Try again")
    }else{
        return user
    }
}

module.exports = mongoose.model('User',UserSchema)