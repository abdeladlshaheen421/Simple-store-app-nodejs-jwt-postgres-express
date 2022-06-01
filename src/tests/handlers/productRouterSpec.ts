import supertest,{Response,Test} from "supertest"
import app from "./../../server"
const request: supertest.SuperTest<Test> = supertest(app)
describe('product router',()=>{
    it('it should be able to create a product',async ()=>{
        const response = await request.post('/products').send({name:'test',price:10,category:'test'})
        expect(response.status).toBe(401)
    })
})