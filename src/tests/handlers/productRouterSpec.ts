import supertest,{Response,Test} from "supertest"
import app from "./../../server"
import userRouter from './../../handlers/userRouter'
import { log } from "console"
const request: supertest.SuperTest<Test> = supertest(app)
describe('product router',()=>{
    let token: string
    beforeAll( async()=>{
        await request.post('/users/register').send({firstName:'testuser',lastName:'testuser',password:'testuser'})
        const response = await request.post('/users/login').send({firstName:'testuser',password:'testuser'})
        token = response.body.token
    })

    it ('user should able to register', async()=>{
        const response = await request.post('/users/register').send({firstName:'testuser2',lastName:'testuser2',password:'testuser2'})
        expect(response).toBeDefined()
    })
    it('it should be able to create a product',async ()=>{
        const response = await request.post('/products').send({name:'test',price:10,category:'test'}).set('authorization',`Bearer ${token}`)
        expect(response.status).toBe(200)
    })

    it('it should return array of products',async()=>{
        const response = await request.get('/products')
        expect(response.status).toBe(200)
    })
    it('it should be able to create a product',async ()=>{
        const response = await request.post('/products').send({name:'test',price:10,category:'test'}).set('authorization',`Bearer ${token}`)
        expect(response.status).toBe(200)
    })
    it('it should be able to get a product',async ()=>{
        const response = await request.get('/product/1')
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