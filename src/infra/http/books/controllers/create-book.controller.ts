import { BadRequestException, Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { CreateBookDto } from "src/infra/http/books/dtos/create-book.dto";
import { CreateBookUseCase } from "src/application/use-cases/create-book.use-case";

@Controller('books')
export class CreateBookController {
    constructor(private useCase: CreateBookUseCase) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async handle(@Body() body: CreateBookDto) {
        const { bar_code, description, title } = body;
        
        const result = await this.useCase.make({
            title,
            description,
            bar_code
        });

        if (result.isFailure()) {
            throw new BadRequestException(result.value.message);
        }

        const message = result.value.message;

        return { message };
    }
}