import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/infra/database/database.module";
import { CreateBookController } from "./controllers/create-book.controller";
import { FindByIdBookController } from "./controllers/find-by-id-book.controller";
import { CreateBookUseCase } from "src/application/use-cases/create-book.use-case";
import { PrismaBooksRepository } from "src/infra/database/prisma/repositories/prisma-books-repository";
import { ReadBookUseCase } from "src/application/use-cases/read-book.use-case";
import { ListBookController } from "./controllers/list-books.controller";
import { ListBookUseCase } from "src/application/use-cases/list-book.use-case";

@Module({
    imports: [DatabaseModule],
    controllers: [
        CreateBookController,
        FindByIdBookController,
        ListBookController
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
        }
    ]
})
export class HttpBooksModule {}