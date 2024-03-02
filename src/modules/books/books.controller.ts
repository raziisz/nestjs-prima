import { Body, Controller, Post } from '@nestjs/common';
import { BooksService } from './books.service';
import { BookDTO } from './book-dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  async create(@Body() data: BookDTO) {
    return this.booksService.create(data)
  }
}
