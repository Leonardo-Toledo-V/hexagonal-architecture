import Product from "../../domain/entities/Product";
import ProductRepository from "../../domain/ProductRepository";

export default class CreateProductUseCase {
    constructor(readonly productRepository: ProductRepository) { }
    async run(
        id: number,
        name: string,
        price: number,
        details: string
    ): Promise<Product | null> {
        try {
            const productObject = new Product(id,name,price,details);
            const product = await this.productRepository.create(productObject);
            return product
        } catch (error) {
            return null
        }
    }
}