import { Controller, Get, InternalServerErrorException, NotFoundException, Param } from "@nestjs/common";
import { ResourceNotFoundError } from "src/application/exceptions/resource-not-found-error";
import { ReadBookUseCase } from "src/application/use-cases/read-book.use-case";
import { UniqueId } from "src/core/entities/unique-id";

@Controller('books')
export class FindByIdBookController {
    constructor(private useCase: ReadBookUseCase) {}
    
    @Get(':id')
    async handle(@Param('id') id: UniqueId) {
        const result = await this.useCase.make(id);

        if(result.isFailure()) {
            const error = result.value;
            switch(error.constructor) {
                case ResourceNotFoundError:
                    throw new NotFoundException(error.message);
                default:
                    throw new InternalServerErrorException()
            }
        }

        return result.value.book;
    }
}