import Product from "../domain/Product";
import ProductRepository from "../domain/ProductRepository";

export default class GetByIdProductUseCase {
    constructor(readonly productRepository: ProductRepository) { }
    async run(
        id: number,
    ): Promise<Product | null> {
        try {
            const product = await this.productRepository.getById(id);
            return product
        } catch (error) {
            return null
        }
    }
}