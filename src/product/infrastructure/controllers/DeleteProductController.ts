import { Request, Response } from "express";
import DeleteProductUseCase from "../../application/DeleteProductUseCase";

export default class DeleteProductController {
    constructor(readonly deleteProductUseCase: DeleteProductUseCase){}
    async run(req: Request, res: Response){
        const id = parseInt(req.params.id);
        try {
            const product = await this.deleteProductUseCase.run(id);
            if(product){
                res.status(200).json({
                    data:{
                        eliminated: product.valueOf(),
                    }
                });
            } else {
                res.status(404).json({
                    data: "The product was not found",
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                error: "An error ocurred during your request",
            })
        }
    }
}