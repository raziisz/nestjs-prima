import { UniqueId } from "src/core/entities/unique-id";
import { IBooksRepository } from "src/core/repositories/books-repository.contract";
import { BookDTO } from "../models/book/get-book-request";
import { ResourceNotFoundError } from "../exceptions/resource-not-found-error";
import { Either, failure, success } from "src/core/entities/either";

type ReadBookResponse = Either<ResourceNotFoundError, { book: BookDTO }>;

export class ReadBookUseCase {
    constructor(private repository: IBooksRepository) {}

    async make(id: UniqueId): Promise<ReadBookResponse> {
        const book = await this.repository.findById(id);

        if (!book) return failure(new ResourceNotFoundError("Livro não existe."));
        
        const result = {
            id: book.id.toString(),
            barCode: book.bar_code,
            createdAt: book.createdAt,
            description: book.description,
            title: book.title,
            updatedAt: book.updatedAt
        };
        return success({ book: result });
    }
}