import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";

@Module({
    providers: [],
    exports: [PrismaService],
  })
  export class DatabaseModule { }
