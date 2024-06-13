const removeFile = require('../helper/removeFile')
const Me = require('../model/Me')
const mongoose = require('mongoose')
const fs = require('fs').promises

const MeController = {
    index : async(req,res)=>{
        try {
            let data = await Me.find()
            return res.json(data)
        } catch (e) {
            return res.status(500).json({msg:'Server Error'})
        }
    },
    create : async(req,res)=>{
        try {
            const {name} = req.body
            let data = await Me.create({name})
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
            let data = await Me.findById(id)
            if(!data){
                return res.status(400).json({msg:'No data found'})
            }
            return res.json(data)
        } catch (error) {
            return res.status(500).json({msg:'Server Error'})
        }
    },
    update : async(req,res)=>{
        try {
            let id = req.params.id;
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.json({ msg: 'Invalid Id' });
            }
    
            // Find the existing document
            let existingData = await Me.findById(id);
            if (!existingData) {
                return res.json({ msg: 'Not found' });
            }
    
            // Prepare the update object
            let updateData = { ...req.body };
    
            // If profile field exists in the request body, handle the file removal
            if (req.body.profile && existingData.profile && req.body.profile !== existingData.profile) {
                await removeFile(__dirname + '/../public' + existingData.profile);
            }
    
            // Update the document
            let data = await Me.findByIdAndUpdate(id, updateData, { new: true });
            
            return res.status(200).json({ msg: 'Update success', data });
        } catch (e) {
            console.log(e.message);
            return res.status(500).json({ msg: 'Server Error' });
        }
    },
    delete : async(req,res)=>{
        try {
            let id = req.params.id
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.json({msg:'Invalid Id'})
            }
            let data = await Me.findByIdAndDelete(id)
            await removeFile(__dirname + '/../public'+data.profile)
            if(!data){
                return res.status(400).json({msg:"No data found"})
            }
            return res.status(200).json({msg:'Delete Success'})
        } catch (e) {
            return res.status(500).json({msg:'Server Error'})
        }
    },
    upload : async(req,res)=>{
         try {
            let id = req.params.id
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.json({msg:'Invalid Id'})
            }

            let existingData = await Me.findById(id);
            if (!existingData) {
                return res.json({ msg: 'Not found' });
            }
            let updateData = { profile: '/' + req.file.filename };

            // Handle the file removal if the profile is being updated
            if (existingData.profile && existingData.profile !== updateData.profile) {
                await removeFile(__dirname + '/../public' + existingData.profile);
            }

            // Update the document
            let data = await Me.findByIdAndUpdate(id, updateData, { new: true });

            return res.status(200).json({msg:'Upload success'})
        } catch (e) {
            console.log(e.message);
            return res.status(500).json({msg:'Server Error'})
        }
    }
}

module.exports = MeController