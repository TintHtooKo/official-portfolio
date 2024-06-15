const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProjectSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    link : {
        type : String,
        required : true
    },
    image : {
        type : String,
    }
})

module.exports = mongoose.model("Project",ProjectSchema)