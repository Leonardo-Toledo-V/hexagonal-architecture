import { ObjectId } from "mongodb";
import Product from "./Product";

export default interface ProductRepository {
    create(name: string, price: number, details: string): Promise<Product | null>;
    getById(id: ObjectId): Promise<Product | null>;
    getAll(): Promise<Product[] | null>;
    update(id: ObjectId, updates: Partial<Product>): Promise<Product | null>;
    delete(id: ObjectId): Promise<boolean | null>;
}
