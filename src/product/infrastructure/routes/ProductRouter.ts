import express from "express";
import {
    createProductController,
    deleteProductController,
    getAllProductsController,
    getByIdProductController,
    updateProductController
} from "../dependencies";

const productRouter = express.Router();

productRouter.post("/products", createProductController.run.bind(createProductController));
productRouter.delete("/products/:id", deleteProductController.run.bind(deleteProductController));
productRouter.get("/products", getAllProductsController.run.bind(getAllProductsController));
productRouter.get("/products/:id", getByIdProductController.run.bind(getByIdProductController));
productRouter.put("/products/:id", updateProductController.run.bind(updateProductController));

export default productRouter;
