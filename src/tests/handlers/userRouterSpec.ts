import supertest,{Test,Response} from "supertest"
import userRouter from "../../handlers/userRouter"
import app from "../../server"
const request: supertest.SuperTest<Test> = supertest(app)
describe('userRouter',()=>{
    it('it should be able to get all users',async ()=>{
        const response = await request.get('/users')
        expect(response.status).toBe(401)
    })
    it('it should be able to create a user',async ()=>{
        const response = await request.post('/users').send({firstName:'test',lastName:'test',password:'test'})
        expect(response.status).toBe(401)
    })
    it('it should be able to get a user',async ()=>{
        const response = await request.get('/users/1')
        expect(response.status).toBe(401)
    })

    it('should be able to login a user',async ()=>{
        const response = await request.post('/users/login').send({firstName:'test',password:'test'})
        expect(response.status).toBe(200)
    })

})