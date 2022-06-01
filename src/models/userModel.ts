import { QueryResultRow } from 'pg'
import client from '../database'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
dotenv.config()
const {
    SALT_ROUNDS,
    BCRYPT_PASSWORD
} = process.env
export type User = {
    id:number,
    firstName:string,
    lastName:string,
    password:string
}
export class userModel{
    async index():Promise<User[]>{
        try{
            const conn = await client.connect()
            const sql:string = 'SELECT * FROM users'
            const res:QueryResultRow = await conn.query(sql)
            return res.rows
        }
        catch(error){
            throw new Error(`error with getting all users ${error}`);
        }
    }
    async create(firstName:string,lastName:string,password:string):Promise<User>{
        try{
            const conn = await client.connect()
            const hashPassword = bcrypt.hashSync(password+BCRYPT_PASSWORD,parseInt(<string>SALT_ROUNDS))
            const sql:string = 'INSERT INTO users (firstName, lastName, password) VALUES ($1, $2, $3) RETURNING *'
            const res:QueryResultRow = await conn.query(sql, [firstName, lastName, hashPassword])
            return res.rows[0]
        }
        catch(error){
            throw new Error(`error with creating a user ${error}`);
        }
    }
    async login(firstName:string,password:string):Promise<User>{
        try{
            const conn = await client.connect()
            const sql:string = 'SELECT * FROM users WHERE firstName=$1'
            const res:QueryResultRow = await conn.query(sql, [firstName])
            const user:User = res.rows[0]
            const isPasswordValid = bcrypt.compareSync(password+BCRYPT_PASSWORD,user.password)
            if(isPasswordValid){
                return user
            }
            else{
                throw new Error('invalid password')
            }
        }
        catch(error){
            throw new Error(`error with logging in ${error}`);
        }
    }
    async register(firstName:string,lastName:string,password:string):Promise<User>{
        try{
            const conn = await client.connect()
            const hashPassword = bcrypt.hashSync(password+BCRYPT_PASSWORD,parseInt(<string>SALT_ROUNDS))
            const sql:string = 'INSERT INTO users (firstName, lastName, password) VALUES ($1, $2, $3) RETURNING *'
            const res:QueryResultRow = await conn.query(sql, [firstName, lastName, hashPassword])
            return res.rows[0]
        }
        catch(error){
            throw new Error(`error with creating a user ${error}`);
        }
    }
    async show(userId:number):Promise<User>{
        try{
            const conn = await client.connect()
            const sql:string = 'SELECT * FROM users WHERE id = $1'
            const res:QueryResultRow = await conn.query(sql, [userId])
            return res.rows[0]
        }
        catch(error){
            throw new Error(`error with getting a user ${error}`);
        }
    }
}