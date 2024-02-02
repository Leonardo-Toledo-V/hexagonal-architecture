import Product from "./Product";

export default interface ProductRepository {
    create(name: string, price: number, details: string): Promise<Product | null>;
    getById(id: number): Promise<Product | null>;
    getAll(): Promise<Product[] | null>;
    update(id: number, updates: Partial<Product>): Promise<Product | null>;
    delete(id: number): Promise<boolean | null>;
}
