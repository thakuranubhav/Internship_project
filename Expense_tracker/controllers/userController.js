const userModel= require('../models/usermodels')
const colors= require('colors')

//login controller
const loginController= async(req,res)=>{
    try{
        const {email,password}= req.body
         const user= await userModel.findOne({email,password})
         if(!user){
            return res.status(400).send('user not found')
         }
         console.log(user)
         res.status(200).json({
            success:true,
            user
         })

    } catch(error){
        res.status(400).json({
            success:false,
            error
        })
    }

}

//register controller
const registerController=async (req,res)=>{
    try{
        const newUser= new userModel(req.body);
        await newUser.save()
        console.log(newUser)
        res.status(201).json({
            success:true,
            newUser
        })

    } catch(error){
        res.status(400).json({
            success:false,
            error
        })
    }

}

module.exports={loginController,registerController};