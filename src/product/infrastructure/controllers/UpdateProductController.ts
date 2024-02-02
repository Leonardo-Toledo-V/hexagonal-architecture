import { Request, Response } from "express";
import UpdateProductUseCase from "../../application/UpdateProductUseCase";

export default class UpdateProductController {
    constructor(readonly updateProductUseCase: UpdateProductUseCase) { }

    async run(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const data = req.body;
        try {
            const product = await this.updateProductUseCase.run(id, data);
            if (product) {
                res.status(200).json({
                    data: {
                        id: product._id,
                        name: product.name,
                        price: product.price,
                        details: product.details,
                    },
                });
            } else {
                res.status(404).json({
                    data: "The product was not updated",
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
