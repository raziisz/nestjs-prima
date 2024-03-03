import { Controller, Get, Param } from "@nestjs/common";
import { ReadBookUseCase } from "src/application/use-cases/read-book.use-case";
import { UniqueId } from "src/core/entities/unique-id";

@Controller('books')
export class FindByIdBookController {
    constructor(private useCase: ReadBookUseCase) {}
    
    @Get(':id')
    async handle(@Param('id') id: UniqueId) {
        const result = await this.useCase.make(id);

        return result;
    }
}