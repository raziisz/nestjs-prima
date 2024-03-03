import { UniqueId } from "src/core/entities/unique-id";
import { IBooksRepository } from "src/core/repositories/books-repository.contract";
import { BookDTO } from "../models/book/get-book-request";

export class ReadBookUseCase {
    constructor(private repository: IBooksRepository) {}

    async make(id: UniqueId): Promise<BookDTO> {
        const book = await this.repository.findById(id);

        if (!book) throw new Error("Livro não existe.");

        return {
            id: book.id.toString(),
            barCode: book.bar_code,
            createdAt: book.createdAt,
            description: book.description,
            title: book.title,
            updatedAt: book.updatedAt
        }
    }
}