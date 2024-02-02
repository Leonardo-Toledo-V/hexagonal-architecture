import Product from "../domain/Product";
import ProductRepository from "../domain/ProductRepository";

export default class DeleteProductUseCase {
    constructor(readonly productRepository: ProductRepository) { }
    async run(
        id: number
    ): Promise<boolean | null> {
        try {
            const product = await this.productRepository.delete(id);
            return product
        } catch (error) {
            return null
        }
    }
}