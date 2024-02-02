import { Request, Response } from "express";
import GetAllProductsUseCase from "../../application/useCases/GetAllProductsUseCase";

export default class GetAllProductsController {
    constructor(readonly getAllProductsController: GetAllProductsUseCase) { }

    async run(req:Request, res: Response) {
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