import supertest,{Response,Test} from "supertest"
import app from "./../../server"
const request: supertest.SuperTest<Test> = supertest(app)
describe('product router',()=>{
    
    it('it should return array of products',async()=>{
        const response = await request.get('/products')
        expect(response.status).toBe(200)
    })
    it('it should be able to create a product',async ()=>{
        const response = await request.post('/products').send({name:'test',price:10,category:'test'})
        expect(response.status).toBe(401)
    })
    it('it should be able to get a product',async ()=>{
        const response = await request.get('/product/5')
        expect(response.status).toBe(200)
    })
    it('it should be able to get all products in a category',async ()=>{
        const response = await request.get('/products/category/test')
        expect(response.status).toBe(200)
    })

    it('it should be able to get all products in a category',async ()=>{
        const response = await request.get('/products/topfive')
        expect(response.status).toBe(200)
    })

})