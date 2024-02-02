import { Response } from "express";
import GetAllProductsUseCase from "../../application/GetAllProductsUseCase";

export default class GetAllProductsController {
    constructor(readonly getAllProductsController: GetAllProductsUseCase) { }

    async run(res: Response) {
        try {
            const product = await this.getAllProductsController.run();
            if (product) {
                res.status(200).json({
                    data: {
                        product: product
                    },
                })
            } else {
                res.status(404).json({
                    data: "The products was not found",
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