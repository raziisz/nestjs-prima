import { Injectable } from "@nestjs/common";
import { Book } from "src/core/entities/book";
import { UniqueId } from "src/core/entities/unique-id";
import { IBooksRepository } from "src/core/repositories/books-repository.contract";
import { PrismaService } from "../prisma.service";
import PrismaBookMapper from "../mappers/prisma-book-mapper";
import { PagedList } from "src/core/entities/paged-list";

@Injectable()
export class PrismaBooksRepository implements IBooksRepository {
    constructor(private readonly prisma: PrismaService) { }

    async findByBarCode(barCode: string): Promise<Book | null> {
        const book = await this.prisma.book.findUnique({
            where: { bar_code: barCode }
        });

        if (!book) return null;

        return PrismaBookMapper.toDomain(book);
    }

    async create(book: Book): Promise<void> {
        const data = PrismaBookMapper.toPrisma(book);
        await this.prisma.book.create({ data });
    }
    async save(data: Book): Promise<void> {
        const dataToPrisma = PrismaBookMapper.toPrisma(data);

        await this.prisma.book.update({
            where: { id: dataToPrisma.id },
            data: dataToPrisma
        })
    }
    async findManyRecent(take: number, skip: number): Promise<PagedList<Book>> {
        const count = await this.prisma.book.count();
        const books = await this.prisma.book.findMany({
            orderBy: { createdAt: 'desc' },
            take: take,
            skip: (skip - 1) * take
        });

        const booksReturn = books.map(PrismaBookMapper.toDomain);
        const result = new PagedList<Book>(booksReturn, count, skip, take);

        return result;
    }
    async findById(id: UniqueId): Promise<Book | null> {
        const book = await this.prisma.book.findUnique({
            where: {
                id: id.toString()
            }
        })

        if (!book) return null;

        return PrismaBookMapper.toDomain(book);
    }
    async delete(id: UniqueId): Promise<void> {
        await this.prisma.book.delete({ where: { id: id.toString() } });
    }
}