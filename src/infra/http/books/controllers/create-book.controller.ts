import { Body, Controller, Post } from "@nestjs/common";
import { CreateBookRequest } from "src/application/models/book/create-book-request";
import { CreateBookUseCase } from "src/application/use-cases/create-book.use-case";

@Controller('books')
export class CreateBookController {
    constructor(private useCase: CreateBookUseCase) {}

    @Post()
    async handle(@Body() body: CreateBookRequest) {
        await this.useCase.make(body);
    }
}