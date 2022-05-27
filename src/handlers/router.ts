import {Router} from 'express'
import orderRouter from './orderRouter'
import productRouter from './productRouter'
import userRouter from './userRouter'

const router:Router[] = [
    productRouter,
    orderRouter,
    userRouter
]
export default router