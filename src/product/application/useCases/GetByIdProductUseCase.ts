import Product from "../../domain/entities/Product";
import ProductRepository from "../../domain/ProductRepository";

export default class GetByIdProductUseCase {
    constructor(readonly productRepository: ProductRepository) { }
    async run(
        _id: number,
    ): Promise<Product | null> {
        try {
            const product = await this.productRepository.getById(_id);
            return product
        } catch (error) {
            return null
        }
    }
}