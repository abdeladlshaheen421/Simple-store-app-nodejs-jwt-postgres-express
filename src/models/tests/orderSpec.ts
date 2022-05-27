import { orderModel,Order } from "../orderModel"
describe("orderModel", () => {
    it("should return an array of orders", async () => {
        const order:orderModel = new orderModel()
        const res:Order[] = await order.getCurrentOrders(1)
        expect(res).toBeInstanceOf(Array)
    })
    it("should return an array of orders", async () => {
        const order:orderModel = new orderModel()
        const res:Order[] = await order.getCompletedOrders(1)
        expect(res).toBeInstanceOf(Array)
    })
})