import {Request,Response,NextFunction} from 'express'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
dotenv.config()
const {
    SECRET_KEY,
} = process.env
const isAuthenticated = (req:Request, res:Response, next:NextFunction) => {
    try{
        const authHeader:string = <string>req.headers.authorization
        const token:string =authHeader.split(' ')[1]
        jwt.verify(token,<string>SECRET_KEY)
        
        next()
    }catch(error){
        return res.status(401).json({error:'Access Denied , error with Token'})
    }
}

const validateData = (req:Request,res:Response,next:NextFunction):Response|void => {
    const {firstName,lastName,password} = req.body
    const error = []
    if(!firstName){
        error.push({firstName:'Missing firstName (required)'})
    }
    if(!lastName){
        error.push({lastName:'Missing lastName (required)'})
    }
    if(!password){
        error.push({password:'Missing password (required)'})
    }
    if(error.length){
        return res.json({error})
    }
    else {
        next()
    }
}

export default {isAuthenticated
,validateData}