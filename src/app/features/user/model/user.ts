import { Product } from "../../product/entity/product";

export class User{
    // userCart : Product[] = [];
    constructor(
        public name: string,
        public contact: string,
        public email: string,
        public password: string,
        public userCart : (Product & {quantity : number})[],
        public bill : number
    ){}
}
  