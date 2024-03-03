import { Module } from '@nestjs/common';
import { HttpBooksModule } from './infra/http/books/http-books.module';

@Module({
  imports: [
    HttpBooksModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
