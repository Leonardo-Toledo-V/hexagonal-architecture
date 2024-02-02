import Product from "../../domain/entities/Product";
import ProductRepository from "../../domain/ProductRepository";;

export default class UpdateProductUseCase {
    constructor(readonly productRepository: ProductRepository) { }
    async run(
        _id: number,
        updates: Partial<Product>
    ): Promise<Product | null> {
        try {
            const product = await this.productRepository.update(_id, updates);
            return product
        } catch (error) {
            return null
        }
    }
}