import userModel from '../Schemas/userSchema.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'; 
import token from '../Schemas/token.js'

dotenv.config();

export const addUser = async(request, response) => {

    const {name, username, password}= request.body

    try{

        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);

        const preUser= await userModel.findOne({username : username});

        if(preUser){
            response.send({message: "Username already exist"})
        }   

        else{
        const newData = new userModel({name : name, username : username , password: hashPassword});
        await newData.save();
        return response.status(200).json({msg: "Successfully registered"});
        }

    }catch(error){
        return response.status(404).json({msg: "Error in signup Controller"});
    }
    
}

export const loginUser = async(request, response)=> {

    let user = await userModel.findOne({username : request.body.username});

    if(!user){
        return response.status(400).json({msg : "User not found"})
    }

    try{

        let match= await bcrypt.compare(request.body.password, user.password);
        if(match){

            const accessToken = jwt.sign(user.toJSON(),process.env.ACCESS_SECRET_KEY, {expiresIn: '15m'} );//body should be pass as JSON 

            const refreshToken= jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);

            const newToken =new token({token : refreshToken})

            await newToken.save();

            return response.status(200).json({accessToken : accessToken, refreshToken : refreshToken, name: user.name, username : user.username})

        }else{
            return response.status(404).json({msg : "Password did not match"});
        }

    }catch(error){
        return response.status(404).json({msg : "Error while login"});
    }
}