import { ObjectId } from "mongodb";
import Product from "./entities/Product";

export default interface ProductRepository {
    create(product:Product): Promise<Product | null>;
    getById(_id: number): Promise<Product | null>;
    getAll(): Promise<Product[] | null>;
    update(_id: number, updates: Partial<Product>): Promise<Product | null>;
    delete(_id: number): Promise<boolean | null>;
}
