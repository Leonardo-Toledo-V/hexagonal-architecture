import Product from "../../domain/entities/Product";
import ProductRepository from "../../domain/ProductRepository";

export default class DeleteProductUseCase {
    constructor(readonly productRepository: ProductRepository) { }
    async run(
        _id: number
    ): Promise<boolean | null> {
        try {
            const product = await this.productRepository.delete(_id);
            return product
        } catch (error) {
            return null
        }
    }
}