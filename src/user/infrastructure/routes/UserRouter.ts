import { Express } from "express";
import { createUserController, logoutUserController, loginUserController, loginUseCase,  jWTService, getByIdController, updateUserController, deleteUserController, encryptionService, activationUseCase, activationUserController, getAllUsersController } from "../dependencies";
import {verifyToken} from "../middleware/auth";
export function setupUserRoutes(app: Express) {
    app.post('/users', createUserController.execute.bind(createUserController));
    app.post('/users/login', loginUserController.execute.bind(loginUserController));
    app.get('/users/:id',verifyToken, getByIdController.execute.bind(getByIdController));
    app.put('/users/:id',verifyToken, updateUserController.execute.bind(updateUserController));
    app.delete('/users/:id',verifyToken, deleteUserController.execute.bind(deleteUserController));
    app.get('/users/activate/:uuid', activationUserController.execute.bind(activationUserController));
    app.get('/users', getAllUsersController.execute.bind(getAllUsersController));
    app.get('/users/logout', verifyToken, logoutUserController.execute.bind(logoutUserController));
}