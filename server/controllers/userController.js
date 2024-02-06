// 1st import model
const userModel = require('../models/userModel');

// register controller
const registerController = async (req, res, next) => {
try{
    // const {name, email, password} = req.body;

    const newUser =  new userModel(req.body);
    await newUser.save();
    res.status(201).json({
     success: true,
     newUser
    })
}
catch(error){
     res.status(400).json({success: false, error})
}
}


// login controller
const loginController = async(req, res, next) =>{
try{
   const { email, password} = req.body;

   const user = await userModel.findOne({email, password})
   if(!user){
    return res.status(404).send("user not found");
   }
     // Send only necessary user information to the client
     const { _id, name, } = user;
   res.status(200).json({success: true, user:{_id, name, email}})
}
catch(error){
res.status(400).json({success: false, error})
}

}





module.exports = {loginController, registerController}