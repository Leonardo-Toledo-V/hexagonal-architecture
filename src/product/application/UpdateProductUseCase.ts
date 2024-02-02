import Product from "../domain/Product";
import ProductRepository from "../domain/ProductRepository";
import { ObjectId } from "mongodb";

export default class UpdateProductUseCase {
    constructor(readonly productRepository: ProductRepository) { }
    async run(
        id: ObjectId,
        updates: Partial<Product>
    ): Promise<Product | null> {
        try {
            const product = await this.productRepository.update(id, updates);
            return product
        } catch (error) {
            return null
        }
    }
}