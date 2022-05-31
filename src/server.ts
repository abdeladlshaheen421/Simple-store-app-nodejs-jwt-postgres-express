import express,{Request,Response,NextFunction} from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'
import router from './handlers/router'
dotenv.config()
const app = express()

const {PORT} = process.env
app.listen((PORT||8080), ():void => {
  console.log(`Server is running on port ${process.env.PORT} : http://localhost:${process.env.PORT}`)
})

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
// routes handler middleware
app.use(router)
// error handler middleware
app.use((err:Error,req:Request,res:Response,next:NextFunction) : Response => {
    return res.status(500).json({err})
})

// notfound handler middleware
app.use((req:Request,res:Response,next:NextFunction) : Response => {
    return res.status(404).json({err: 'Not Found'})
})

export default app