const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ContactSchema = new Schema({
    name : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true
    },
    phone : {
        type : String,
        require : true
    },
    whatsapp : {
        type : String,
        require : true
    },
    message : {
        type : String,
        require : true
    },
},{timestamps:true})

module.exports = mongoose.model('Contact',ContactSchema)