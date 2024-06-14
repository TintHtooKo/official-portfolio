const SkillBar = require('../model/SkillBar')
const mongoose = require('mongoose')

const SkillBarController = {
    index : async(req,res)=>{
        try {
            let data = await SkillBar.find()
            return res.json(data)
        } catch (e) {
            return res.status(500).json({msg:"server error"})
        }
    },
    create : async(req,res)=>{
        try {
            let {name,percent} = req.body
            let data = await SkillBar.create({name,percent})
            return res.status(200).json(data)
        } catch (e) {
            return res.status(500).json({msg:"server error"})
        }
    },
    detail : async(req,res)=>{
        try {
            let id = req.params.id
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({msg:"Invalid Id"})
            }

            let data = await SkillBar.findById(id)
            if(!data){
                return res.status(400).json({msg:"not found"})
            }
            return res.status(200).json({data})
        } catch (e) {
            return res.status(500).json({msg:"server error"})
        }
    },
    update : async(req,res)=>{
        try {
            let id = req.params.id
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({msg:"Invalid id"})
            }
            let data = await SkillBar.findByIdAndUpdate(id,{...req.body})
            if(!data){
                return res.status(400).json({msg:"not found"})
            }
            return res.status(200).json({data})
        } catch (e) {
            return res.status(500).json({msg:"server error"})
        }
    },
    delete : async(req,res)=>{
        try {
            let id = req.params.id
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({msg:"Invalid id"})
            }
            let data = await SkillBar.findByIdAndDelete(id)
            if(!data){
                return res.status(400).json({msg:"not found"})
            }
            return res.status(200).json({msg:"delete"})
        } catch (e) {
            return res.status(500).json({msg:"server error"})
        }
    },
}

module.exports = SkillBarController