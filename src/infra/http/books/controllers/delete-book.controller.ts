import { Controller, Delete, HttpCode, HttpStatus, InternalServerErrorException, NotFoundException, Param } from "@nestjs/common";
import { ResourceNotFoundError } from "src/application/exceptions/resource-not-found-error";
import { DeleteBookUseCase } from "src/application/use-cases/delete-book-use-case";
import { UniqueId } from "src/core/entities/unique-id";

@Controller('books')
export class DeleteBookController {
    constructor(private useCase: DeleteBookUseCase) {}

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async handle(@Param('id') id: UniqueId) {
        const result = await this.useCase.make(id);

        if (result.isFailure()) {
            const error = result.value;
            switch(error.constructor) {
                case ResourceNotFoundError:
                    throw new NotFoundException(error.message);
                default:
                    throw new InternalServerErrorException()
            }
        }
    }
}