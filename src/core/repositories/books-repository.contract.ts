import { Book } from "../entities/book";
import { IBaseRepository } from "./base-repository.contract";

export abstract class IBooksRepository extends IBaseRepository<Book> {
    abstract findByBarCode(barCode: string): Promise<Book | null>;
}