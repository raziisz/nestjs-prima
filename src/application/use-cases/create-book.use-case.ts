import { IBooksRepository } from "src/core/repositories/books-repository.contract";
import { Book } from "src/core/entities/book";
import { Either, failure, success } from "src/core/entities/either";
import { ResourceExistsError } from "../exceptions/resource-exists-error";

interface CreateBookRequest {
    bar_code: string,
    description: string,
    title: string
}

type CreateBookResponse = Either<ResourceExistsError, { message: string }>

export class CreateBookUseCase {
    constructor(private repository: IBooksRepository) {}
    async make({bar_code, description, title}: CreateBookRequest): Promise<CreateBookResponse> {
        const book = await this.repository.findByBarCode(bar_code);

        if (book) {
            return failure(new ResourceExistsError("Livro já existe."));
        }

        const newBook = Book.instance({
            bar_code,
            description,
            title
        });

        await this.repository.create(newBook);

        return success({ message: "Livro criado com sucesso." });
    }
}