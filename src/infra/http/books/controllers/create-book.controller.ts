import { BadRequestException, Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { CreateBookRequest } from "src/application/models/book/create-book-request";
import { CreateBookUseCase } from "src/application/use-cases/create-book.use-case";

@Controller('books')
export class CreateBookController {
    constructor(private useCase: CreateBookUseCase) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async handle(@Body() body: CreateBookRequest) {
        const result = await this.useCase.make(body);

        if (result.isFailure()) {
            throw new BadRequestException(result.value.message);
        }

        const message = result.value.message;

        return { message };
    }
}