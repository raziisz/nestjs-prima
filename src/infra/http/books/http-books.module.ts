import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/infra/database/database.module";
import { CreateBookController } from "./controllers/create-book.controller";
import { FindByIdBookController } from "./controllers/find-by-id-book.controller";
import { CreateBookUseCase } from "src/application/use-cases/create-book.use-case";
import { PrismaBooksRepository } from "src/infra/database/prisma/repositories/prisma-books-repository";
import { ReadBookUseCase } from "src/application/use-cases/read-book.use-case";
import { ListBookController } from "./controllers/list-books.controller";
import { ListBookUseCase } from "src/application/use-cases/list-book.use-case";
import { UpdateBookUseCase } from "src/application/use-cases/update-book.use-case";
import { UpdateBookController } from "./controllers/update-book.controller";
import { DeleteBookController } from "./controllers/delete-book.controller";
import { DeleteBookUseCase } from "src/application/use-cases/delete-book-use-case";

@Module({
    imports: [DatabaseModule],
    controllers: [
        CreateBookController,
        FindByIdBookController,
        ListBookController,
        UpdateBookController,
        DeleteBookController
    ],
    providers:[
        {
            provide: CreateBookUseCase,
            useFactory: (repository: PrismaBooksRepository) => 
                new CreateBookUseCase(repository),
            inject: [PrismaBooksRepository]
        },
        {
            provide: ReadBookUseCase,
            useFactory: (repository: PrismaBooksRepository) =>
                new ReadBookUseCase(repository),
            inject: [PrismaBooksRepository]
        },
        {
            provide: ListBookUseCase,
            useFactory: (repository: PrismaBooksRepository) =>
                new ListBookUseCase(repository),
            inject: [PrismaBooksRepository]
        },
        {
            provide: UpdateBookUseCase,
            useFactory: (repository: PrismaBooksRepository) =>
                new UpdateBookUseCase(repository),
            inject: [PrismaBooksRepository]
        },
        {
            provide: DeleteBookUseCase,
            useFactory: (repository: PrismaBooksRepository) =>
                new DeleteBookUseCase(repository),
            inject: [PrismaBooksRepository]
        }
    ]
})
export class HttpBooksModule {}