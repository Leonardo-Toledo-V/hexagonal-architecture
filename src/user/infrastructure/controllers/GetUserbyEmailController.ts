import { Request, Response } from 'express';
import { GetUserUseCase } from '../../application/GetUserUseCase';

export default class GetByEmailController {
    constructor(readonly getByUserCase: GetUserUseCase) { }

    async execute(req: Request, res: Response): Promise<void> {
        const { email } = req.params;
        try {
            const user = await this.getByUserCase.executeByEmail(email);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}