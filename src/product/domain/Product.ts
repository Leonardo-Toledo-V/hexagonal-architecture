import { ObjectId } from "mongodb";
export default class Product {
    constructor(
        readonly _id: ObjectId,
        readonly name: string,
        readonly price: number,
        readonly details: string
    ) {
    }
}