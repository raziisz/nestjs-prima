import { IBooksRepository } from "src/core/repositories/books-repository.contract";
import { ListBookRequest } from "../../infra/http/books/dtos/list-book.dto";
import { Either, success } from "src/core/entities/either";
import { BookResponse } from "../models/book-response";

type ListBookResponse = Either<null, { books: BookResponse[], pageNumber: number, pageSize: number, totalCount: number, totalPages: number }>;

export class ListBookUseCase {
    constructor(private readonly repository: IBooksRepository) { }

    async make(query: ListBookRequest): Promise<ListBookResponse> {
        const result = await this.repository.findManyRecent(query.take, query.skip);

        const books = result.items.map(b => {
            return {
                id: b.id.toString(),
                title: b.title,
                description: b.description,
                barCode: b.bar_code,
                createdAt: b.createdAt,
                updatedAt: b.updatedAt
            };
        });

        return success({ books, pageNumber: result.currentPage, pageSize: result.pageSize, totalCount: result.totalCount, totalPages: result.totalPages })
    }
}