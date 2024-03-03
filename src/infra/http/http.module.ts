import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { CreateBookUseCase } from "src/application/use-cases/create-book.use-case";
import { PrismaBooksRepository } from "../database/prisma/repositories/prisma-books-repository";
import { CreateBookController } from "./books/controllers/create-book.controller";

@Module({
    imports: [DatabaseModule],
    controllers: [
        CreateBookController
    ],
    providers:[
        {
            provide: CreateBookUseCase,
            useFactory: (repository: PrismaBooksRepository) => 
                new CreateBookUseCase(repository),
            inject: [PrismaBooksRepository]
        }
    ]
})
export class HttpModule {}