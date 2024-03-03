import { Controller, Get, InternalServerErrorException, Query } from "@nestjs/common";
import { ListBookRequest } from "src/application/models/book/list-book-request";
import { DataResponse } from "src/application/models/data-response";
import { ListBookUseCase } from "src/application/use-cases/list-book.use-case";

@Controller('books')
export class ListBookController {
    constructor(private useCase: ListBookUseCase) {}

    @Get()
    async handle(
        @Query('take') take: number,
        @Query('skip') skip: number
    ) {
        const result = await this.useCase.make(new ListBookRequest(take, skip));
        
        if (result.isFailure()) {
            throw new InternalServerErrorException()
        }
        const { pageNumber, pageSize, totalCount, totalPages } = result.value;
        const data = result.value.books;
        return new DataResponse(data, pageNumber, pageSize, totalPages, totalCount);
    }
}