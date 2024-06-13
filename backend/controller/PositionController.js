const mongoose = require('mongoose')
const Position = require('../model/Position')

const PositionController = {
    index : async(req,res) =>{
        try {
            let data = await Position.find()
            return res.json(data)
        } catch (e) {
            return res.status(500).json({msg:'Server Error'})
        }
    },
    create : async(req,res) =>{
        try {
            let {position} = req.body
            let data = await Position.create({position})
            return res.status(200).json(data)
        } catch (e) {
            return res.status(500).json({msg:'Server Error'})
        }
    },
    detail : async(req,res) =>{
        try {
            let id = req.params.id
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({msg:'Invalid Id'})
            }
            let data = await Position.findById(id)
            if(!data){
                return res.status(400).json({msg:'No data found'})
            }
            return res.json(data)
        } catch (error) {
            return res.status(500).json({msg:'Server Error'})
        }
    },
    update : async(req,res) =>{
        try {
            let id = req.params.id
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({msg:'Invalid Id'})
            }
            let data = await Position.findByIdAndUpdate(id,{...req.body})
            if(!data){
                return res.status(400).json({msg:'No data found'})
            }
            return res.status(200).json({msg:"Update Success"})
        } catch (error) {
            return res.status(500).json({msg:'Server Error'})
        }
    },
    delete : async(req,res) =>{
        try {
            let id = req.params.id
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({msg:'Invalid Id'})
            }
            let data = await Position.findByIdAndDelete(id)
            if(!data){
                return res.status(400).json({msg:'No data found'})
            }
            return res.status(200).json({msg:"delete Success"})
        } catch (error) {
            return res.status(500).json({msg:'Server Error'})
        }
    },
}

module.exports = PositionController