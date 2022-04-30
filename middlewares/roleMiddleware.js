const { removeListener } = require("../models/User");

module.exports = (role)=>{
    return (req,res,next)=>{
        const userRole = req.body.role;
        if(removeListener.includes(userRole)){
            next();
        }else{
            return res.status(401).send('You dont have the permission for the request!')
        }
    }
}