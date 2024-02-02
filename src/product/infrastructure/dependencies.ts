import CreateProductUseCase from "../application/useCases/CreateProductUseCase";
import DeleteProductUseCase from "../application/useCases/DeleteProductUseCase";
import GetAllProductsUseCase from "../application/useCases/GetAllProductsUseCase";
import GetByIdProductUseCase from "../application/useCases/GetByIdProductUseCase";
import UpdateProductUseCase from "../application/useCases/UpdateProductUseCase";

import CreateProductController from "./controllers/CreateProductController";
import DeleteProductController from "./controllers/DeleteProductController";
import GetAllProductsController from "./controllers/GetAllProductsController";
import GetByIdProductController from "./controllers/GetByIdProductController";
import UpdateProductController from "./controllers/UpdateProductController";

import MongoDBProductRepository from "./repositories/mongoRepository";
import { MysqlProductRepository } from "./repositories/mysqlRepository";


export const mysqlRepository = new MysqlProductRepository();
export const mongoRepository = new MongoDBProductRepository();

const currentRepository = mysqlRepository;

export const createProductUseCase = new CreateProductUseCase(currentRepository);
export const deleteProductUseCase = new DeleteProductUseCase(currentRepository);
export const getAllProductUseCase = new GetAllProductsUseCase(currentRepository);
export const getByIdProductUseCase = new GetByIdProductUseCase(currentRepository);
export const updateProductUseCase = new UpdateProductUseCase(currentRepository);



export const createProductController = new CreateProductController(createProductUseCase);
export const deleteProductController = new DeleteProductController(deleteProductUseCase);
export const getAllProductsController = new GetAllProductsController(getAllProductUseCase);
export const getByIdProductController = new GetByIdProductController(getByIdProductUseCase);
export const updateProductController = new UpdateProductController(updateProductUseCase);


