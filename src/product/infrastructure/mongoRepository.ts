import { connectToDatabase, getCollection } from "../../database/mongo";
import { WithId, ObjectId } from "mongodb"; 
import Product from "../domain/Product";
import ProductRepository from "../domain/ProductRepository";

class MongoDBProductRepository implements ProductRepository {
    private collectionName: string = "products";

    constructor() {
        connectToDatabase();
    }

    async create(name: string, price: number, details: string): Promise<Product | null> {
        try {
            const productsCollection = getCollection<Product>(this.collectionName);
    
            const result = await productsCollection.insertOne({
                _id: new ObjectId(),
                name,
                price,
                details
            });
    
            return new Product(result.insertedId as ObjectId, name, price, details);
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async getById(id: ObjectId): Promise<Product | null> {
        try {
            const productsCollection = getCollection<WithId<Product>>(this.collectionName);
    
            const product = await productsCollection.findOne({ id });
    
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

    async update(id: ObjectId, updates: Partial<Product>): Promise<Product | null> {
        try {
            const productsCollection = getCollection<Product>(this.collectionName);
    
            const result = await productsCollection.findOneAndUpdate(
                { id },
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
    
    
    

    async delete(id: ObjectId): Promise<boolean | null> {
        try {
            const productsCollection = getCollection<Product>(this.collectionName);

            const result = await productsCollection.deleteOne({ id });

            return result.deletedCount !== 0;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}

export default MongoDBProductRepository;
