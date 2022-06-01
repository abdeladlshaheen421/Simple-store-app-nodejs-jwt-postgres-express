import { userModel,User } from '../models/userModel';
import {Request,Response,Router} from 'express'
import auth from './../validator/userValidation'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
const {SECRET_KEY}=process.env
const userRouter = Router()
const model = new  userModel()
userRouter.route('/users')
.get(auth.isAuthenticated,async (req:Request,res:Response):Promise<Response>=>{
    try{
        const users = await model.index()
        return res.json(users)
    }
    catch(error){
        return res.json({message:error})
    }
})
.post(auth.validateData,auth.isAuthenticated,async (req:Request,res:Response):Promise<Response>=>{
    try{
        const user:User = req.body
        const newUser = await model.create(user.firstName,user.lastName,user.password)
        const token = jwt.sign({user:newUser},<string>SECRET_KEY)
        return res.json({newUser,token})
    }
    catch(error){
        console.error(error)
        return res.json({message:error})
    }
})
userRouter.route('/users/:userId')
.get(auth.isAuthenticated,async (req:Request,res:Response):Promise<Response>=>{
    try{
        const userId:number =parseInt(req.params.userId)
        const user = await model.show(userId)
        return res.json(user)
    }
    catch(error){
        return res.json({message:error})
    }
})

userRouter.route('/users/login')
.post(auth.validateData,async (req:Request,res:Response):Promise<Response>=>{
    try{
        const user:User = req.body
        const foundUser = await model.login(user.firstName,user.password)
        const token = jwt.sign({user:foundUser},<string>SECRET_KEY)
        return res.json({foundUser,token})
    }
    catch(error){
        console.error(error)
        return res.json({message:error})
    }
})
userRouter.route('/users/register')
.post(auth.validateData,async (req:Request,res:Response):Promise<Response>=>{
    try{
        const user:User = req.body
        const newUser = await model.register(user.firstName,user.lastName,user.password)
        const token = jwt.sign({user:newUser},<string>SECRET_KEY)
        return res.json({newUser,token})
    }
    catch(error){
        console.error(error)
        return res.json({message:error})
    }
})

export default userRouter