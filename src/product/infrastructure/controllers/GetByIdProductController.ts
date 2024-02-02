import { Request, Response } from "express";
import GetByIdProductUseCase from "../../application/useCases/GetByIdProductUseCase";

export default class GetByIdProductController {
    constructor(readonly getByIdProductUseCase: GetByIdProductUseCase){}

    async run(req: Request, res: Response){
        const _id = parseInt(req.params.id)
        try {
            const product = await this.getByIdProductUseCase.run(_id);
            if(product){
                res.status(200).json({
                    data:{
                        _id: product._id,
                        name: product.name,
                        price: product.price,
                        details: product.details
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