export default class Product {
    public _id: number;

    constructor(
        _id: number,
        readonly name: string,
        readonly price: number,
        readonly details: string
    ) {
        this._id = _id;
    }
}