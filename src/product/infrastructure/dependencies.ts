import CreateProductUseCase from "../application/CreateProductUseCase";
import DeleteProductUseCase from "../application/DeleteProductUseCase";
import GetAllProductsUseCase from "../application/GetAllProductsUseCase";
import GetByIdProductUseCase from "../application/GetByIdProductUseCase";
import UpdateProductUseCase from "../application/UpdateProductUseCase";

import CreateProductController from "./controllers/CreateProductController";
import DeleteProductController from "./controllers/DeleteProductController";
import GetAllProductsController from "./controllers/GetAllProductsController";
import GetByIdProductController from "./controllers/GetByIdProductController";
import UpdateProductController from "./controllers/UpdateProductController";

import MongoDBProductRepository from "./mongoRepository";


export const mongoRepository = new MongoDBProductRepository();

export const createProductUseCase = new CreateProductUseCase(mongoRepository);
export const deleteProductUseCase = new DeleteProductUseCase(mongoRepository);
export const getAllProductUseCase = new GetAllProductsUseCase(mongoRepository);
export const getByIdProductUseCase = new GetByIdProductUseCase(mongoRepository);
export const updateProductUseCase = new UpdateProductUseCase(mongoRepository);



export const createProductController = new CreateProductController(createProductUseCase);
export const deleteProductController = new DeleteProductController(deleteProductUseCase);
export const getAllProductsController = new GetAllProductsController(getAllProductUseCase);
export const getByIdProductController = new GetByIdProductController(getByIdProductUseCase);
export const updateProductController = new UpdateProductController(updateProductUseCase);


