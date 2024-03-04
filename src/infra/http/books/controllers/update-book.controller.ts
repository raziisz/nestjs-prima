import { Body, Controller, HttpCode, HttpStatus, InternalServerErrorException, NotFoundException, Param, Patch } from "@nestjs/common";
import { ResourceNotFoundError } from "src/application/exceptions/resource-not-found-error";
import { UpdateBookRequest } from "src/infra/http/books/dtos/updata-book.dto";
import { UpdateBookUseCase } from "src/application/use-cases/update-book.use-case";
import { UniqueId } from "src/core/entities/unique-id";


@Controller('books')
export class UpdateBookController {
    constructor(private useCase: UpdateBookUseCase) {}

    @Patch(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async handle(@Param('id') id: UniqueId, @Body() body: UpdateBookRequest) {
        console.log(body);
        const result = await this.useCase.make(id, body);

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