import { UniqueId } from "src/core/entities/unique-id";
import { IBooksRepository } from "src/core/repositories/books-repository.contract";
import { ResourceNotFoundError } from "../exceptions/resource-not-found-error";
import { Either, failure, success } from "src/core/entities/either";

type DeleteBookResponse = Either<ResourceNotFoundError, { message: string }>

export class DeleteBookUseCase {
    constructor(private repository: IBooksRepository) { }

    async make(id: UniqueId): Promise<DeleteBookResponse> {
        try {
            const book = await this.repository.findById(id);

            if (!book) return failure(new ResourceNotFoundError("Livro não encontrado."));

            await this.repository.delete(id);
        } catch (error) {
            return failure(error);
        }

        return success({ message: "Livro deletado com sucesso." });
    }
}