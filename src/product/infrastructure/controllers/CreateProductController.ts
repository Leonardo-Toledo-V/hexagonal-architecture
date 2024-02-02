import { Request, Response } from "express";
import CreateProductUseCase from "../../application/CreateProductUseCase";

export default class CreateProductController {
    constructor(readonly createProductUseCase: CreateProductUseCase) { }

    async run(req: Request, res: Response) {
        const data = req.body;
        try {
            const product = await this.createProductUseCase.run(data.name, data.price, data.details);
            if (product) {
                res.status(200).json({
                    data: {
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        details: product.details,
                    },
                });
            } else {
                res.status(404).json({
                    data: "The product was not created",
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                error: "An error occurred during your request.",
            });
        }
    }
}