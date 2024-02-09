import express from "express";
import dotenv from "dotenv";
import productRouter from "./product/infrastructure/routes/ProductRouter";
import { setupUserRoutes } from './user/infrastructure/routes/UserRouter';
import morgan from 'morgan';

dotenv.config();

const server = express();
const server_port = process.env["APP_PORT"] ?? 3030;

server.use(express.json());
//server.use("/", productRouter);
setupUserRoutes(server);
server.use(morgan('dev'))

server.listen(server_port, () => {
  console.log(`Server listening on http://localhost:${server_port}/`);
});