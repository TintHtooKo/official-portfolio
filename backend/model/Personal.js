const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PersonalSchema = new Schema({
    email : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    whatsapp : {
        type : String,
        required : true
    },
    cv : {
        type : String,
    }
})

module.exports = mongoose.model('Personal',PersonalSchema)