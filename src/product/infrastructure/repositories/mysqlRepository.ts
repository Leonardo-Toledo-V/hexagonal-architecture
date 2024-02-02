import { query } from "../../../database/mysql";
import Product from "../../domain/entities/Product";
import ProductRepository from "../../domain/ProductRepository";

export class MysqlProductRepository implements ProductRepository {

    async create(product: Product): Promise<Product | null> {
        try {
            const {_id, name, price, details } = product;

            if (!name || !price || !details) {
                console.error("Faltan campos obligatorios para crear el producto");
                return null;
            }

            const sql = "INSERT INTO products(_id, name, price, details) VALUES (?, ?, ?, ?)";
            const params: any[] = [_id, name, price, details];

            const result: any = await query(sql, params);

            if (result[0] && result[0].insertId) {
                const createdProduct: Product = new Product(result[0].insertId, name, price, details);
                return createdProduct;
            }

            return null;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async getAll(): Promise<Product[] | null> {
        try {
            const sql = "SELECT * FROM products";
            const params: any[] = [];
            const result: any = await query(sql, params);

            if (result[0] && Array.isArray(result[0])) {
                const productsData: any[] = result[0];

                const products: Product[] = productsData.map((productData: any) => {
                    return new Product(
                        productData._id,
                        productData.name,
                        productData.price,
                        productData.details
                    );
                });

                return products;
            }

            return null;
        } catch (error) {
            return null;
        }
    }

    async getById(id: number): Promise<Product | null> {
        try {
            const sql = "SELECT * FROM products WHERE _id = ?";
            const params: any[] = [id];
            const result: any = await query(sql, params);

            if (result[0] && Array.isArray(result[0]) && result[0].length > 0) {
                const productData: any = result[0][0];

                const product: Product = new Product(
                    productData._id,
                    productData.name,
                    productData.price,
                    productData.details
                );

                return product;
            }

            return null;
        } catch (error) {
            return null;
        }
    }

    async update(_id: number, updates: Partial<Product>): Promise<Product | null> {
        try {
            const { name, price, details } = updates;

            // Verificar que al menos un campo para actualizar está presente
            if (!name && !price && !details) {
                console.error("Ningún campo proporcionado para actualizar");
                return null;
            }

            const setClause = [];
            const params = [];

            if (name) {
                setClause.push("name = ?");
                params.push(name);
            }
            if (price) {
                setClause.push("price = ?");
                params.push(price);
            }
            if (details) {
                setClause.push("details = ?");
                params.push(details);
            }

            const setClauseString = setClause.join(", ");
            const sql = `UPDATE products SET ${setClauseString} WHERE _id = ?`;
            params.push(_id);

            const result: any = await query(sql, params);

            if (result[0] && result[0].affectedRows > 0) {
                // Si al menos una fila fue afectada, la actualización fue exitosa
                const updatedProduct: Product = new Product(_id, name || "", price || 0, details || "");
                return updatedProduct;
            }

            return null;
        } catch (error) {
            console.error(error);
            return null;
        }
    }


    async delete(_id: number): Promise<boolean | null> {
        try {
            const sql = "DELETE FROM products WHERE _id = ?";
            const params: any[] = [_id];
            const result: any = await query(sql, params);

            if (result[0] && result[0].affectedRows > 0) {
                // Si al menos una fila fue afectada, la eliminación fue exitosa
                return true;
            }

            return false;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

}