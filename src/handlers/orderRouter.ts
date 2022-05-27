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
.get(auth.isAuthenticated,async (req:Request,res:Response,next:NextFunction):Promise<Response>=>{
    try{
        const userId = getUserId(req)
        const orders:Order[] = await model.getCurrentOrders(userId)
        return res.json(orders)
    }
    catch(error)
    {
        return res.status(500).json({error: 'error with getting current orders'})
    }
})
orderRouter.route('/orders/completed')
.get(auth.isAuthenticated,async (req:Request,res:Response):Promise<Response>=>{
    try{
        const userId = getUserId(req)
        const orders:Order[] = await model.getCompletedOrders(userId)
        return res.json(orders)
    }
    catch(error){
        return res.status(500).json({error:'error with getting completed orders'})
    }
})
const getUserId = (req:Request):number =>{
    const authHeader:string = <string>req.headers.authorization
    const token:string =authHeader.split(' ')[1]
    const {id,firstName,lastName,password} = <User>jwt.verify(token,<string>SECRET_KEY)
    return id
}
export default orderRouter