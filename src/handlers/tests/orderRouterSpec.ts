import supertest,{Request,Response} from "supertest"
import orderRouter from "../orderRouter"
describe('orderRouter',()=>{
    it('it should be able to get all orders',async ()=>{
        const response = await supertest(orderRouter).get('/orders')
        expect(response.status).toBe(200)
    })
    it('it should be able to get all completed orders',async ()=>{
        const response = await supertest(orderRouter).get('/orders/completed')
        expect(response.status).toBe(200)
    })
    
})