import { QueryResultRow } from 'pg'
import client from '../database'
export type Order = {
    id: number,
    user_id: number,
    product_id: number,
    quantity: number,
    status: string
}
export class orderModel {
    async getCurrentOrders(userId:number): Promise<Order[]> {
        try{
            const conn = await client.connect()
            const sql:string = 'SELECT * FROM orders INNER JOIN products ON orders.product_id = products.id WHERE user_id = $1'
            const res:QueryResultRow = await conn.query(sql, [userId])
            return res.rows
        }
        catch(error){
            throw new Error(`error with getting current orders ${error}`);
        }
    }
    async getCompletedOrders(userId:number): Promise<Order[]> {
        try{
            const conn = await client.connect()
            const sql:string = 'SELECT * FROM orders INNER JOIN products ON orders.product_id = products.id WHERE user_id = $1 AND status = \'complete\''
            const res:QueryResultRow = await conn.query(sql, [userId])
            return res.rows
        }
        catch(error){
            throw new Error(`error with getting completed orders ${error}`);
        }
    }
}