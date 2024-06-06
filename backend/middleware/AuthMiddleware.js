const jwt = require('jsonwebtoken')
const User = require('../model/User')

const AuthMiddleware = (req,res,next)=>{
    let token = req.cookies.jwt
    if(token){
        jwt.verify(token,process.env.JWT_SECRET,(err,decodeValue)=>{
            if(err){
                return res.status(400).json({msg:'Unauthenticated'})
            }else{
                User.findById(decodeValue._id).then(user=>{
                    req.user = user
                    next()
                })
            }
        })
    }else{
        return res.status(500).json({msg:'Token need to provide'})
    }
}

module.exports = AuthMiddleware