import { Request, Response, Router } from "express";
import { productModel, Product } from "../models/productModel";
import validateData from "../validator/productValidation";
import auth from "../validator/userValidation";
const productRouter = Router();
const model = new productModel();
productRouter
  .route("/products")
  .get(async (req: Request, res: Response): Promise<Response> => {
    try {
      const products: Product[] = <Product[]>await model.index();
      return res.json(products);
    } catch (error) {
      return res.json({ message: error });
    }
  })
  .post(
    auth.isAuthenticated,
    validateData,
    async (req: Request, res: Response): Promise<Response> => {
      try {
        const product: Product = await model.create(
          req.body.name,
          req.body.price,
          req.body.category
        );
        return res.json(product);
      } catch (error) {
        return res.json({ message: error });
      }
    }
  );
productRouter
  .route("/product/:id")
  .get(async (req: Request, res: Response): Promise<Response> => {
    try {
      const product: Product = await model.show(parseInt(req.params.id));
      return res.json(product);
    } catch (error) {
      return res.json({ message: "error with getting a product" });
    }
  });
productRouter
  .route("/products/topfive")
  .get(async (req: Request, res: Response): Promise<Response> => {
    try {
      const products: Product[] = await model.getTopMostPopularFive();
      return res.json(products);
    } catch (error) {
      return res.json({ message: error });
    }
  });
productRouter
  .route("/products/category/:category")
  .get(async (req: Request, res: Response): Promise<Response> => {
    try {
      const products: Product[] = await model.getCategoryProducts(
        req.params.category
      );
      return res.json(products);
    } catch (error) {
      return res.json({ message: error });
    }
  });
export default productRouter;
