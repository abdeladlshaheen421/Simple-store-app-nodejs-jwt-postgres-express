import { Request,Response,Router,NextFunction} from 'express'
import { orderModel,Order } from '../models/orderModel'
import auth from '../validator/userValidation'
import {User} from '../models/userModel'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
const orderRouter = Router()
dotenv.config()
const {SECRET_KEY}=process.env
const model = new orderModel()
orderRouter.route('/orders')
.get(auth.isAuthenticated,async (req:Request,res:Response,next:NextFunction):Promise<void>=>{
    try{
        const userId = getUserId(req)
        const orders:Order[] = await model.getCurrentOrders(userId)
        res.json(orders)
        return
    }
    catch(error)
    {
        next(`error ${error}`)
        return
    }
})
orderRouter.route('/orders/completed')
.get(auth.isAuthenticated,async (req:Request,res:Response,next:NextFunction):Promise<void>=>{
    try{
        const userId = getUserId(req)
        const orders:Order[] = await model.getCompletedOrders(userId)
        res.json(orders)
        return
    }
    catch(error){
        next(`error ${error}`)
        return
    }
})
const getUserId = (req:Request):number =>{
    const authHeader:string = <string>req.headers.authorization
    const token:string =authHeader.split(' ')[1]
    const {id,firstName,lastName,password} = <User>jwt.verify(token,<string>SECRET_KEY)
    return id
}
export default orderRouter