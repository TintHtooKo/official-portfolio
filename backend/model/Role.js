const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RoleSchema = new Schema({
    role : {
        type : String,
        require : true
    }
})

module.exports = mongoose.model('Role',RoleSchema)