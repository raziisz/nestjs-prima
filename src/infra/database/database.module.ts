import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaBooksRepository } from "./prisma/repositories/prisma-books-repository";

@Module({
    providers: [
      PrismaService,
      PrismaBooksRepository
    ],
    exports: [
      PrismaService,
      PrismaBooksRepository
    ],
  })
  export class DatabaseModule { }
