import { productModel,Product } from "../../models/productModel"
describe("productModel", () => { 
    it('it should return an array of products', async () => {
        const product = new productModel()
        const res:Product[] = await product.index()
        expect(res).toBeInstanceOf(Array)
    })

    it('it should return a product', async () => {
        const product:productModel = new productModel()
        const res:Product = await product.show(100)
        expect(res).toBeUndefined()
    })

    it('it should create a product', async () => {
        const product:productModel = new productModel()
        const res:Product = await product.create("test",10,"test")
        expect(res).toBeInstanceOf(Object)
    })

    it('it should return top 5 popular products', async () => {
        const product:productModel = new productModel()
        const res:Product[] = await product.getTopMostPopularFive()
        expect(res).toBeInstanceOf(Array)
    })

    it('it should return products by category', async () => {
        const product:productModel = new productModel()
        const res:Product[] = await product.getCategoryProducts("test")
        expect(res).toBeInstanceOf(Array)
    })
})