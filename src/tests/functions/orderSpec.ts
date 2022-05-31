import { orderModel,Order } from "../../models/orderModel"
describe("orderModel", () => {

    it("should return an array of orders", async () => {
        const order:orderModel = new orderModel()
        const res:Order[] = await order.getCurrentOrders(100)
        expect(res).toBeInstanceOf(Array)
    })

    it("should return an array of orders", async () => {
        const order:orderModel = new orderModel()
        const res:Order[] = await order.getCompletedOrders(500)
        expect(res).toBeInstanceOf(Array)
    })

})