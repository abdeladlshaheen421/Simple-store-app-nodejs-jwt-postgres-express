import {Request,Response,NextFunction} from 'express'
import dotenv from 'dotenv'
dotenv.config()

const validateData = (req:Request,res:Response,next:NextFunction):Response|void => {
    const {name,price,category} = req.body
    const error = []
    if(!name){
        error.push({firstName:'Missing product Name (required)'})
    }
    if(!price && isNaN(price)){
        error.push({firstName:'Missing price (required and number)'})
    }
    if(error.length){
        return res.json({error})
    }
    else {
        next()
    }
}
export default validateData