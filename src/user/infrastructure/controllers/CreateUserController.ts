import { Request, Response } from "express";
import { CreateUseCase } from "../../application/CreateUseCase";
import { User } from "../../domain/entities/User";
import { EncryptService, EmailService } from "../../domain/services/UserService";

export class CreateUserController {

    constructor(readonly CreateUserCase: CreateUseCase, readonly emailService: EmailService, readonly encryptionService: EncryptService) { }

    async execute(req: Request, res: Response) {
        const data = req.body;
        data.password = await this.encryptionService.execute(data.password);
        let userData = new User(
            parseInt(data.id),
            data.username,
            data.email,
            data.password,
            "INACTIVE"        
        )
        try {
            const user = await this.CreateUserCase.execute(userData);
            console.log(user)
            if (user) {
                const verificationUrl = `http://${process.env.HOST_SERVER}:${process.env.APP_PORT}/users/activate/${user.uuid}`;
                const message = `¡Hola ${user.username}! 
                Thanks for signing up to The API. Before we can continue, we need to validate your email address, you can validate in the next link: 
                ${verificationUrl}`;
                await this.emailService.sendEmail(user.email, "Email Verification Required", message);
                res.status(200).send({
                    status: "success",
                    data: {
                        id: user.id,
                        username: user.username,
                        email: user.email,
                        uuid: user.uuid,
                    },
                });
            } else {
                res.status(500).send({
                    status: "internal server error",
                    data: "Ha ocurrido un error con tu peticion, inténtelo más tarde.",
                });
            }
        } catch (error) {
            res.status(204).send({
                status: "error",
                data: "Ha ocurrido un error durante su petición.",
                msg: error,
            });
        }
    }
}