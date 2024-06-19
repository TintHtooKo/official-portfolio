const removeFile = require('../helper/removeFile')
const Personal = require('../model/Personal')
const mongoose = require('mongoose')

const PersonalController = {
    index : async(req,res) =>{
        let data = await Personal.find()
        return res.json(data)
    },

    create : async(req,res) =>{
        try {
            let {email,phone,whatsapp} = req.body
            let data = await Personal.create({email,phone,whatsapp})
            return res.status(200).json(data)
        } catch (e) {
            console.log(e);
            return res.status(500).json({msg:'server error'})
            
        }
    },

    detail : async(req,res) =>{
        try {
            let id = req.params.id
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({msg:'Invalid Id'})
            }
            let data = await Personal.findById(id)
            if(!data){
                return res.status(400).json({msg:'No data found'})
            }
            return res.json(data)
        } catch (e) {
            console.log(e);
            return res.status(500).json({msg:'server error'})
            
        }
    },

    update : async(req,res) =>{
        try {
            let id = req.params.id
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({msg:'Invalid Id'})
            }
            let data = await Personal.findByIdAndUpdate(id,{...req.body},{new:true})
            await removeFile(__dirname + '/../public' + data.cv)
            if(!data){
                return res.status(400).json({msg:'No data found'})
            }
            return res.json(data)
        } catch (e) {
            console.log(e);
            return res.status(500).json({msg:'server error'})
            
        }
    },

    delete : async(req,res) =>{
        try {
            let id = req.params.id
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({msg:'Invalid Id'})
            }
            let data = await Personal.findByIdAndDelete(id)
            await removeFile(__dirname + '/../public' + data.cv)
            if(!data){
                return res.status(400).json({msg:'No data found'})
            }
            return res.json({msg:'delete success'})
        } catch (e) {
            console.log(e);
            return res.status(500).json({msg:'server error'})
            
        }
    },

    upload : async(req,res)=>{
        try {
            let id = req.params.id
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({msg:'Invalid Id'})
            }
            let data = await Personal.findByIdAndUpdate(id,{
                cv : '/' + req.file.filename
            })

            if(!data){
                return res.status(400).json({msg:'No data found'})
            }
            return res.json(data)
        } catch (e) {
            console.log(e);
            return res.status(500).json({msg:'server error'})
            
        }
    }
}

module.exports = PersonalController