import { IBooksRepository } from "src/core/repositories/books-repository.contract";
import { CreateBookRequest } from "../models/book/create-book-request";
import { Book } from "src/core/entities/book";

export class CreateBookUseCase {
    constructor(private repository: IBooksRepository) {}
    async make({bar_code, description, title}: CreateBookRequest): Promise<void> {
        const book = await this.repository.findByBarCode(bar_code);

        if (book) {
            throw new Error("Já existe um livro com esse código de barra");
        }

        const newBook = Book.instance({
            bar_code,
            description,
            title
        });

        await this.repository.create(newBook);
    }
}