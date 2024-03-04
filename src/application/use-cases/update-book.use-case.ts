import { Either, failure, success } from "src/core/entities/either";
import { ResourceNotFoundError } from "../exceptions/resource-not-found-error";
import { IBooksRepository } from "src/core/repositories/books-repository.contract";
import { UniqueId } from "src/core/entities/unique-id";
import { UpdateBookRequest } from "../../infra/http/books/dtos/updata-book.dto";

type UpdateBookResponse = Either<ResourceNotFoundError, { message: string }>
export class UpdateBookUseCase {
    constructor(private repository: IBooksRepository) {}

    async make(id: UniqueId, data: UpdateBookRequest): Promise<UpdateBookResponse> {
        try {
            const book = await this.repository.findById(id);
    
            if (!book) return failure(new ResourceNotFoundError("Livro não encontrado."));
    
            book.update(data.title, data.description);
            console.log("to atualizando", book);
            await this.repository.save(book);
            
        } catch (error) {
            console.log(error);
            return failure(error);
        }

        return success({ message: "Atualizado com sucesso." });
    }
}