import { Query } from "../../../../application/models/query";

export class ListBookRequest extends Query {
    constructor(take?: number, skip?: number) {
        super(take, skip);
    }
}