import { Request, Response } from "express";
import DeleteProductUseCase from "../../application/DeleteProductUseCase";
import { ObjectId } from "mongodb";

export default class DeleteProductController {
    constructor(readonly deleteProductUseCase: DeleteProductUseCase){}
    async run(req: Request, res: Response){
        const id = req.params.id
        const objectId = new ObjectId(id);

        try {
            const product = await this.deleteProductUseCase.run(objectId);
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