const Role = require('../model/Role')
const mongoose = require('mongoose')
const RoleController = {
    index : async(req,res) =>{
        let role = await Role.find()
        return res.json(role)
    },
    create : async(req,res) =>{
        try {
            const {role} = req.body
            let create = await Role.create({role})
            return res.status(200).json(create)
        } catch (e) {
            console.log(e.message);
            return res.status(500).json({msg:'server error'})
        }
    },
    delete : async(req,res) =>{
        try {
            let id = req.params.id
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({msg:'Invalid Id'})
            }
            let role = await Role.findByIdAndDelete(id)
            if(!role){
                return res.status(400).json({msg:'role not found'})
            }
            return res.status(200).json({msg:'delete'})

        } catch (e) {
            console.log(e.message)
        }
    },
}

module.exports = RoleController