import { type } from 'os'
import { QueryResultRow } from 'pg'
import client from '../database'
export type Product = {
    id: number,
    name: string,
    price: number,
    category:string
}
export class productModel {
    async index ():Promise<Product[]> {
        try{
            const conn = await client.connect()
            const sql:string = 'SELECT * FROM products'
            const res:QueryResultRow = await conn.query(sql)
            conn.release()
            return res.rows
        }
        catch(error){
            throw new Error(`error with getting all products ${error}`);
        }
        
    }
    
    async create (name:string,price:number,category:string):Promise<Product> {
        try{
            const conn = await client.connect()
            const sql:string = 'INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *'
            const res:QueryResultRow = await conn.query(sql, [name, price, category])
            conn.release()
            return res.rows[0]
        }
        catch(error){
            throw new Error(`error with creating a product ${error}`);
        }
    }
    
    async show(id:number):Promise<Product>{
        try{
            const conn = await client.connect()
            const sql:string = 'SELECT * FROM products WHERE id = $1'
            const res:QueryResultRow = await conn.query(sql, [id])
            conn.release()
            return res.rows[0]
        }
        catch(error){
            throw new Error(`error with getting a product ${error}`);
        }
    }
    async getTopMostPopularFive():Promise<Product[]> {
        try{
            const conn = await client.connect()
            const sql:string = 'SELECT COUNT(*) AS popular , products.id,name ,price, category FROM orders INNER JOIN products  ON products.id = orders.product_id GROUP BY products.id ORDER BY popular DESC LIMIT 5'
            const res:QueryResultRow = await conn.query(sql)
            conn.release()
            return res.rows
        }
        catch(error){
            throw new Error(`error with getting top 5 products ${error}`);
        }
    }
    async getCategoryProducts(category:string):Promise<Product[]> {
        try{
            const conn = await client.connect()
            const sql:string = 'SELECT * FROM products WHERE category = $1'
            const res:QueryResultRow = await conn.query(sql, [category])
            conn.release()
            return res.rows
        }
        catch(error){
            throw new Error(`error with getting category products ${error}`);
        }
    }
}
