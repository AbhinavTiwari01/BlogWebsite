import jwt from "jsonwebtoken";
import dotenv from 'dotenv'


dotenv.config();


export const authenticateToken = (request, response, next) => {

    const auth = request.headers['authorization'];

    const token = auth && auth.split(' ')[1];

    if(token==null){
        return response.status(404).json({msg : 'Token is missing'});
    }

    jwt.verify(token, process.env.ACCESS_SECRET_KEY, (err, user)=> {

        if(err){
            return response.status(500).json({msg : 'Invalid Token'})
        }
        request.user= user;
        next();

   })

}