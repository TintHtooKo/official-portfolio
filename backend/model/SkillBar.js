const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SkillBarSchema = new Schema({
    name : {
        type :String,
        required : true
    },
    percent : {
        type : Number,
        required : true
    }
})

module.exports = mongoose.model('SkillBar',SkillBarSchema)