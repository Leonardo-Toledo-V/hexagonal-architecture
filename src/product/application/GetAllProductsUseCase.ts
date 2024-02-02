import Product from "../domain/Product";
import ProductRepository from "../domain/ProductRepository";

export default class GetAllProductsUseCase {
    constructor(readonly productRepository: ProductRepository) { }
    async run(): Promise<Product[] | null> {
        try {
            const product = await this.productRepository.getAll();
            return product
        } catch (error) {
            return null
        }
    }
}