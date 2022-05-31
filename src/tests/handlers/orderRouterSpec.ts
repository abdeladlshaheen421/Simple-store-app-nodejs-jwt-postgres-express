import supertest,{Test,Response} from "supertest"
import app from "./../../server"
const request: supertest.SuperTest<Test> = supertest(app)
describe('orderRouter',()=>{
    it('it should be able to get all orders',async ()=>{
        const response:Response = await request.get('/orders')
        expect(response.status).toBe(401)
    })
    it('it should be able to get all completed orders',async ()=>{
        const response:Response = await request.get('/orders/completed')
        expect(response.status).toBe(401)
    })
    
})