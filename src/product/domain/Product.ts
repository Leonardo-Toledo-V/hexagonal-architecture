export default class Product {
    constructor(
        readonly id: number,
        readonly name: string,
        readonly price: number,
        readonly details: string
    ) {
    }
}