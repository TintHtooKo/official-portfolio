const Contact = require('../model/Contact')
const mongoose = require('mongoose')

const ContactController = {
    index : async(req,res) =>{
        try {
            let data = await Contact.find()
            return res.json(data)
        } catch (e) {
            console.log(e);
        }
    },
    create : async(req,res) =>{
        try {
            let {name,email,phone,whatsapp,message} = req.body
            let data = await Contact.create({
                name,
                email,
                phone,
                whatsapp,
                message
            })
            return res.status(200).json(data)
        } catch (e) {
            console.log(e);
        }
    },
    detail : async(req,res) =>{
        try {
            let id = req.params.id
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({msg:"Invalid id"})
            }
            let data = await Contact.findById(id)
            if(!data){
                return res.status(400).json({msg:"no Contact"})
            }else{
                return res.json(data)
            }
        } catch (e) {
            console.log(e);
        }
    },
    delete : async(req,res) =>{
        try {
            let id = req.params.id
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({msg:"Invalid id"})
            }
            let data = await Contact.findByIdAndDelete(id)
            if(!data){
                return res.status(400).json({msg:"no Contact"})
            }else{
                return res.json({msg:'delete'})
            }
        } catch (e) {
            console.log(e);
        }
    },
}

module.exports = ContactController