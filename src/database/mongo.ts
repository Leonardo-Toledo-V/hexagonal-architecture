import dotenv from "dotenv";
import { MongoClient, Db, Collection, Document } from "mongodb";
import { Signale } from "signale";

dotenv.config();

const signale = new Signale();

const dbUri: string = process.env.DB_URI || '';

let db: Db;

async function connectToDatabase() {
    try {
        const client = await MongoClient.connect(dbUri);
        db = client.db();
        signale.success("Conexión exitosa a la BD");
    } catch (error) {
        signale.error(error);
        process.exit(1);
    }
}

function getCollection<T extends Document>(name: string): Collection<T> {
    if (!db) {
        throw new Error("No hay conexión a la base de datos.");
    }
    return db.collection<T>(name);
}

export { connectToDatabase, getCollection };
