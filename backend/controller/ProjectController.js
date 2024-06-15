const removeFile = require('../helper/removeFile')
const Position = require('../model/Position')
const Project = require('../model/Project')
const mongoose = require('mongoose')

const ProjectController = {
    index : async(req,res)=> {
        try {
            let data = await Project.find()
            return res.json(data)
        } catch (e) {
            return res.status(500).json({msg:"server error"})
        }
    },

    create : async(req,res)=> {
        try {
            let {name,link} = req.body
            let data = await Project.create({name,link})
            return res.status(200).json(data)
        } catch (e) {
            return res.status(500).json({msg:"server error"})
        }
    },

    detail : async(req,res)=> {
        try {
            let id = req.params.id
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({msg:"Invalid id"})
            }
            let data = await Project.findById(id)
            if(!data){
                return res.status(400).json({msg:"Not found"})
            }
            return res.json(data)
        } catch (e) {
            return res.status(500).json({msg:"server error"})
        }
    },

    update : async(req,res)=> {
        try {
            let id = req.params.id
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({msg:"Invalid id"})
            }

            let currentProject = await Project.findById(id);
            if (!currentProject) {
                return res.status(404).json({ msg: "Project not found" });
            }

            let data = await Project.findByIdAndUpdate(id,{...req.body},{new : true})
            if (req.body.image && currentProject.image) {
                await removeFile(__dirname + '/../public' + currentProject.image);
            }
            
            return res.json(data)
        } catch (e) {
            return res.status(500).json({msg:"server error"})
        }
    },

    delete : async(req,res)=> {
        try {
            let id = req.params.id
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({msg:"Invalid id"})
            }
            let data = await Project.findByIdAndDelete(id)
            await removeFile(__dirname + '/../public' + data.image)
            if(!data){
                return res.status(400).json({msg:"Not found"})
            }
            return res.json({msg:"delete success"})
        } catch (e) {
            return res.status(500).json({msg:"server error"})
        }
    },

    upload : async(req,res) =>{
        try {
            let id = req.params.id
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({msg:"Invalid id"})
            }
            let existingData = await Project.findById(id);
            if (!existingData) {
                return res.json({ msg: 'Not found' });
            }
            let updateData = { image: '/' + req.file.filename };

            if (existingData.image && existingData.image !== updateData.image) {
                await removeFile(__dirname + '/../public' + existingData.image);
            }

            let data = await Project.findByIdAndUpdate(id, updateData, { new: true });
            return res.json(data)
        } catch (e) {
            return res.status(500).json('server error')
        }
}
}

module.exports = ProjectController