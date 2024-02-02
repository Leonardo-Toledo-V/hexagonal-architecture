import Product from "../domain/Product";
import ProductRepository from "../domain/ProductRepository";

export default class CreateProductUseCase {
    constructor(readonly productRepository: ProductRepository) { }
    async run(
        name: string,
        price: number,
        details: string
    ): Promise<Product | null> {
        try {
            const product = await this.productRepository.create(name, price, details);
            return product
        } catch (error) {
            return null
        }
    }
}