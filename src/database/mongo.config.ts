import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongodbUri = process.env.MONGODB_URI;

if (!mongodbUri) {
    console.error('La variable de entorno MONGODB_URI no está definida.');
    process.exit(1);
}

mongoose.connect(mongodbUri)
    .then(() => {
        console.log('Conectado a MongoDB');
    })
    .catch((error) => {
        console.error('Error de conexión a MongoDB:', error);
    });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
