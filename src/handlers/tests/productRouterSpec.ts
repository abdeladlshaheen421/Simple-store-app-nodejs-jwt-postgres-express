import supertest,{Request,Response} from "supertest"
import orderRouter from "../orderRouter"
describe('orderRouter',()=>{
    it('it should be able to get all products',async ()=>{
        const response = await supertest(orderRouter).get('/products')
        expect(response.status).toBe(200)
    })
    it('it should be able to create a product',async ()=>{
        const response = await supertest(orderRouter).post('/products').send({name:'test',price:10,category:'test'})
        expect(response.status).toBe(200)
    })
    it('it should be able to get a product',async ()=>{
        const response = await supertest(orderRouter).get('/product/1')
        expect(response.status).toBe(200)
    })
    it('it should be able to get all products in a category',async ()=>{
        const response = await supertest(orderRouter).get('/products/category/test')
        expect(response.status).toBe(200)
    })
    it('it should be able to get top five most popular products',async ()=>{
        const response = await supertest(orderRouter).get('/products/topfive')
        expect(response.status).toBe(200)
    })
})