import { connectToDatabase, getCollection } from "../../../database/mongo";
import { WithId } from "mongodb"; 
import Product from "../../domain/entities/Product";
import ProductRepository from "../../domain/ProductRepository";

class MongoDBProductRepository implements ProductRepository {
    private collectionName: string = "products";

    constructor() {
        connectToDatabase();
    }

    async create(product:Product): Promise<Product | null> {
        try {

            const productsCollection = getCollection<Product>(this.collectionName);
    
            const result = await productsCollection.insertOne(product);
    
            product._id = result.insertedId;

            return product;

        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async getById(_id: number): Promise<Product | null> {
        try {
            const productsCollection = getCollection<WithId<Product>>(this.collectionName);
    
            const product = await productsCollection.findOne({ _id });
    
            return product ? new Product(product._id, product.name, product.price, product.details) : null;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async getAll(): Promise<Product[] | null> {
        try {
            const productsCollection = getCollection<Product>(this.collectionName);

            const products = await productsCollection.find().toArray();

            return products.map(product => new Product(product._id, product.name, product.price, product.details));
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async update(_id: number, updates: Partial<Product>): Promise<Product | null> {
        try {
            const productsCollection = getCollection<Product>(this.collectionName);
    
            const result = await productsCollection.findOneAndUpdate(
                { _id },
                { $set: updates },
                { returnDocument: "after" }
            );
    
            if (result) {
                const updatedProduct = result as WithId<Product>;
                return new Product(updatedProduct._id, updatedProduct.name, updatedProduct.price, updatedProduct.details);
            } else {
                console.error("Producto no encontrado para actualizar");
                return null;
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    }
    
    
    

    async delete(_id: number): Promise<boolean | null> {
        try {
            const productsCollection = getCollection<Product>(this.collectionName);

            const result = await productsCollection.deleteOne({ _id });

            return result.deletedCount !== 0;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}

export default MongoDBProductRepository;
