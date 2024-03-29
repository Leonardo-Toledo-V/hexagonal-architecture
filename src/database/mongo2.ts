import dotenv from "dotenv";
import { MongoClient, MongoClientOptions, Collection, Db } from "mongodb";
import { Signale } from "signale";

dotenv.config();

const signale = new Signale();
const uri = process.env.DB_URI || "";

const client = new MongoClient(uri);

let collection: Collection;

export async function connect(collectionName: string) {
    try {
        await client.connect();
        signale.success('Conexion a la base de datos exitosa');
        collection = client.db().collection(collectionName);
    } catch (error) {
        signale.error(error);
    }
}

export { collection };

connect("users");