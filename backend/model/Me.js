const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MeSchema = new Schema({
    name : {
        type : String,
        required : true,
    },
    profile : {
        type : String,
        require : false
    }
})

module.exports = mongoose.model('Me',MeSchema)