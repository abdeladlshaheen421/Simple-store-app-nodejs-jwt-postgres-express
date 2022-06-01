import { orderModel,Order } from "../../models/orderModel"
describe('test orderModel', () => {
    const model: orderModel = new orderModel()
    it('it should return an array of orders of current products', async () => {
        expect(model.getCurrentOrders(1)).toBeDefined()
    })

    it('it should return an array of orders of current products', async () => {
        expect(model.getCompletedOrders(1)).toBeDefined()
    })
})