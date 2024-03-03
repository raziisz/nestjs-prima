import { Query } from "../query";

export class ListBookRequest extends Query {
    constructor(take?: number, skip?: number) {
        super(take, skip);
    }
}