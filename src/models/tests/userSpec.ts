import { userModel,User } from "../userModel"
describe("userModel", () => {
    it("should return an array of users", async () => {
        const user = new userModel()
        const res: User[] = await user.index()
        expect(res).toBeInstanceOf(Array)
    })

    it("should return a user", async () => {
        const user: userModel = new userModel()
        const res: User = await user.show(1)
        expect(res).toBeInstanceOf(Object)
    })

    it("should create a user", async () => {
        const user: userModel = new userModel()
        const res: User = await user.create("test", "test", "test")
        expect(res).toBeInstanceOf(Object)
    })
})