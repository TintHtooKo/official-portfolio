const User = require('../model/User')
const mongoose = require('mongoose')
const createToken = require('../token/createToken')

const UserController = {
    index : async (req,res)=>{
        let user = await User.find().populate('role')
        return res.json(user)
    },
    create : async(req,res)=>{
        try {
            let {name,email,password,role} = req.body
            let user = await User.register(name,email,password,role)
            let token = createToken(user._id)
            return res.status(200).json({user,token})
        } catch (e) {
            console.log(e.message);
            return res.status(500).json({msg:e.message})
        }
    },

    login : async(req,res)=>{
        try {
            const {email,password} = req.body
            let user = await User.login(email,password)
            let token = createToken(user._id)
            return res.status(200).json({user,token})
        } catch (e) {
            console.log(e.message);
            return res.status(500).json({msg : e.message})         
        }
    },

    detail : async(req,res)=>{
        try {
            let id = req.params.id
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({msg : 'Invalid id'})
            }
            let user = await User.findById(id)
            if(!user){
                return res.status(400).json({msg : 'User does not exist'})
            }
            return res.status(200).json(user)
        } catch (e) {
            return res.status(500).json({msg : e.message})    
        }
    },
    update : async (req,res)=>{
        try {
            let id = req.params.id
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({msg : 'Invalid id'})
            }
            let user = await User.findByIdAndUpdate(id,{...req.body})
            if(!user){
                return res.status(400).json({msg : 'User does not exist'})
            }
            return res.status(200).json({msg : "Update success"})
        } catch (e) {
            return res.status(500).json({msg : e.message})    
        }
    },
    delete : async(req,res)=>{
        try {
            let id = req.params.id
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({msg : 'Invalid id'})
            }
            let user = await User.findByIdAndDelete(id)
            if(!user){
                return res.status(400).json({msg : 'User does not exist'})
            }
            return res.status(200).json({msg : "Delete success"})
        } catch (e) {
            return res.status(500).json({msg : e.message})    
        }
    },
}

module.exports = UserController