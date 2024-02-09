import { CreateUseCase } from "../application/CreateUseCase";
import { GetUserUseCase } from "../application/GetUserUseCase";
import { UpdateUserUseCase } from "../application/UpdateUserUseCase";
import { DeleteUseCase } from "../application/DeleteUseCase";
import { GetAllUsersUseCase } from "../application/GetAllUsersUseCase";
import { ActivationUseCase } from "../application/ActivationUseCase";
import { LoginUseCase } from "../application/LoginUseCase";


import { CreateUserController } from "./controllers/CreateUserController";
import { DeleteUserController } from "./controllers/DeleteUserController";
import GetByEmailController from "./controllers/GetUserbyEmailController";
import GetByIdController from "./controllers/GetUserByIdController";
import GetByUsernameController from "./controllers/GetUserByUsernameController";
import { UpdateUserController } from "./controllers/UpdateUserController";
import { GetAllUsersController } from "./controllers/GetAllUsersController";
import { ActivationUserController } from "./controllers/ActivationUserController";
import { LoginUserController } from "./controllers/LoginUserController";
import { LogoutUserController } from "./controllers/LogoutUserController";



import { EmailService } from "./services/EmailService";
import { ByEncryptServices } from "./services/ByEncryptServices";
import { JWTService } from "./services/JWTServices";

import { MysqlUserRepository } from "./repositories/MysqlRepository";
import { MongoDBUserRepository } from "./repositories/MongoRepository";

export const currentRepository = new MongoDBUserRepository;



export const createUseCase = new CreateUseCase(currentRepository);
export const getUserUseCase = new GetUserUseCase(currentRepository);
export const updateUserUseCase = new UpdateUserUseCase(currentRepository);
export const deleteUserUseCase = new DeleteUseCase(currentRepository);
export const getAllUsersUseCase = new GetAllUsersUseCase(currentRepository);
export const activationUseCase = new ActivationUseCase(currentRepository);
export const loginUseCase = new LoginUseCase(currentRepository);



export const emailService = new EmailService();
export const encryptionService = new ByEncryptServices();
export const jWTService = new JWTService();


export const createUserController = new CreateUserController(createUseCase, emailService, encryptionService);
export const deleteUserController = new DeleteUserController(deleteUserUseCase);
export const getByIdController = new GetByIdController(getUserUseCase);
export const getByUsernameController = new GetByUsernameController(getUserUseCase);
export const getByEmailController = new GetByEmailController(getUserUseCase);
export const updateUserController = new UpdateUserController(updateUserUseCase);
export const getAllUsersController = new GetAllUsersController(getAllUsersUseCase);
export const activationUserController = new ActivationUserController(activationUseCase);
export const loginUserController = new LoginUserController(loginUseCase, encryptionService, jWTService);
export const logoutUserController = new LogoutUserController(jWTService);