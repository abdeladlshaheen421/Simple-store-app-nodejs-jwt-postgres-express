import supertest,{Request,Response} from "supertest"
import userRouter from "../userRouter"
describe('userRouter',()=>{
    it('it should be able to get all users',async ()=>{
        const response = await supertest(userRouter).get('/users')
        expect(response.status).toBe(200)
    })
    it('it should be able to create a user',async ()=>{
        const response = await supertest(userRouter).post('/users').send({firstName:'test',lastName:'test',password:'test'})
        expect(response.status).toBe(200)
    })
    it('it should be able to get a user',async ()=>{
        const response = await supertest(userRouter).get('/users/1')
        expect(response.status).toBe(200)
    })
})