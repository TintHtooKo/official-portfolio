const Website = require('../model/Website')
const mongoose = require('mongoose')
const removeFile = require('../helper/removeFile')

const WebsiteController = {
    index : async(req,res) =>{
        try {
            let data = await Website.find()
            return res.json(data)
        } catch (e) {
            console.log(e.message);
            return res.status(500).json({msg:"server error"})
        }
    },

    create : async(req,res) =>{
        try {
            let {name,link} = req.body
            let data = await Website.create({name,link})
            return res.status(200).json(data)
        } catch (e) {
            console.log(e.message);
            return res.status(500).json({msg:"server error"})
        }
    },

    detail : async(req,res) =>{
        try {
            let id = req.params.id
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({msg:"Invalid Id"})
            }

            let data = await Website.findById(id)
            if(!data){
                return res.status(400).json({msg:"not found"})
            }else{
                return res.json(data)
            }
        } catch (e) {
            console.log(e.message);
            return res.status(500).json({msg:"server error"})
        }
    },

    update : async(req,res) =>{
        try {
            let id = req.params.id
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({msg:"Invalid Id"})
            }

            let data = await Website.findByIdAndUpdate(id,{...req.body},{new:true});
            await removeFile(__dirname + '/../public' + data.image)
            if(!data){
                return res.status(400).json({msg:'not found'})
            }
            return res.json(data);

        } catch (e) {
            console.log(e.message);
            return res.status(500).json({msg:"server error"})
        }
    },

    delete : async(req,res) =>{
        try {
            let id = req.params.id
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({msg:"Invalid Id"})
            }

            let data = await Website.findByIdAndDelete(id)
            await removeFile(__dirname + '/../public' + data.image)
            if(!data){
                return res.status(400).json({msg:"not found"})
            }else{
                return res.json({msg:"delete success"})
            }
        } catch (e) {
            console.log(e.message);
            return res.status(500).json({msg:"server error"})
        }
    },

    upload : async(req,res) =>{
        try {
            let id = req.params.id
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({msg:"Invalid Id"})
            }

            let data = await Website.findByIdAndUpdate(id,{
                image : '/' + req.file.filename
            })
            if(!data){
                return res.status(400).json({msg:"not found"})
            }else{
                return res.json(data)
            }
        } catch (e) {
            console.log(e.message);
            return res.status(500).json({msg:"server error"})
        }
    }
}

module.exports = WebsiteController